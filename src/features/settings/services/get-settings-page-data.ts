import { getCurrentUser } from "@/lib/auth/get-current-user";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function getSettingsPageData() {
  return {
    user: await getCurrentUser(),
    supabaseConfigured: isSupabaseConfigured()
  };
}
