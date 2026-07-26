"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/types/finance";
import {
  walletSchema,
  type WalletValues,
} from "@/features/wallets/schemas/wallet-schema";

export async function updateWalletAction(
  walletId: string,
  values: WalletValues
): Promise<ActionResponse> {
  const parsed = walletSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Data wallet belum lengkap.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: `Demo mode aktif. Wallet ${parsed.data.name} berhasil diperbarui.`,
    };
  }

  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  if (!user || !supabase) {
    return {
      success: false,
      message: "Kamu perlu login untuk mengubah wallet.",
    };
  }

  // Pastikan wallet milik user
  const { data: wallet, error: walletError } = await supabase
    .from("wallets")
    .select("id")
    .eq("id", walletId)
    .eq("user_id", user.id)
    .single();

  if (walletError || !wallet) {
    return {
      success: false,
      message: "Wallet tidak ditemukan.",
    };
  }

  const { error } = await supabase
    .from("wallets")
    .update({
      name: parsed.data.name,
      icon: parsed.data.icon,
      color: parsed.data.color,
      updated_at: new Date().toISOString(),
    })
    .eq("id", walletId)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/wallets");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Wallet berhasil diperbarui.",
  };
}