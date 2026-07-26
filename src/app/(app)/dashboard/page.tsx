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
        title={`Halo ${firstName}, ini pulse keuanganmu`}
        description="Dashboard ini merangkum saldo, cash flow, budget, goals, dan reminder penting agar keputusan harian terasa lebih ringan."
        actions={
          <>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/wallets">Kelola Wallet</Link>
            </Button>

            <Button
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/transactions">Tambah Transaksi</Link>
            </Button>
          </>
        }
      />
      <DashboardOverview data={data} />
    </div>
  );
}

