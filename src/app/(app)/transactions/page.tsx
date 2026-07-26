import { PageHeader } from "@/components/layout/page-header";
import { CreateTransactionForm } from "@/features/transactions/components/create-transaction-form";
import { TransactionTable } from "@/features/transactions/components/transaction-table";
import { getTransactionsPageData } from "@/features/transactions/services/get-transactions-page-data";

export default async function TransactionsPage() {
  const data = await getTransactionsPageData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Transactions"
        title="Catat money-in dan money-out tanpa ribet."
        description="Alur ini sudah siap untuk income, expense, dan transfer, lengkap dengan validasi wallet dan kategori."
      />

      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        {/* Form */}
        <div className="min-w-0">
          <CreateTransactionForm
            wallets={data.wallets}
            categories={data.categories}
          />
        </div>

        {/* Table */}
        <div className="min-w-0">
          <TransactionTable transactions={data.transactions} />
        </div>
      </div>
    </div>
  );
}