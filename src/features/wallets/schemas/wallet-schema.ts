import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().min(2, "Nama wallet minimal 2 karakter."),
  startingBalance: z.coerce.number().positive("Saldo awal harus lebih dari 0."),
  icon: z.string().min(1, "Pilih ikon wallet."),
  color: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, "Warna harus berupa hex color yang valid.")
});

export type WalletValues = z.infer<typeof walletSchema>;

