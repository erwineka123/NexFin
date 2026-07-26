import { getCurrentUser } from "@/lib/auth/get-current-user";
import { buildDashboardSnapshot, sortNotifications } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getDashboardData() {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);
  const dashboard = buildDashboardSnapshot(snapshot);

  return {
    ...dashboard,
    notifications: sortNotifications(dashboard.notifications)
  };
}

