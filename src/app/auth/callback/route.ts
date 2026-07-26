import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

import { getSupabaseEnv } from "@/lib/supabase/env";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const env = getSupabaseEnv();

  if (!code || !env) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get("cookie") ?? "";

        return cookieHeader
          .split(";")
          .map((chunk) => chunk.trim())
          .filter(Boolean)
          .map((chunk) => {
            const [name, ...rest] = chunk.split("=");
            return {
              name,
              value: rest.join("=")
            };
          });
      },
      setAll(items) {
        items.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  await supabase.auth.exchangeCodeForSession(code);

  return response;
}
