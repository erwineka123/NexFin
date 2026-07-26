"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { formatCompactCurrency } from "@/lib/helpers/currency";
import type { CategoryBreakdownPoint } from "@/types/finance";

export function CategoryBreakdownChart({ data }: { data: CategoryBreakdownPoint[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={112}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCompactCurrency(Number(value ?? 0))}
            contentStyle={{
              borderRadius: "18px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              backgroundColor: "rgba(255,255,255,0.95)"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
