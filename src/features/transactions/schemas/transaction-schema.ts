import { z } from "zod";

export const transactionSchema = z.object({
  walletId: z.string().min(1, "Pilih wallet."),
  categoryId: z.string().min(1, "Pilih kategori."),
  amount: z.coerce.number().positive("Nominal harus lebih dari 0."),
  transactionDate: z
    .string()
    .min(1, "Tanggal transaksi wajib diisi.")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), "Tanggal transaksi tidak valid."),
  note: z.string().max(160, "Catatan maksimal 160 karakter.").optional().default(""),
  type: z.enum(["income", "expense", "transfer"])
});

export type TransactionValues = z.infer<typeof transactionSchema>;
