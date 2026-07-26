import { getCurrentUser } from "@/lib/auth/get-current-user";
import { buildBudgetProgress } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getBudgetsPageData() {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);

  return {
    user,
    budgets: buildBudgetProgress(snapshot.budgets, snapshot.categories, snapshot.transactions)
  };
}

