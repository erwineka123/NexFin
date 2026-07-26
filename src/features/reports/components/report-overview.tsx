import { CashFlowChart } from "@/components/charts/cash-flow-chart";
import { CategoryBreakdownChart } from "@/components/charts/category-breakdown-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportExportButtons } from "@/features/reports/components/report-export-buttons";
import { formatCurrency } from "@/lib/helpers/currency";
import type { ReportSnapshot } from "@/types/finance";

export function ReportOverview({ report }: { report: ReportSnapshot }) {
  return (
    <div className="space-y-6">
      <ReportExportButtons report={report} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total income</CardDescription>
            <CardTitle>{formatCurrency(report.totalIncome)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total expense</CardDescription>
            <CardTitle>{formatCurrency(report.totalExpense)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net savings</CardDescription>
            <CardTitle>{formatCurrency(report.netSavings)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Transactions</CardDescription>
            <CardTitle>{report.transactionCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Cash flow trend</CardTitle>
            <CardDescription>Visualisasi income vs expense untuk interval laporan yang dipilih.</CardDescription>
          </CardHeader>
          <CardContent>
            <CashFlowChart data={report.cashFlow} mode="bar" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category concentration</CardTitle>
            <CardDescription>Lihat pengeluaran mana yang paling banyak menyerap budget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CategoryBreakdownChart data={report.topExpenseCategories} />
            <div className="space-y-2">
              {report.topExpenseCategories.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

