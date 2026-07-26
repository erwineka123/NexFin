"use client";

import { Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { AppUser } from "@/types/finance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, User } from "lucide-react";

export function TopBar({ user }: { user: AppUser | null }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout gagal:", error);
    return;
  }

  router.push("/sign-in"); // sesuaikan jika route login kamu berbeda
  router.refresh();
  };
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/40 bg-card/70 px-5 py-4 shadow-soft backdrop-blur-xl dark:border-white/10 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        {/* <Badge className="w-fit gap-1" variant="default">
          <Sparkles className="h-3.5 w-3.5" />
          Financial command center
        </Badge> */}
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Atur Uang Tanpa Ribet
        </h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan ini disiapkan untuk{" "}
            {new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            }).format(new Date())}.
        </p>
      </div>

<div className="flex items-center gap-3">
  <ThemeToggle />

  {user ? (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-3 py-2 transition-colors hover:bg-accent outline-none max-w-full">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback>{user.avatarFallback}</AvatarFallback>
        </Avatar>

      <div className="min-w-0 text-left">
        <p className="truncate text-sm font-semibold">
          {user.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {user.plan}
        </p>
      </div>
    </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-56">
      {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
      <DropdownMenuSeparator />

      {/* <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem> */}

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="text-red-500 focus:text-red-500"
        onClick={handleLogout}
      >
      <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
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