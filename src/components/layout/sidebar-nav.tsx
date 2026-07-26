"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/helpers/cn";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[290px] flex-col overflow-hidden rounded-[32px] border border-white/40 bg-card/70 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 lg:flex">
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
            Nexfin
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Keuangan, Lebih Rapi</h2>
        </div>

        <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {APP_NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-start gap-3 rounded-3xl px-4 py-3 transition-colors",
                  isActive ? "bg-primary text-primary-foreground shadow-glow" : "hover:bg-accent"
                )}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p
                    className={cn(
                      "text-sm",
                      isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* <div className="mt-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Demo + Supabase ready</p>
        <p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-200/80">
          UI tetap hidup dengan demo data, lalu otomatis siap pindah ke backend saat env Supabase diisi.
        </p>
      </div> */}
    </aside>
  );
}
