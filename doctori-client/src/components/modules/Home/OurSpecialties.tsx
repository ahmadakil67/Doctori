import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Stethoscope,
  Sparkles,
} from "lucide-react";

import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";

export default async function OurSpecialties() {
  const response = await getSpecialities();

  const specialties: ISpecialty[] =
    response?.success && Array.isArray(response?.data)
      ? response.data
      : [];

  const featuredSpecialties = specialties.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-20 dark:bg-slate-950 sm:py-28">

      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent blur-3xl dark:from-blue-950/30 dark:via-indigo-950/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs backdrop-blur-md dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Specialized Healthcare</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Explore the right area of{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              care.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Browse medical specialties available on Doctori and connect with experienced specialists instantly.
          </p>
        </div>

        {/* SPECIALTIES GRID */}
        {featuredSpecialties.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSpecialties.map((specialty) => (
              <Link
                key={specialty.id}
                href={`/consultation?specialties=${encodeURIComponent(
                  specialty.title
                )}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:shadow-blue-950/30"
              >
                {/* Visual Banner Area with Large Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  {specialty.icon ? (
                    <Image
                      src={specialty.icon}
                      alt={specialty.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950">
                      <Stethoscope className="h-16 w-16 text-blue-600/40 dark:text-blue-400/40" />
                    </div>
                  )}

                  {/* Gradient Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Title Floating inside Image Header */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-bold text-white drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                      {specialty.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Footer */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Find top verified doctors, view schedule availability, and book online consultation easily.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                    <span className="text-sm font-bold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                      Explore Doctors
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="mx-auto flex min-h-[260px] max-w-2xl flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Stethoscope className="h-7 w-7" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No specialties available
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Medical specialties are currently not available.
            </p>
          </div>
        )}

        {/* VIEW ALL BUTTON */}
        {specialties.length > 0 && (
          <div className="mt-14 text-center">
            <Link
              href="/specialties"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-8 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-800 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              <span>View All Specialties</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}