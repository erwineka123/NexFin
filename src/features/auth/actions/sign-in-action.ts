"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

import type { ActionResponse } from "@/types/finance";

import {
  signInSchema,
  type SignInValues,
} from "../schemas/sign-in-schema";

function invalidResponse(
  fieldErrors?: Record<string, string[]>,
  message = "Mohon periksa kembali data yang dimasukkan."
): ActionResponse {
  return {
    success: false,
    message,
    fieldErrors,
  };
}

export async function signInAction(
  values: SignInValues
): Promise<ActionResponse> {
  // Validasi menggunakan Zod
  const parsed = signInSchema.safeParse(values);

  if (!parsed.success) {
    return invalidResponse(parsed.error.flatten().fieldErrors);
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      message:
        "Supabase belum dikonfigurasi. Silakan periksa file .env.local.",
    };
  }

  const { email, password } = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: mapAuthError(error.message),
    };
  }

  redirect("/dashboard");
}

function mapAuthError(message: string): string {
  switch (message) {
    case "Invalid login credentials":
      return "Email atau password salah.";

    case "Email not confirmed":
      return "Silakan verifikasi email terlebih dahulu.";

    case "User not found":
      return "Akun tidak ditemukan.";

    default:
      return message;
  }
}