"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";

import { createWalletAction } from "@/features/wallets/actions/create-wallet-action";
import { walletSchema, type WalletValues } from "@/features/wallets/schemas/wallet-schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const walletIcons = ["Wallet", "Landmark", "Smartphone", "CreditCard"];

export function CreateWalletForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<WalletValues>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: "",
      // startingBalance: 100000,
      icon: "Wallet",
      color: "#10b981"
    }
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await createWalletAction(values);
      setMessage(result.message);

      if (result.success) {
        form.reset({
          name: "",
          // startingBalance: 100000,
          icon: "Wallet",
          color: "#10b981"
        });
      }
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create wallet</CardTitle>
        <CardDescription>Tambahkan rekening baru, cash, atau e-wallet untuk pemetaan saldo yang lebih akurat.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-name">Wallet name</Label>
            <Input id="wallet-name" placeholder="Mis. BCA" {...form.register("name")} />
            <p className="text-sm text-rose-500">{form.formState.errors.name?.message}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wallet-balance">Starting balance</Label>
            <Input id="wallet-balance" type="number" min={0} {...form.register("startingBalance")} />
            <p className="text-sm text-rose-500">{form.formState.errors.startingBalance?.message}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wallet-icon">Icon</Label>
              <Select id="wallet-icon" {...form.register("icon")}>
                {walletIcons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-color">Color</Label>
              <Input id="wallet-color" type="color" className="h-11 p-2" {...form.register("color")} />
            </div>
          </div>
          <p className="text-sm text-rose-500">{form.formState.errors.color?.message}</p>
        </CardContent>

        <CardFooter className="flex-col items-start gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan wallet"}
          </Button>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        </CardFooter>
      </form>
    </Card>
  );
}

