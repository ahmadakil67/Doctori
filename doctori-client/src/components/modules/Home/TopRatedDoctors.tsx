import Link from "next/link";

import {
  ArrowRight,
  Star,
  Stethoscope,
} from "lucide-react";

import DoctorCard from "@/components/modules/Consultation/DoctorCard";

import { getDoctors } from "@/services/admin/doctorManagement";
import { IDoctor } from "@/types/doctor.interface";

export default async function TopRatedDoctors() {
  /*
   * Fetch a reasonable doctor pool.
   *
   * We sort again below because doctors without ratings may
   * exist in the database and should not be presented as
   * "Top Rated".
   */
  const response = await getDoctors(
    "limit=50&sortBy=averageRating&sortOrder=desc"
  );

  const doctors: IDoctor[] =
    response?.success && Array.isArray(response?.data)
      ? response.data
      : [];

  /*
   * Doctors who actually have a rating.
   */
  const ratedDoctors = doctors
    .filter(
      (doctor) =>
        typeof doctor.averageRating === "number" &&
        doctor.averageRating > 0
    )
    .sort(
      (a, b) =>
        (b.averageRating || 0) -
        (a.averageRating || 0)
    )
    .slice(0, 4);

  /*
   * If there are no reviews yet, showing fake "Top Rated"
   * doctors would be misleading.
   *
   * In that case, show real doctors under a neutral heading.
   */
  const hasRatedDoctors =
    ratedDoctors.length > 0;

  const displayedDoctors =
    hasRatedDoctors
      ? ratedDoctors
      : doctors.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 dark:bg-slate-950">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-950/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">

            {hasRatedDoctors ? (
              <Star className="h-4 w-4 fill-blue-600" />
            ) : (
              <Stethoscope className="h-4 w-4" />
            )}

            {hasRatedDoctors
              ? "Patient Rated"
              : "Doctori Professionals"}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">

            {hasRatedDoctors ? (
              <>
                Meet our top rated
                <span className="text-blue-600">
                  {" "}doctors.
                </span>
              </>
            ) : (
              <>
                Meet doctors available on
                <span className="text-blue-600">
                  {" "}Doctori.
                </span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">

            {hasRatedDoctors
              ? "Explore healthcare professionals who have received strong ratings from patients on Doctori."
              : "Browse healthcare professionals currently available through Doctori and find care that matches your needs."}
          </p>
        </div>

        {/* =========================================
            DOCTORS
        ========================================== */}

        {displayedDoctors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {displayedDoctors.map(
              (doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              )
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="mx-auto flex min-h-[280px] max-w-3xl flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-900/50">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50">
              <Stethoscope className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No doctors available yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Doctor profiles are not available
              at the moment. Please check again
              later.
            </p>
          </div>
        )}

        {/* =========================================
            VIEW ALL
        ========================================== */}

        {displayedDoctors.length > 0 && (
          <div className="mt-12 text-center">

            <Link
              href="/consultation"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              View All Doctors

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}