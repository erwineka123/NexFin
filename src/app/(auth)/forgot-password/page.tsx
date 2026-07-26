import Link from "next/link";

import { ForgotPasswordForm } from "../../../features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="text-muted-foreground mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <ForgotPasswordForm />

      <Link
        href="/sign-in"
        className="text-sm text-blue-600 hover:underline"
      >
        Back to Sign In
      </Link>
    </div>
  );
}