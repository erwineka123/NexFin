"use client";

import { Ellipsis, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { APP_NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/helpers/cn";

export function MobileNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryItems = useMemo(() => APP_NAVIGATION.slice(0, 4), []);
  const secondaryItems = useMemo(() => APP_NAVIGATION.slice(4), []);
  const isSecondaryRoute = secondaryItems.some((item) => pathname === item.href);

  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }

    if (isMoreOpen) {
      document.addEventListener("pointerdown", handlePointerDown);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMoreOpen]);

  return (
    <div ref={containerRef} className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
      {isMoreOpen ? (
        <div className="mb-3 rounded-[28px] border border-white/40 bg-card/95 p-3 shadow-soft backdrop-blur-xl dark:border-white/10">
          <div className="mb-3 flex items-start justify-between gap-3 px-1">
            <div>
              <p className="text-sm font-semibold">More pages</p>
              <p className="text-xs text-muted-foreground">
                Goals, reports, dan settings tetap mudah dijangkau di layar kecil.
              </p>
            </div>
            <button
              type="button"
              aria-label="Tutup menu tambahan"
              className="rounded-full border border-border bg-background/80 p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setIsMoreOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="grid grid-cols-3 gap-2">
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-2xl px-3 py-4 text-center text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/70 text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}

      <div className="rounded-[28px] border border-white/40 bg-card/90 p-2 shadow-soft backdrop-blur-xl dark:border-white/10">
        <nav className="grid grid-cols-5 gap-1">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            aria-expanded={isMoreOpen}
            aria-label="Buka menu tambahan"
            className={cn(
              "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-medium transition-colors",
              isMoreOpen || isSecondaryRoute
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            )}
            onClick={() => setIsMoreOpen((current) => !current)}
          >
            <Ellipsis className="h-4 w-4" />
            <span>More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
