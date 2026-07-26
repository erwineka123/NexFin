import { CalendarClock, Target } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/helpers/currency";
import { daysUntil, formatLongDate, formatShortDate } from "@/lib/helpers/date";
import type { FinancialGoal } from "@/types/finance";

export function GoalList({
  goals,
  limit
}: {
  goals: FinancialGoal[];
  limit?: number;
}) {
  const items = typeof limit === "number" ? goals.slice(0, limit) : goals;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial goals</CardTitle>
        <CardDescription>MAAF, SEDANG DALAM PENGEMBANGAN.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Fitur ini belum tersedia.</p>
        ) : null}

        {items.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;

          return (
            <div key={goal.id} className="space-y-4 rounded-2xl border border-border bg-background/70 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <p className="font-medium">{goal.title}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center justify-end gap-1">
                    <CalendarClock className="h-4 w-4" />
                    <span>{daysUntil(goal.deadline)} hari lagi</span>
                  </div>
                  <p>{formatLongDate(goal.deadline)}</p>
                </div>
              </div>

              <Progress value={progress} />

              <div className="grid gap-2 rounded-2xl bg-secondary/60 p-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Contribution history
                </p>
                {goal.contributions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Belum ada kontribusi tercatat.</p>
                ) : null}
                {goal.contributions.map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between text-sm">
                    <span>{formatShortDate(contribution.contributedAt)}</span>
                    <span className="font-medium">{formatCurrency(contribution.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

