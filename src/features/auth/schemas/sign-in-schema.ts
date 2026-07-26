import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .email("Masukkan alamat email yang valid."),

  password: z
    .string()
    .min(1, "Password wajib diisi.")
    .min(8, "Password minimal 8 karakter.")
});

export type SignInValues = z.infer<typeof signInSchema>;