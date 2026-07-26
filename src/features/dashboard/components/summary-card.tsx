import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helpers/currency";
import type { SummaryMetric } from "@/types/finance";

export function SummaryCard({ item }: { item: SummaryMetric }) {
  return (
    <Card className={`overflow-hidden bg-gradient-to-br ${item.accent}`}>
      <CardContent className="relative p-6">
        <div className="absolute right-5 top-5 rounded-full bg-white/40 p-2 text-foreground/80 dark:bg-white/10">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <p className="text-sm text-muted-foreground">{item.label}</p>
        <p className="mt-4 text-3xl font-semibold tracking-tight">{formatCurrency(item.value)}</p>
        <p className="mt-2 text-sm text-muted-foreground">{item.delta}</p>
      </CardContent>
    </Card>
  );
}

