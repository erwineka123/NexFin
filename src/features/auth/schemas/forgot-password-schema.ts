import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email tidak valid"),
});

export type ForgotPasswordValues = z.infer<
  typeof forgotPasswordSchema
>;