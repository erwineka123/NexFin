"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type OAuthProvider =
  | "google"
  | "github"
  | "gitlab"
  | "azure"
  | "discord";

export async function signInWithOAuthAction(
  provider: OAuthProvider = "google"
) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/sign-in?error=config");
  }

  const headerStore = await headers();

  const origin =
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    redirect("/sign-in?error=oauth");
  }

  redirect(data.url as never);
}

export async function signInWithGoogleAction() {
  return signInWithOAuthAction("google");
}