import { SupabaseClient } from "@supabase/supabase-js";

interface WalletBalanceParams {
  supabase: SupabaseClient;
  walletId: string;
  userId: string;
  amount: number;
  type: "income" | "expense" | "transfer";
}

interface AdjustBalanceParams {
  supabase: SupabaseClient;
  walletId: string;
  userId: string;
  delta: number;
}

/**
 * Menambah / mengurangi saldo wallet
 */
export async function adjustWalletBalance({
  supabase,
  walletId,
  userId,
  delta,
}: AdjustBalanceParams) {
  const { data: wallet, error } = await supabase
    .from("wallets")
    .select("balance")
    .eq("id", walletId)
    .eq("user_id", userId)
    .single();

  if (error || !wallet) {
    throw new Error("Wallet tidak ditemukan.");
  }

  const newBalance = Number(wallet.balance) + Number(delta);

  if (newBalance < 0) {
    throw new Error("Saldo wallet tidak mencukupi.");
  }

  const { error: updateError } = await supabase
    .from("wallets")
    .update({
      balance: newBalance,
      updated_at: new Date().toISOString(),
    })
    .eq("id", walletId)
    .eq("user_id", userId);

  if (updateError) {
    throw new Error(updateError.message);
  }
}

/**
 * Apply transaksi baru
 */
export async function applyTransactionBalance({
  supabase,
  walletId,
  userId,
  amount,
  type,
}: WalletBalanceParams) {

  if (type === "transfer") {
    return;
  }

  await adjustWalletBalance({
    supabase,
    walletId,
    userId,
    delta: type === "income"
      ? amount
      : -amount,
  });
}

/**
 * Rollback transaksi lama
 */
export async function rollbackTransactionBalance({
  supabase,
  walletId,
  userId,
  amount,
  type,
}: WalletBalanceParams) {

  if (type === "transfer") {
    return;
  }

  await adjustWalletBalance({
    supabase,
    walletId,
    userId,
    delta: type === "income"
      ? -amount
      : amount,
  });
}