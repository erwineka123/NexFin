import { PageHeader } from "@/components/layout/page-header";
import { BudgetList } from "@/features/budgets/components/budget-list";
import { getBudgetsPageData } from "@/features/budgets/services/get-budgets-page-data";

export default async function BudgetsPage() {
  const data = await getBudgetsPageData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Budgets"
        title="Beri batas yang sehat untuk setiap kategori."
        description="Monitor pemakaian budget bulanan dan lihat lebih cepat saat pengeluaran mulai melenceng."
      />
      <BudgetList budgets={data.budgets} />
    </div>
  );
}

