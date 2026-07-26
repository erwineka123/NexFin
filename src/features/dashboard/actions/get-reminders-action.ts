"use server";

import { getCurrentUser } from "@/lib/auth/get-current-user";
import { sortNotifications } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getRemindersAction() {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);

  return sortNotifications(snapshot.notifications);
}
