"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Terjadi kendala saat memuat halaman</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Aplikasi sudah menahan error ini agar pengalaman tetap aman. Coba muat ulang halaman sekali lagi.
        </p>
        <Button onClick={reset}>Coba lagi</Button>
      </CardContent>
    </Card>
  );
}

