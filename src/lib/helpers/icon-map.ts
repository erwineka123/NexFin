import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CarFront,
  CreditCard,
  HeartPulse,
  Landmark,
  PiggyBank,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Tag,
  UtensilsCrossed,
  Wallet
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BadgeDollarSign,
  BriefcaseBusiness,
  CarFront,
  CreditCard,
  HeartPulse,
  Landmark,
  PiggyBank,
  ReceiptText,
  ShoppingBag,
  Smartphone,
  Tag,
  UtensilsCrossed,
  Wallet
};

export function getIconByName(name: string) {
  return iconMap[name] ?? Wallet;
}

