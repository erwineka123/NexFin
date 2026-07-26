"use server";

import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ActionResponse } from "@/types/finance";

import {
  signUpSchema,
  type SignUpValues,
} from "../schemas/sign-up-schema";

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

export async function signUpAction(
  values: SignUpValues
): Promise<ActionResponse> {
  // Validate input
  const parsed = signUpSchema.safeParse(values);

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

  const { fullName, email, password } = parsed.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: mapAuthError(error.message),
    };
  }

  redirect("/sign-in?registered=true");
}

function mapAuthError(message: string): string {
  switch (message) {
    case "User already registered":
      return "Email sudah terdaftar.";

    case "Password should be at least 6 characters":
      return "Password terlalu pendek.";

    case "Signup is disabled":
      return "Registrasi sedang dinonaktifkan.";

    default:
      return message;
  }
}