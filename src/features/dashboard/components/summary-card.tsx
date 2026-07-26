import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helpers/currency";
import type { SummaryMetric } from "@/types/finance";

export function SummaryCard({ item }: { item: SummaryMetric }) {
  return (
<Card className={`overflow-hidden bg-gradient-to-br ${item.accent}`}>
  <CardContent className="relative min-w-0 p-4 sm:p-6">

    <div className="absolute right-4 top-4 rounded-full bg-white/40 p-2 text-foreground/80 dark:bg-white/10">
      <ArrowUpRight className="h-4 w-4" />
    </div>

    <p className="truncate pr-10 text-sm text-muted-foreground">
      {item.label}
    </p>

    <p className="mt-3 break-words text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
      {formatCurrency(item.value)}
    </p>

    <p className="mt-2 break-words text-sm text-muted-foreground">
      {item.delta}
    </p>

  </CardContent>
</Card>
  );
}

