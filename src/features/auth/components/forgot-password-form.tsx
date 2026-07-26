"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "../schemas/forgot-password-schema";

import { forgotPasswordAction } from "../actions/forgot-password-action";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setLoading(true);

    const result = await forgotPasswordAction(values);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    form.reset();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label>Email</label>

        <input
          {...form.register("email")}
          type="email"
          className="w-full rounded-lg border p-3"
          placeholder="name@email.com"
        />

        {form.formState.errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 p-3 text-white"
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
      </button>
    </form>
  );
}