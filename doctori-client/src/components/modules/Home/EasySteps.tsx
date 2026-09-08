"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  HeartPulse,
  Search,
  UserRoundSearch,
} from "lucide-react";

const steps = [
  {
    id: "01",
    icon: HeartPulse,
    title: "Explore Your Care",
    description:
      "Browse medical specialties and understand which area of care may be relevant to your needs.",
  },
  {
    id: "02",
    icon: Search,
    title: "Find Doctors",
    description:
      "Search available doctors by specialty and explore healthcare professionals on Doctori.",
  },
  {
    id: "03",
    icon: UserRoundSearch,
    title: "Review Doctor Profiles",
    description:
      "Compare experience, qualifications, consultation fees, specialties, and available schedules.",
  },
  {
    id: "04",
    icon: CalendarCheck,
    title: "Book Your Appointment",
    description:
      "Choose an available time slot and continue securely through the appointment booking process.",
  },
];

export const EasySteps = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 dark:bg-slate-950">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-80 w-[700px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-950/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ======================================
            HEADER
        ====================================== */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            How Doctori Works
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
            From finding care to
            <span className="text-blue-600"> booking a doctor.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
            Doctori keeps the healthcare discovery process clear and
            straightforward, helping you move from exploring care to booking an
            appointment.
          </p>
        </div>

        {/* ======================================
            STEPS
        ====================================== */}
        <div className="relative">
          {/* Desktop connector */}
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block dark:via-blue-900" />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="relative"
                >
                  <article className="group relative h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">
                    {/* Icon + number */}
                    <div className="mb-7 flex items-center justify-between">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-sm font-bold tracking-[0.18em] text-slate-300 dark:text-slate-700">
                        {step.id}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </article>

                  {/* Desktop arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-3 top-9 z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-500 shadow-sm lg:flex dark:border-slate-800 dark:bg-slate-900">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================
            BOTTOM ACTIONS
        ====================================== */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/consultation"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Find a Doctor
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/how-it-works"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            Learn How It Works
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};