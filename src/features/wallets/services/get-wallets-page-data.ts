import { getCurrentUser } from "@/lib/auth/get-current-user";
import { buildWalletInsights } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getWalletsPageData() {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);

  return {
    user,
    wallets: snapshot.wallets,
    walletInsights: buildWalletInsights(snapshot.wallets)
  };
}

