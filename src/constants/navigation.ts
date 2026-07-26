import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ChartColumnBig,
  CircleDollarSign,
  CreditCard,
  Goal,
  LayoutDashboard,
  Settings2,
  WalletCards
} from "lucide-react";

export interface NavigationItem {
  href: Route;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const APP_NAVIGATION: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Ringkasan cash flow dan insight",
    icon: LayoutDashboard
  },
  {
    href: "/wallets",
    label: "Wallets",
    description: "Kelola rekening dan e-wallet",
    icon: WalletCards
  },
  {
    href: "/transactions",
    label: "Transactions",
    description: "Catat income, expense, transfer",
    icon: CircleDollarSign
  },
  {
    href: "/budgets",
    label: "Budgets",
    description: "Batas pengeluaran per kategori",
    icon: CreditCard
  },
  {
    href: "/goals",
    label: "Goals",
    description: "Target tabungan dan progres",
    icon: Goal
  },
  {
    href: "/reports",
    label: "Reports",
    description: "Analitik harian hingga tahunan",
    icon: ChartColumnBig
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Theme, Supabase, dan preferensi",
    icon: Settings2
  }
];
