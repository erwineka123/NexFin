import type { ReportInterval } from "@/types/finance";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { buildReportSnapshot } from "@/services/finance-analytics";
import { getFinanceSnapshot } from "@/services/finance-repository";

export async function getReportsPageData(interval: ReportInterval = "monthly") {
  const user = await getCurrentUser();
  const snapshot = await getFinanceSnapshot(user);

  return {
    user,
    report: buildReportSnapshot(snapshot, interval)
  };
}

