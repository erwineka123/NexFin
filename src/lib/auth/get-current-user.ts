import { demoUser } from "@/lib/demo-data";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AppUser } from "@/types/finance";

export async function getCurrentUser(): Promise<AppUser | null> {
  if (!isSupabaseConfigured()) {
    return demoUser;
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const metadata = user.user_metadata;
  const fallbackName =
    typeof metadata?.full_name === "string"
      ? metadata.full_name
      : typeof metadata?.name === "string"
        ? metadata.name
        : user.email?.split("@")[0] ?? "User";

  return {
    id: user.id,
    name: fallbackName,
    email: user.email ?? "",
    plan: "User Account",
    avatarFallback: fallbackName.slice(0, 2).toUpperCase()
  };
}

