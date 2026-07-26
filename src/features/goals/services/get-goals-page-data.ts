import { getCurrentUser } from "@/lib/auth/get-current-user";
import { sortGoals } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getGoalsPageData() {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);

  return {
    user,
    goals: sortGoals(snapshot.goals)
  };
}

