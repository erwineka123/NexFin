import { PageHeader } from "@/components/layout/page-header";
import { CreateWalletForm } from "@/features/wallets/components/create-wallet-form";
import { WalletGrid } from "@/features/wallets/components/wallet-grid";
import { getWalletsPageData } from "@/features/wallets/services/get-wallets-page-data";

export default async function WalletsPage() {
  const data = await getWalletsPageData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Wallets"
        title="Semua wallet dalam satu kanvas."
        description="Kelola cash, bank account, credit card, dan e-wallet dengan visual yang cepat dibaca."
      />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.2fr]">
        <CreateWalletForm />
        <WalletGrid wallets={data.walletInsights} />
      </div>
    </div>
  );
}

