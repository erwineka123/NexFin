import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Nama lengkap minimal 3 karakter.")
      .max(100, "Nama lengkap maksimal 100 karakter."),

    email: z
      .string()
      .trim()
      .min(1, "Email wajib diisi.")
      .email("Masukkan alamat email yang valid."),

    password: z
      .string()
      .min(8, "Password minimal 8 karakter.")
      .max(72, "Password maksimal 72 karakter."),

    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password wajib diisi.")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password tidak sesuai."
  });

export type SignUpValues = z.infer<typeof signUpSchema>;