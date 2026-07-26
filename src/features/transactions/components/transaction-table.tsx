import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSignedCurrency } from "@/lib/helpers/currency";
import { formatShortDate } from "@/lib/helpers/date";
import type { EnrichedTransaction } from "@/types/finance";

function typeVariant(type: EnrichedTransaction["type"]) {
  if (type === "expense") return "warning";
  if (type === "transfer") return "secondary";
  return "default";
}

export function TransactionTable({
  transactions,
  limit,
  compact = false,
}: {
  transactions: EnrichedTransaction[];
  limit?: number;
  compact?: boolean;
}) {
  const items =
    typeof limit === "number"
      ? transactions.slice(0, limit)
      : transactions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent transactions</CardTitle>

        <CardDescription>
          {compact
            ? "Snapshot transaksi terbaru untuk memantau ritme cash flow."
            : "Transaksi terbaru dengan konteks wallet, kategori, tanggal, dan nominal."}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>

                {/* Hidden di HP */}
                <TableHead className="hidden sm:table-cell">
                  Wallet
                </TableHead>

                {/* Hidden di HP */}
                <TableHead className="hidden md:table-cell">
                  Date
                </TableHead>

                <TableHead>Type</TableHead>

                <TableHead className="text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {transaction.categoryName}
                      </p>

                      <p className="truncate text-sm text-muted-foreground">
                        {transaction.note || "Tanpa catatan"}
                      </p>
                    </div>
                  </TableCell>

                  {/* Hidden di HP */}
                  <TableCell className="hidden sm:table-cell whitespace-nowrap">
                    {transaction.walletName}
                  </TableCell>

                  {/* Hidden di HP */}
                  <TableCell className="hidden md:table-cell whitespace-nowrap">
                    {formatShortDate(transaction.transactionDate)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className="whitespace-nowrap"
                      variant={typeVariant(transaction.type)}
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className={`whitespace-nowrap text-right font-medium ${
                      transaction.type === "expense"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {formatSignedCurrency(
                      transaction.type === "expense"
                        ? -transaction.amount
                        : transaction.amount
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}