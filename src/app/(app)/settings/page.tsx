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
      {/* <PageHeader
        eyebrow="Settings"
        title="Status environment, auth, dan kesiapan backend."
        description="Tempat cepat untuk melihat apakah aplikasi sedang berjalan di demo mode atau sudah terhubung ke Supabase."
      /> */}

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Account preview
            </CardTitle>
            <CardDescription>Identitas pengguna aplikasi NexFin.</CardDescription>
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
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Security System
            </CardTitle>
            <CardDescription>Sistem keamanan yang melindungi data dan akses aplikasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <Badge variant={data.supabaseConfigured ? "default" : "warning"}>
              {data.supabaseConfigured ? "Connected" : "Demo mode"}
            </Badge> */}
            {/* <p className="text-sm text-muted-foreground">
              {data.supabaseConfigured
                ? "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah tersedia."
                : "Isi .env.local untuk menyalakan auth, query live, dan penyimpanan transaksi ke Supabase."}
            </p> */}
            <Separator />
            <div className="space-y-2 text-sm">
              {[
                "RLS telah diaktifkan di semua tabel database.",
                "Role key telah diamankan di backend, keamanan data pribadi terjaga.",
                "Semua proses input berjalan melaui server action tervalidasi.",
                "Data pribadi pengguna tidak tersimpan di frontend, hanya di database.",
                "Semua proses transaksi telah dienkripsi.",
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
    </div>
  );
}

