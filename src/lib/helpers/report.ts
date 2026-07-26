import type { CategoryBreakdownPoint, CashFlowPoint } from "@/types/finance";

function escapeCell(value: string | number) {
  const normalized = String(value).replaceAll("\"", "\"\"");
  return `"${normalized}"`;
}

export function buildCashFlowCsv(rows: CashFlowPoint[]) {
  const header = ["Periode", "Income", "Expense", "Savings"];
  const body = rows.map((row) =>
    [row.label, row.income, row.expense, row.savings].map(escapeCell).join(",")
  );

  return [header.join(","), ...body].join("\n");
}

export function buildCategoryCsv(rows: CategoryBreakdownPoint[]) {
  const header = ["Kategori", "Nominal"];
  const body = rows.map((row) => [row.name, row.value].map(escapeCell).join(","));

  return [header.join(","), ...body].join("\n");
}

