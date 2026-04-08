/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { registerPatient } from "@/services/auth/registerPatient";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerPatient, null);
    console.log(state, "state");

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        }
        return null;
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">

            <form action={formAction}>
                <FieldGroup className="space-y-6">
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field className="space-y-1.5">
                            <FieldLabel htmlFor="name" className="text-gray-700 font-medium">Full Name</FieldLabel>
                            <Input 
                                id="name" 
                                name="name" 
                                type="text" 
                                placeholder="John Doe" 
                                className="w-full transition-colors focus:border-black focus:ring-black"
                            />
                            {getFieldError("name") && (
                                <FieldDescription className="text-sm text-red-500 mt-1">
                                    {getFieldError("name")}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field className="space-y-1.5">
                            <FieldLabel htmlFor="email" className="text-gray-700 font-medium">Email Address</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                className="w-full transition-colors focus:border-black focus:ring-black"
                            />
                            {getFieldError("email") && (
                                <FieldDescription className="text-sm text-red-500 mt-1">
                                    {getFieldError("email")}
                                </FieldDescription>
                            )}
                        </Field>
                    </div>

                    {/* Row 2: Address (Full Width) */}
                    <Field className="space-y-1.5">
                        <FieldLabel htmlFor="address" className="text-gray-700 font-medium">Address</FieldLabel>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="123 Main St, City, Country"
                            className="w-full transition-colors focus:border-black focus:ring-black"
                        />
                        {getFieldError("address") && (
                            <FieldDescription className="text-sm text-red-500 mt-1">
                                {getFieldError("address")}
                            </FieldDescription>
                        )}
                    </Field>

                    {/* Row 3: Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field className="space-y-1.5">
                            <FieldLabel htmlFor="password" className="text-gray-700 font-medium">Password</FieldLabel>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full transition-colors focus:border-black focus:ring-black"
                            />
                            {getFieldError("password") && (
                                <FieldDescription className="text-sm text-red-500 mt-1">
                                    {getFieldError("password")}
                                </FieldDescription>
                            )}
                        </Field>

                        <Field className="space-y-1.5">
                            <FieldLabel htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</FieldLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="w-full transition-colors focus:border-black focus:ring-black"
                            />
                            {getFieldError("confirmPassword") && (
                                <FieldDescription className="text-sm text-red-500 mt-1">
                                    {getFieldError("confirmPassword")}
                                </FieldDescription>
                            )}
                        </Field>
                    </div>

                    {/* Submit & Footer */}
                    <div className="pt-4 space-y-4">
                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors font-medium rounded-lg"
                        >
                            {isPending ? "Creating Account..." : "Create Account"}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <a 
                                href="/login" 
                                className="font-semibold text-zinc-900 hover:text-zinc-700 hover:underline underline-offset-4 transition-colors"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </FieldGroup>
            </form>
        </div>
    );
};

export default RegisterForm;