"use client";

import { useQuery } from "@tanstack/react-query";

import { getRemindersAction } from "@/features/dashboard/actions/get-reminders-action";
import { formatShortDate } from "@/lib/helpers/date";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { NotificationItem } from "@/types/finance";

function toneVariant(tone: NotificationItem["tone"]) {
  if (tone === "warning") {
    return "warning";
  }

  if (tone === "success") {
    return "default";
  }

  return "secondary";
}

export function ReminderFeed({ initialNotifications }: { initialNotifications: NotificationItem[] }) {
  const query = useQuery({
    queryKey: ["reminders"],
    queryFn: getRemindersAction,
    initialData: initialNotifications
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders & alerts</CardTitle>
        <CardDescription>Budget, bills, dan progress goal yang perlu perhatian.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {query.isError ? (
          <p className="text-sm text-muted-foreground">Reminder belum bisa dimuat saat ini.</p>
        ) : null}

        {query.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada notifikasi baru. Ritme keuangan kamu sedang tenang.</p>
        ) : null}

        {query.data.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-medium break-words">{item.title}</p>
                <p className="mt-1 break-words text-sm text-muted-foreground">{item.body}</p>
              </div>
              <Badge className="w-fit shrink-0" variant={toneVariant(item.tone)}>{item.isRead ? "Read" : "New"}</Badge>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {formatShortDate(item.dueAt)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

