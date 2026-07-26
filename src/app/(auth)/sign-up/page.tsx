import {
  BadgeCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SignUpForm } from "@/features/auth/components/sign-up-form";

function getNote(registered?: string) {
  if (registered === "true") {
    return "Akun berhasil dibuat. Silakan login menggunakan akun baru.";
  }

  return "Buat akun baru untuk mulai mengelola keuangan pribadimu.";
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const params = await searchParams;

  const note = getNote(params.registered);

  return (
    <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">

      {/* Left Section */}

      <div className="space-y-6 rounded-[32px] border border-white/40 bg-card/70 p-8 shadow-soft backdrop-blur-xl dark:border-white/10">

        <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
          Join Finora
        </p>

        <div className="space-y-3">

          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Mulai perjalanan finansialmu hari ini.
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground">
            Catat pemasukan, pengeluaran, kelola anggaran, dan capai target
            keuanganmu dalam satu aplikasi yang modern dan aman.
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          {[
            {
              icon: Sparkles,
              title: "Modern Dashboard",
              description:
                "Dashboard interaktif dengan insight keuangan real-time.",
            },
            {
              icon: BadgeCheck,
              title: "Smart Budget",
              description:
                "Buat budget bulanan dan pantau pengeluaran dengan mudah.",
            },
            {
              icon: ShieldCheck,
              title: "Secure by Supabase",
              description:
                "Autentikasi aman dengan Row Level Security dan Supabase Auth.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-border bg-background/60 p-4"
              >
                <div className="mb-3 w-fit rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="font-semibold">
                  {item.title}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

      {/* Right Section */}

      <div className="flex justify-center">
        <SignUpForm note={note} />
      </div>

    </div>
  );
}