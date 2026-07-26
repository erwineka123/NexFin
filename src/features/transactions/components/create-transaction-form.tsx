"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createTransactionAction } from "@/features/transactions/actions/create-transaction-action";
import {
  transactionSchema,
  type TransactionValues
} from "@/features/transactions/schemas/transaction-schema";
import type { Category, Wallet } from "@/types/finance";

type TransactionFormValues = Omit<TransactionValues, "transactionDate"> & {
  transactionDate: string;
};

export function CreateTransactionForm({
  wallets,
  categories
}: {
  wallets: Wallet[];
  categories: Category[];
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      walletId: wallets[0]?.id ?? "",
      categoryId: categories[0]?.id ?? "",
      amount: 0,
      transactionDate: "2026-07-26T09:00",
      note: "",
      type: "expense"
    }
  });

  const transactionType = form.watch("type");
  const filteredCategories =
    transactionType === "transfer"
      ? categories
      : categories.filter((category) => category.type === transactionType);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await createTransactionAction({
        ...values,
        transactionDate: new Date(values.transactionDate).toISOString()
      });

      setMessage(result.message);

      if (result.success) {
        form.reset({
          ...values,
          amount: 0,
          note: ""
        });
      }
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick add transaction</CardTitle>
        <CardDescription>Input harian yang cepat, tervalidasi, dan siap dikirim via server action.</CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select id="type" {...form.register("type")}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
                <option value="transfer">Transfer</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="walletId">Wallet</Label>
              <Select id="walletId" {...form.register("walletId")}>
                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select id="categoryId" {...form.register("categoryId")}>
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" min={0} step={1000} {...form.register("amount")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionDate">Transaction date</Label>
            <Input id="transactionDate" type="datetime-local" {...form.register("transactionDate")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" placeholder="Tambahkan konteks singkat..." {...form.register("note")} />
          </div>

          <div className="space-y-1 text-sm text-rose-500">
            <p>{form.formState.errors.walletId?.message}</p>
            <p>{form.formState.errors.categoryId?.message}</p>
            <p>{form.formState.errors.amount?.message}</p>
            <p>{form.formState.errors.transactionDate?.message}</p>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan transaksi"}
          </Button>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
        </CardFooter>
      </form>
    </Card>
  );
}
