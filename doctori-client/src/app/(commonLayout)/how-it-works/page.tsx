import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleCheck,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | Doctori",
  description:
    "Learn how Doctori helps you describe your symptoms, discover the right specialist, choose a doctor, and manage your appointments.",
};

const steps = [
  {
    number: "01",
    icon: HeartPulse,
    title: "Describe Your Symptoms",
    description:
      "Tell Doctori what you're experiencing in your own words. No complicated medical terms are required.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Get a Specialist Match",
    description:
      "Doctori analyzes the information you provide and guides you toward a relevant medical specialty.",
  },
  {
    number: "03",
    icon: UserRoundSearch,
    title: "Choose Your Doctor",
    description:
      "Explore doctors and compare their specialty, experience, availability, and other useful information.",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Book Your Appointment",
    description:
      "Select a convenient appointment and manage your healthcare activity from your patient dashboard.",
  },
];

const dashboardFeatures = [
  {
    icon: CalendarCheck,
    title: "Appointments",
    description: "View and manage your upcoming appointments.",
  },
  {
    icon: FileText,
    title: "Prescriptions",
    description: "Keep your prescription information organized.",
  },
  {
    icon: CircleCheck,
    title: "Appointment Status",
    description: "Stay informed about your booking status.",
  },
  {
    icon: LayoutDashboard,
    title: "Personal Dashboard",
    description: "Access your healthcare activity from one place.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950">

      {/* ======================================================
          HERO
      ====================================================== */}
      <section className="relative border-b border-slate-100 dark:border-slate-800">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/30" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              Simple. Guided. Patient-focused.
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Healthcare discovery,
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                made simpler.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Describe what you&apos;re experiencing, discover a relevant
              specialist, choose your doctor, and manage your appointment
              through one connected experience.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Find a Doctor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FOUR STEP JOURNEY
      ====================================================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Your care journey
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              From symptoms to appointment
              <span className="text-blue-600"> in four steps</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Doctori keeps the process simple so you can focus on finding
              appropriate care rather than navigating a complicated system.
            </p>
          </div>

          <div className="relative">
            {/* Desktop connector line */}
            <div className="absolute left-[12%] right-[12%] top-11 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block dark:via-blue-900" />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
                  >
                    {/* Top */}
                    <div className="mb-7 flex items-center justify-between">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-sm font-bold tracking-widest text-slate-300 dark:text-slate-700">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>

                    {index < steps.length - 1 && (
                      <div className="absolute -right-3 top-10 z-20 hidden h-6 w-6 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-500 lg:flex dark:border-slate-800 dark:bg-slate-900">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          AI SPECIALIST MATCH
      ====================================================== */}
      <section className="bg-slate-50 py-20 sm:py-24 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* Left content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300">
              <BrainCircuit className="h-4 w-4" />
              Doctori Engine
            </div>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              A smarter starting point for
              <span className="text-blue-600"> finding care.</span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              Instead of guessing which specialist to look for, describe your
              symptoms naturally. Doctori helps guide your search toward a
              relevant medical specialty.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Describe symptoms using everyday language",
                "Receive a relevant specialty recommendation",
                "Continue to doctor discovery and appointment booking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950">
                    <Check className="h-3 w-3" />
                  </div>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Demo card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-2xl dark:from-blue-950/30 dark:to-indigo-950/20" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-7 dark:border-slate-800 dark:bg-slate-950">

              {/* Engine header */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                  <HeartPulse className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Doctori Engine
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-500">
                      Specialist guidance
                    </span>
                  </div>
                </div>
              </div>

              {/* Symptom */}
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  You describe
                </p>

                <p className="mt-2 font-medium leading-6 text-slate-800 dark:text-slate-200">
                  &quot;I have severe chest pain and sweating.&quot;
                </p>
              </div>

              {/* Processing */}
              <div className="my-4 flex items-center justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-950/50">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>
              </div>

              {/* Result */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900">
                    <Stethoscope className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      Suggested specialty
                    </p>

                    <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">
                      Cardiology
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                Continue to Doctor Search
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SAFETY / MEDICAL DISCLAIMER
      ====================================================== */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-6 sm:flex-row sm:items-start dark:border-amber-900/50 dark:bg-amber-950/20">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm dark:bg-slate-900">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Guidance, not a medical diagnosis
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Doctori is designed to help you discover an appropriate type of
                healthcare professional. It does not replace diagnosis,
                treatment, or advice from a qualified medical professional. If
                you believe you are experiencing a medical emergency, seek
                emergency medical care immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PATIENT DASHBOARD
      ====================================================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              After you book
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Everything stays
              <span className="text-blue-600"> in one place.</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Your Doctori dashboard gives you a simple place to keep track of
              your healthcare activity.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
            {dashboardFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 sm:px-12 sm:py-16 dark:border dark:border-slate-800">

          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
              <Search className="h-5 w-5" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find the right doctor?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
              Start by telling Doctori what you&apos;re experiencing and take
              the first step toward finding appropriate care.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Find a Doctor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}