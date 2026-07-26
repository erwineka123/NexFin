import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return <AppShell user={user}>{children}</AppShell>;
}

