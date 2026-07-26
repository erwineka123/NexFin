"use server";

import { forgotPasswordSchema } from "../schemas/forgot-password-schema";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { ActionResponse } from "@/types/finance";

export async function forgotPasswordAction(
  values: {
    email: string;
  }
): Promise<ActionResponse> {
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Email tidak valid.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message:
        "Demo mode: Link reset password berhasil dikirim.",
    };
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      message: "Supabase belum dikonfigurasi.",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    }
  );

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "Link reset password telah dikirim ke email kamu.",
    };
}