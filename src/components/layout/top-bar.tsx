import { Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { AppUser } from "@/types/finance";

export function TopBar({ user }: { user: AppUser | null }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/40 bg-card/70 px-5 py-4 shadow-soft backdrop-blur-xl dark:border-white/10 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        {/* <Badge className="w-fit gap-1" variant="default">
          <Sparkles className="h-3.5 w-3.5" />
          Financial command center
        </Badge> */}
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Kelola keuangan harian dengan ritme yang lebih tenang.
        </h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan ini disiapkan untuk Minggu, 26 Juli 2026.
        </p>
      </div>

<div className="flex items-center gap-3">
  <ThemeToggle />

  {user ? (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-3 py-2">
      <Avatar className="h-10 w-10">
        <AvatarFallback>{user.avatarFallback}</AvatarFallback>
      </Avatar>

      <div>
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.plan}</p>
      </div>
    </div>
  ) : (
    <Link href="/sign-in"
      className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-3 py-2 transition-colors hover:bg-accent"
    >
      <Avatar className="h-10 w-10">
        <AvatarFallback>G</AvatarFallback>
      </Avatar>

      <div>
        <p className="text-sm font-semibold">Guest User</p>
        <p className="text-xs text-primary">Klik untuk Login</p>
      </div>
    </Link>
  )}
</div>

    </div>
  );
}