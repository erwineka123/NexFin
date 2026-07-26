"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { formatCompactCurrency } from "@/lib/helpers/currency";
import { formatMonthLabel } from "@/lib/helpers/date";
import type { CashFlowPoint } from "@/types/finance";

function TooltipContent({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-border bg-background/95 p-3 shadow-soft">
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-2 space-y-1.5">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium">{formatCompactCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CashFlowChart({
  data,
  mode = "area"
}: {
  data: CashFlowPoint[];
  mode?: "area" | "bar";
}) {
  const chartData = data.map((item) => ({
    ...item,
    displayLabel: formatMonthLabel(`${item.label}-01T00:00:00.000Z`)
  }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {mode === "bar" ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="displayLabel" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis
              tickFormatter={(value) => formatCompactCurrency(value)}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip content={<TooltipContent />} />
            <Bar dataKey="income" fill="#10b981" radius={[10, 10, 0, 0]} />
            <Bar dataKey="expense" fill="#f59e0b" radius={[10, 10, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.38} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="displayLabel" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis
              tickFormatter={(value) => formatCompactCurrency(value)}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip content={<TooltipContent />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fill="url(#incomeFill)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f59e0b"
              fill="url(#expenseFill)"
              strokeWidth={2.5}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

