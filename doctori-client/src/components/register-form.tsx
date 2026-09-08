"use client";

import Link from "next/link";

import {
  Eye,
  EyeOff,
  Home,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { registerPatient } from "@/services/auth/registerPatient";

import InputFieldError from "./shared/InputFieldError";

import { Button } from "./ui/button";

import {
  Field,
  FieldGroup,
  FieldLabel,
} from "./ui/field";

import { Input } from "./ui/input";

const RegisterForm = () => {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    registerPatient,
    null
  );

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  useEffect(() => {
    if (
      state &&
      !state.success &&
      state.message
    ) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <FieldGroup>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* ==================================
              FULL NAME
          ================================== */}

          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Full Name
            </FieldLabel>

            <div className="relative mt-2">

              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                required
                disabled={isPending}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            <InputFieldError
              field="name"
              state={state}
            />
          </Field>

          {/* ==================================
              ADDRESS
          ================================== */}

          <Field>
            <FieldLabel
              htmlFor="address"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Address
            </FieldLabel>

            <div className="relative mt-2">

              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="Enter your address"
                required
                disabled={isPending}
                className="h-11 rounded-xl pl-10"
              />
            </div>

            <InputFieldError
              field="address"
              state={state}
            />
          </Field>

          {/* ==================================
              EMAIL
          ================================== */}

          <Field className="sm:col-span-2">
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
            <FieldLabel
              htmlFor="password"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Password
            </FieldLabel>

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
                autoComplete="new-password"
                placeholder="Create a password"
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
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:opacity-50 dark:hover:text-slate-200"
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

          {/* ==================================
              CONFIRM PASSWORD
          ================================== */}

          <Field>
            <FieldLabel
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Confirm Password
            </FieldLabel>

            <div className="relative mt-2">

              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="Confirm your password"
                required
                disabled={isPending}
                className="h-11 rounded-xl pl-10 pr-11"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (current) =>
                      !current
                  )
                }
                disabled={isPending}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:opacity-50 dark:hover:text-slate-200"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <InputFieldError
              field="confirmPassword"
              state={state}
            />
          </Field>
        </div>
      </FieldGroup>

      {/* ==================================
          PASSWORD INFO
      ================================== */}

      <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
        Choose a strong password and make sure both
        password fields match.
      </div>

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
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      {/* ==================================
          LOGIN
      ================================== */}

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}

        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;