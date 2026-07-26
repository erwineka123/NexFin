import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ReportOverview } from "@/features/reports/components/report-overview";
import { getReportsPageData } from "@/features/reports/services/get-reports-page-data";
import type { ReportInterval } from "@/types/finance";

const intervals: ReportInterval[] = ["daily", "weekly", "monthly", "yearly"];

export default async function ReportsPage({
  searchParams
}: {
  searchParams: Promise<{ interval?: string }>;
}) {
  const params = await searchParams;
  const interval = intervals.includes(params.interval as ReportInterval)
    ? (params.interval as ReportInterval)
    : "monthly";
  const data = await getReportsPageData(interval);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reports"
        title="Insight yang siap dibagikan atau diekspor."
        description="Pilih interval laporan, tinjau cash flow, dan ekspor data CSV untuk analisis lanjut."
        actions={
          <>
            {intervals.map((item) => (
              <Button key={item} asChild variant={item === interval ? "default" : "outline"} size="sm">
                <Link
                  href={{
                    pathname: "/reports",
                    query: { interval: item }
                  }}
                >
                  {item}
                </Link>
              </Button>
            ))}
          </>
        }
      />
      <ReportOverview report={data.report} />
    </div>
  );
}
