/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      // Added optional chaining below to prevent crashes if error is undefined
      return error?.message || null; 
    }
    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 sm:p-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">

      <form action={formAction} className="space-y-6">
        {redirect && <input type="hidden" name="redirect" value={redirect} />}
        <FieldGroup className="space-y-5">
          {/* Email */}
          <Field className="space-y-2">
            <FieldLabel htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
            />
            {getFieldError("email") && (
              <FieldDescription className="text-sm font-medium text-red-500 mt-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>

          {/* Password */}
          <Field className="space-y-2">
            <div className="flex justify-between items-center">
              <FieldLabel htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </FieldLabel>
              <a 
                href="/forget-password" 
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
            />
            {getFieldError("password") && (
              <FieldDescription className="text-sm font-medium text-red-500 mt-1 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>

        <FieldGroup className="pt-2">
          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full py-3.5 rounded-xl text-white font-semibold shadow-md shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Sign in to account"
            )}
          </Button>

          {/* Sign Up Link */}
          <FieldDescription className="mt-8 text-center text-sm text-gray-600 font-medium">
            Don&apos;t have an account?{" "}
            <a 
              href="/register" 
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign up for free
            </a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
};

export default LoginForm;