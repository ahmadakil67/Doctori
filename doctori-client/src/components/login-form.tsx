"use client";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { loginUser } from "@/services/auth/loginUser";

import InputFieldError from "./shared/InputFieldError";

import { Button } from "./ui/button";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "./ui/field";

import { Input } from "./ui/input";

const LoginForm = ({
  redirect,
}: {
  redirect?: string;
}) => {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    loginUser,
    null
  );

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  useEffect(() => {
    if (
      state &&
      !state.success &&
      state.message
    ) {
      toast.error(
        state.message
      );
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      {redirect && (
        <input
          type="hidden"
          name="redirect"
          value={redirect}
        />
      )}

      <FieldGroup>
        <div className="space-y-5">

          {/* ==================================
              EMAIL
          ================================== */}

          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Email Address
            </FieldLabel>

            <div className="relative mt-2">

              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                disabled={isPending}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            <InputFieldError
              field="email"
              state={state}
            />
          </Field>

          {/* ==================================
              PASSWORD
          ================================== */}

          <Field>
            <div className="flex items-center justify-between">

              <FieldLabel
                htmlFor="password"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Password
              </FieldLabel>

              <Link
                href="/forget-password"
                className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative mt-2">

              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                disabled={isPending}
                className="h-11 rounded-xl pl-10 pr-11"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current
                  )
                }
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-slate-200"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <InputFieldError
              field="password"
              state={state}
            />
          </Field>
        </div>
      </FieldGroup>

      {/* ==================================
          SUBMIT
      ================================== */}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-xl bg-blue-600 font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* ==================================
          REGISTER
      ================================== */}

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}

        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;