"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/types/finance";
import { walletSchema, type WalletValues } from "@/features/wallets/schemas/wallet-schema";

export async function createWalletAction(values: WalletValues): Promise<ActionResponse> {
  const parsed = walletSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Data wallet belum lengkap.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: `Demo mode aktif. Wallet ${parsed.data.name} siap dipindahkan ke database saat Supabase sudah disambungkan.`
    };
  }

  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  if (!user || !supabase) {
    return {
      success: false,
      message: "Kamu perlu login untuk menambahkan wallet."
    };
  }

  const { error } = await supabase.from("wallets").insert({
  user_id: user.id,
  name: parsed.data.name,
  opening_balance: parsed.data.startingBalance,
  balance: parsed.data.startingBalance,
  icon: parsed.data.icon,
  color: parsed.data.color,
  });

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  revalidatePath("/wallets");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Wallet berhasil ditambahkan."
  };
}

