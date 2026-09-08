import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck,
  Check,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Doctori",
  description:
    "Learn about Doctori and how the platform is designed to make healthcare discovery, doctor search, and appointment management simpler.",
};

const challenges = [
  {
    title: "Where should I start?",
    description:
      "Healthcare can feel confusing when you know something is wrong but are unsure what type of specialist to look for.",
    icon: Search,
  },
  {
    title: "Which doctor is relevant?",
    description:
      "Finding doctors across different specialties should not require navigating an unnecessarily complicated process.",
    icon: UserRoundSearch,
  },
  {
    title: "How do I manage my care?",
    description:
      "Appointments and healthcare information are easier to manage when they are connected in one patient experience.",
    icon: CalendarCheck,
  },
];

const platformFeatures = [
  {
    icon: HeartPulse,
    title: "Explore Specialties",
    description:
      "Understand available areas of care and explore the medical specialties provided through Doctori.",
  },
  {
    icon: UserRoundSearch,
    title: "Discover Doctors",
    description:
      "Search and explore healthcare professionals based on specialty and other relevant information.",
  },
  {
    icon: CalendarCheck,
    title: "Book Appointments",
    description:
      "Move from doctor discovery toward appointment booking through one connected platform.",
  },
  {
    icon: BrainCircuit,
    title: "Smarter Guidance",
    description:
      "Doctori is designed to make the path from symptoms and care needs toward an appropriate specialist easier to understand.",
  },
];

const principles = [
  "Keep healthcare discovery understandable",
  "Reduce unnecessary steps for patients",
  "Connect discovery, doctors, and appointments",
  "Use AI as assistance rather than a replacement for clinicians",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white dark:bg-slate-950">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative border-b border-slate-100 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/30" />
          <div className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              About Doctori
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Healthcare discovery with
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                less guesswork.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Doctori is being built to make the journey from understanding
              your care needs to finding doctors and managing appointments
              simpler, clearer, and more connected.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/consultation"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Find a Doctor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                How Doctori Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY DOCTORI
      ===================================================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Why Doctori
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Finding healthcare should not feel
              <span className="text-blue-600"> unnecessarily complicated.</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
              A patient may know what they are experiencing without knowing
              which specialist to search for, where to begin, or how to move
              from discovery to an appointment.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {challenges.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR APPROACH
      ===================================================== */}
      <section className="bg-slate-50 py-20 sm:py-24 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* LEFT */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300">
              <Stethoscope className="h-4 w-4" />
              Our approach
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              One connected path from
              <span className="text-blue-600"> discovery to care.</span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              Instead of treating specialty discovery, doctor search, and
              appointments as completely separate experiences, Doctori brings
              them together into a clearer patient journey.
            </p>

            <div className="mt-8 space-y-4">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950">
                    <Check className="h-3 w-3" />
                  </div>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-blue-100 to-indigo-100 opacity-70 blur-3xl dark:from-blue-950/30 dark:to-indigo-950/20" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950">

              <div className="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
                  <HeartPulse className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    The Doctori Journey
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    A simpler path to healthcare discovery
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-3">

                <JourneyItem
                  number="01"
                  title="Understand your care need"
                  description="Start from symptoms or the type of care you are looking for."
                />

                <JourneyConnector />

                <JourneyItem
                  number="02"
                  title="Explore relevant specialties"
                  description="Discover available medical areas and narrow your search."
                />

                <JourneyConnector />

                <JourneyItem
                  number="03"
                  title="Find a doctor"
                  description="Explore healthcare professionals relevant to your needs."
                />

                <JourneyConnector />

                <JourneyItem
                  number="04"
                  title="Continue with your care"
                  description="Move toward appointment booking and patient management."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT DOCTORI BRINGS TOGETHER
      ===================================================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              The platform
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Built around the
              <span className="text-blue-600"> patient journey.</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              Doctori brings the important stages of healthcare discovery
              together rather than making patients navigate disconnected tools.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          RESPONSIBLE AI
      ===================================================== */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950">
          <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[auto_1fr] lg:px-14 lg:py-14">

            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-blue-300">
                <ShieldCheck className="h-7 w-7" />
              </div>
            </div>

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Responsible AI
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Technology should support healthcare decisions,
                not pretend to replace clinicians.
              </h2>

              <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                Doctori&apos;s intelligent guidance is intended to assist with
                healthcare discovery and specialist selection. It should not be
                treated as a medical diagnosis, treatment recommendation, or a
                substitute for evaluation by a qualified healthcare
                professional.
              </p>

              <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                <p className="text-sm leading-6 text-amber-100">
                  If you believe you are experiencing a medical emergency,
                  seek emergency medical care immediately rather than relying
                  on Doctori.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="border-t border-slate-100 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">

          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Stethoscope className="h-6 w-6" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Explore Doctori for yourself.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
            Browse specialties, discover doctors, or learn how the Doctori
            patient journey works.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/consultation"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Find a Doctor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/specialties"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              Explore Specialties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   Small page-only components
========================================================= */

function JourneyItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function JourneyConnector() {
  return (
    <div className="ml-5 h-3 w-px bg-blue-200 dark:bg-blue-900" />
  );
}