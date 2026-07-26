import { BarChart3, PiggyBank, ShieldCheck } from "lucide-react";

import { SignInForm } from "@/features/auth/components/sign-in-form";

function getNote(mode?: string, error?: string) {
  if (mode === "demo") {
    return "Supabase belum aktif, jadi login belum dijalankan dan aplikasi kembali ke preview mode.";
  }

  if (error === "oauth") {
    return "Google OAuth belum berhasil dijalankan. Pastikan provider Google aktif di Supabase.";
  }

  // return "Login email dan Google sudah disiapkan, tinggal sambungkan environment Supabase.";
}

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string; error?: string }>;
}) {
  const params = await searchParams;
  const note = getNote(params.mode, params.error);

  return (
    <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 rounded-[32px] border border-white/40 bg-card/70 p-8 shadow-soft backdrop-blur-xl dark:border-white/10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
          Finora access
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Ruang pribadi untuk keputusan finansial yang lebih sadar.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Website ini menyiapkan dashboard, wallets, transactions, budgets, goals, dan reports dalam satu alur yang terasa ringan tapi tetap production-minded.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BarChart3,
              title: "Insight real-time",
              description: "Chart cash flow, expense categories, dan budget progress."
            },
            {
              icon: PiggyBank,
              title: "Goal driven",
              description: "Pantau target tabungan dan kontribusi terbaru."
            },
            {
              icon: ShieldCheck,
              title: "Supabase ready",
              description: "Auth, RLS, dan server action sudah dipersiapkan."
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-3xl border border-border bg-background/60 p-4">
                <div className="mb-3 w-fit rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <SignInForm note={note} />
      </div>
    </div>
  );
}
