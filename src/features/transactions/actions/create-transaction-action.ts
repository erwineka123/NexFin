"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getFinanceSnapshot } from "@/services/finance-repository";
import type { ActionResponse } from "@/types/finance";
import {
  transactionSchema,
  type TransactionValues
} from "@/features/transactions/schemas/transaction-schema";
import {
  applyTransactionBalance,
} from "@/features/transactions/services/wallet-balance";


export async function createTransactionAction(values: TransactionValues): Promise<ActionResponse> {
  const parsed = transactionSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Data transaksi belum valid.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);
  const walletExists = snapshot.wallets.some((wallet) => wallet.id === parsed.data.walletId);
  const categoryExists = snapshot.categories.some(
    (category) => category.id === parsed.data.categoryId
  );

  if (!walletExists || !categoryExists) {
    return {
      success: false,
      message: "Wallet atau kategori tidak ditemukan."
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Demo mode aktif. Transaksi tervalidasi dan siap dikirim ke Supabase nanti."
    };
  }

  const supabase = await createServerSupabaseClient();

  if (!user || !supabase) {
    return {
      success: false,
      message: "Kamu perlu login untuk menambahkan transaksi."
    };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    wallet_id: parsed.data.walletId,
    category_id: parsed.data.categoryId,
    amount: parsed.data.amount,
    note: parsed.data.note,
    transaction_date: parsed.data.transactionDate,
    type: parsed.data.type
  });

if (error) {
  return {
    success: false,
    message: error.message,
  };
}

try {
  await applyTransactionBalance({
    supabase,
    walletId: parsed.data.walletId,
    userId: user.id,
    amount: parsed.data.amount,
    type: parsed.data.type,
  });
} catch (e) {
  return {
    success: false,
    message:
      e instanceof Error ? e.message : "Gagal memperbarui saldo wallet.",
  };
}

  revalidatePath("/transactions");
  revalidatePath("/dashboard");
  revalidatePath("/budgets");
  revalidatePath("/reports");

  return {
    success: true,
    message: "Transaksi berhasil disimpan."
  };
}

