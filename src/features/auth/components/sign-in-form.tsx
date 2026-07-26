"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Chrome,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInAction } from "@/features/auth/actions/sign-in-action";
import { signInWithGoogleAction } from "@/features/auth/actions/oauth-action";

import {
  signInSchema,
  type SignInValues,
} from "@/features/auth/schemas/sign-in-schema";

export function SignInForm({ note }: { note?: string }) {
  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState<string | null>(note ?? null);

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setMessage(null);

    startTransition(async () => {
      const result = await signInAction(values);

      if (!result.success) {
        setMessage(result.message);
      }
    });
  });

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">
          Welcome Back 👋
        </CardTitle>

        <CardDescription>
          Masuk untuk melanjutkan mengelola keuanganmu.
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit}>
        <CardContent className="space-y-5">

          {message && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
              {message}
            </div>
          )}

          <div className="space-y-2">

            <Label htmlFor="email">
              Email
            </Label>

            <div className="relative">

              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                className="pl-10"
                {...form.register("email")}
              />

            </div>

            <p className="text-sm text-destructive">
              {form.formState.errors.email?.message}
            </p>

          </div>

          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <Label htmlFor="password">
                Password
              </Label>

              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Lupa Password?
              </Link>

            </div>

            <div className="relative">

              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10"
                {...form.register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

            </div>

            <p className="text-sm text-destructive">
              {form.formState.errors.password?.message}
            </p>

          </div>

        </CardContent>

        <CardFooter className="flex flex-col gap-3">

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await signInWithGoogleAction();
              })
            }
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">

            Belum punya akun?{" "}

            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Daftar
            </Link>

          </p>

        </CardFooter>
      </form>
    </Card>
  );
}