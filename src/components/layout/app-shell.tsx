import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopBar } from "@/components/layout/top-bar";
import type { AppUser } from "@/types/finance";

export function AppShell({
  user,
  children
}: {
  user: AppUser | null;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-80" />
      <div className="relative mx-auto flex max-w-[1600px] gap-6 px-3 py-3 md:px-4 lg:px-6">
        <SidebarNav />
        <div className="flex min-h-[calc(100vh-1.5rem)] flex-1 flex-col gap-6 pb-24 lg:pb-6">
          <TopBar user={user} />
          <main className="space-y-6">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

