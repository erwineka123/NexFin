import { getCurrentUser } from "@/lib/auth/get-current-user";
import { enrichTransactions } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getTransactionsPageData() {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);

  return {
    user,
    wallets: snapshot.wallets,
    categories: snapshot.categories,
    transactions: enrichTransactions(snapshot.transactions, snapshot.wallets, snapshot.categories)
  };
}

