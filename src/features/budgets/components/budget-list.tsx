import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/helpers/currency";
import type { BudgetProgress } from "@/types/finance";

function budgetVariant(status: BudgetProgress["status"]) {
  if (status === "exceeded") {
    return "destructive";
  }

  if (status === "warning") {
    return "warning";
  }

  return "default";
}

export function BudgetList({
  budgets,
  limit
}: {
  budgets: BudgetProgress[];
  limit?: number;
}) {
  const items = typeof limit === "number" ? budgets.slice(0, limit) : budgets;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget progress</CardTitle>
        <CardDescription>MOHON MAAF, SEDANG DALAM PENGEMBANGAN.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Fitur ini belum tersedia.</p>
        ) : null}

        {items.map((budget) => (
          <div key={budget.id} className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">{budget.categoryName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(budget.spentAmount)} / {formatCurrency(budget.limitAmount)}
                </p>
              </div>
              <Badge variant={budgetVariant(budget.status)}>
                {budget.status === "healthy" ? (
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                ) : (
                  <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                )}
                {budget.utilization.toFixed(0)}%
              </Badge>
            </div>
            <Progress value={budget.utilization} />
            <p className="text-sm text-muted-foreground">
              {budget.remainingAmount >= 0
                ? `Sisa ${formatCurrency(budget.remainingAmount)} untuk bulan ini.`
                : `Melewati limit sebesar ${formatCurrency(Math.abs(budget.remainingAmount))}.`}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

