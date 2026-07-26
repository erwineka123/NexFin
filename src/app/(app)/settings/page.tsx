import Link from "next/link";
import { CheckCircle2, DatabaseZap, ShieldCheck, UserCircle2 } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSettingsPageData } from "@/features/settings/services/get-settings-page-data";

export default async function SettingsPage() {
  const data = await getSettingsPageData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Status environment, auth, dan kesiapan backend."
        description="Tempat cepat untuk melihat apakah aplikasi sedang berjalan di demo mode atau sudah terhubung ke Supabase."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Account preview
            </CardTitle>
            <CardDescription>Identitas pengguna yang sedang dipakai oleh layout aplikasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-medium">{data.user?.name ?? "Guest User"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.user?.email ?? "Belum login"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="font-medium">{data.user?.plan ?? "Preview Mode"}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/sign-in">Buka halaman login</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DatabaseZap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Supabase connection
            </CardTitle>
            <CardDescription>Koneksi environment menentukan apakah data real-time atau demo data yang dipakai.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant={data.supabaseConfigured ? "default" : "warning"}>
              {data.supabaseConfigured ? "Connected" : "Demo mode"}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {data.supabaseConfigured
                ? "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah tersedia."
                : "Isi .env.local untuk menyalakan auth, query live, dan penyimpanan transaksi ke Supabase."}
            </p>
            <Separator />
            <div className="space-y-2 text-sm">
              {[
                "Next.js App Router dan Server Components aktif",
                "Server action untuk wallet, transaction, dan auth sudah disiapkan",
                "Struktur feature-based siap dikembangkan ke CRUD penuh"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Security readiness
          </CardTitle>
          <CardDescription>Checklist singkat sebelum aplikasi dipakai dengan data pribadi.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {[
            "RLS perlu diaktifkan di semua tabel Supabase.",
            "Jangan letakkan service role key di frontend.",
            "Semua insert berjalan lewat server action tervalidasi.",
            "Google OAuth perlu diaktifkan di dashboard Supabase Auth."
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-background/70 p-4 text-sm">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

