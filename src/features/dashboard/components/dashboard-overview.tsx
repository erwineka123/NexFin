import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { CashFlowChart } from "@/components/charts/cash-flow-chart";
import { CategoryBreakdownChart } from "@/components/charts/category-breakdown-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalList } from "@/features/goals/components/goal-list";
import { BudgetList } from "@/features/budgets/components/budget-list";
import { SummaryCard } from "@/features/dashboard/components/summary-card";
import { ReminderFeed } from "@/features/dashboard/components/reminder-feed";
import { TransactionTable } from "@/features/transactions/components/transaction-table";
import { formatCompactCurrency } from "@/lib/helpers/currency";
import type { DashboardSnapshot } from "@/types/finance";

export function DashboardOverview({ data }: { data: DashboardSnapshot }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardContent className="surface-grid relative p-8">
            <div className="max-w-2xl space-y-5">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                <Sparkles className="h-4 w-4" />
                July 2026 momentum
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Net savings kamu bergerak positif dan budget inti masih terkendali.
                </h3>
                <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                  Fokus minggu ini ada pada optimasi pengeluaran shopping, sambil tetap menjaga kontribusi ke emergency fund.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <Link href="/transactions">
                    Tambah transaksi
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/reports">Lihat laporan</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet distribution</CardTitle>
            <CardDescription>Komposisi saldo lintas rekening dan e-wallet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.wallets.map((wallet) => (
              <div key={wallet.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: wallet.color }} />
                    <p className="font-medium">{wallet.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCompactCurrency(wallet.balance)}</p>
                    <p className="text-xs text-muted-foreground">{wallet.share.toFixed(0)}% of total</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${wallet.share}%`, backgroundColor: wallet.color }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.summary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <Card>
          <CardHeader>
            <CardTitle>Monthly cash flow</CardTitle>
            <CardDescription>Perbandingan income dan expense dalam beberapa bulan terakhir.</CardDescription>
          </CardHeader>
          <CardContent>
            <CashFlowChart data={data.cashFlow} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense categories</CardTitle>
            <CardDescription>Kategori pengeluaran yang paling dominan saat ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CategoryBreakdownChart data={data.categoryBreakdown} />
            <div className="grid gap-2">
              {data.categoryBreakdown.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatCompactCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.95fr]">
        <TransactionTable transactions={data.recentTransactions} limit={6} compact />
        <ReminderFeed initialNotifications={data.notifications} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <BudgetList budgets={data.budgets} limit={4} />
        <GoalList goals={data.goals} limit={2} />
      </div>
    </div>
  );
}

