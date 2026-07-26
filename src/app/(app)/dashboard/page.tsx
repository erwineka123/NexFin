import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { getDashboardData } from "@/features/dashboard/services/get-dashboard-data";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const firstName = data.user?.name.split(" ")[0] ?? "teman";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title={`Halo ${firstName}, ini pulse keuanganmu.`}
        description="Dashboard ini merangkum saldo, cash flow, budget, goals, dan reminder penting agar keputusan harian terasa lebih ringan."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/wallets">Kelola wallet</Link>
            </Button>
            <Button asChild>
              <Link href="/transactions">Tambah transaksi</Link>
            </Button>
          </>
        }
      />
      <DashboardOverview data={data} />
    </div>
  );
}

