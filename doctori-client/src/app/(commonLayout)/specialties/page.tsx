import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";

export const metadata: Metadata = {
  title: "Medical Specialties | Doctori",
  description:
    "Explore medical specialties available on Doctori and find doctors for the care you need.",
};

export default async function SpecialtiesPage() {
  const response = await getSpecialities();

  const specialties: ISpecialty[] =
    response?.success && Array.isArray(response?.data)
      ? response.data
      : [];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white dark:bg-slate-950">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative border-b border-slate-100 dark:border-slate-800/80">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/30" />
          <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            {/* Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-sm backdrop-blur-md dark:border-blue-900/80 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Explore Healthcare Specialties</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              Find the right area of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                medical care.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Browse the medical specialties available on Doctori and discover qualified doctors who match the precise type of care you need.
            </p>

            {specialties.length > 0 && (
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm text-slate-600 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
                <HeartPulse className="h-4 w-4 animate-pulse text-blue-600 dark:text-blue-400" />
                <span>
                  <strong className="font-bold text-slate-900 dark:text-white">
                    {specialties.length}
                  </strong>{" "}
                  specialties currently available
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          SPECIALTIES GRID
      ===================================================== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Available Specialties
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                Explore Areas of Care
              </h2>
            </div>

            <p className="max-w-md leading-relaxed text-slate-600 dark:text-slate-400">
              Select a specialty to browse healthcare professionals available in that specific domain.
            </p>
          </div>

          {/* Grid Render */}
          {specialties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((specialty) => (
                <Link
                  key={specialty.id}
                  href={`/consultation?specialties=${encodeURIComponent(specialty.title)}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-900/80"
                >
                  {/* Hover Glow Effect */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-blue-900/30" />

                  <div>
                    {/* FIXED IMAGE CONTAINER - FULL WIDTH BANNER STYLE */}
                    <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950">
                      {specialty.icon ? (
                        <Image
                          src={specialty.icon}
                          alt={`${specialty.title} specialty standard thumbnail`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          unoptimized={specialty.icon.includes("cloudinary.com")}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-blue-50/50 dark:bg-blue-950/30">
                          <Stethoscope className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {specialty.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      Discover specialized doctors available for{" "}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {specialty.title.toLowerCase()}
                      </span>{" "}
                      consultations.
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      View doctors
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 px-6 text-center dark:border-slate-800 dark:bg-slate-900/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-950/50 dark:text-blue-400">
                <Stethoscope className="h-8 w-8" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                No specialties found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Medical specialties are currently unavailable. Please refresh or check back in a few moments.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          GUIDANCE BANNER
      ===================================================== */}
      <section className="bg-slate-50/80 py-16 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 shadow-2xl sm:px-10 lg:px-14">

            {/* Glowing Accent Orbs */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-300 shadow-inner backdrop-blur-md">
                  <Search className="h-5 w-5" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Not sure which specialty you need?
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
                  You don't need a medical background to find the right care. Tell Doctori about your symptoms, and we will guide you to the correct specialist.
                </p>
              </div>

              <Link
                href="/how-it-works"
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35"
              >
                <span>See How It Works</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SAFETY & DISCLAIMER
      ===================================================== */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Medical Disclaimer
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Specialty listings on Doctori are designed to assist with care discovery. They do not constitute formal medical diagnosis or advice. Always consult a certified physician for medical decisions. In case of an emergency, visit a local hospital or contact emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}