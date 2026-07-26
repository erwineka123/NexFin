import { EmptyState } from "@/components/layout/empty-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getIconByName } from "@/lib/helpers/icon-map";
import { formatCurrency } from "@/lib/helpers/currency";
import type { WalletInsight } from "@/types/finance";

export function WalletGrid({ wallets }: { wallets: WalletInsight[] }) {
  if (wallets.length === 0) {
    return (
      <EmptyState
        title="Belum ada wallet"
        description="Tambahkan rekening, cash, atau e-wallet pertama untuk mulai memantau saldo."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {wallets.map((wallet) => {
        const Icon = getIconByName(wallet.icon);

        return (
          <Card key={wallet.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="rounded-2xl p-3 text-white shadow-lg"
                  style={{ backgroundColor: wallet.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Share</p>
                  <p className="font-semibold">{wallet.share.toFixed(0)}%</p>
                </div>
              </div>
              <div className="space-y-1">
                <CardTitle>{wallet.name}</CardTitle>
                <CardDescription>Wallet aktif untuk kebutuhan harian dan tabungan.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-3xl font-semibold tracking-tight">{formatCurrency(wallet.balance)}</p>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${wallet.share}%`, backgroundColor: wallet.color }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

