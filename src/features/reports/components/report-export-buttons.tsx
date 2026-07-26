"use client";

import { Download, FileSpreadsheet, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildCashFlowCsv, buildCategoryCsv } from "@/lib/helpers/report";
import type { ReportSnapshot } from "@/types/finance";

function downloadFile(fileName: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function ReportExportButtons({ report }: { report: ReportSnapshot }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={() => downloadFile("cash-flow-report.csv", buildCashFlowCsv(report.cashFlow))}
      >
        <Download className="h-4 w-4" />
        Export cash flow CSV
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          downloadFile("expense-categories.csv", buildCategoryCsv(report.categoryBreakdown))
        }
      >
        <FileSpreadsheet className="h-4 w-4" />
        Export categories CSV
      </Button>
      <Button variant="ghost" disabled>
        <FileText className="h-4 w-4" />
        PDF & Excel next
      </Button>
    </div>
  );
}

