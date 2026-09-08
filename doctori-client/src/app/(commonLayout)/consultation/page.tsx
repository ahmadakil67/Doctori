// import AIDoctorSuggestion from "@/components/modules/Consultation/AIDoctorSuggestion";
// import DoctorGrid from "@/components/modules/Consultation/DoctorGrid";
// import DoctorSearchFilters from "@/components/modules/Consultation/DoctorSearchFilter";
// import TablePagination from "@/components/shared/TablePagination";
// import { TableSkeleton } from "@/components/shared/TableSkeleton";
// import { queryStringFormatter } from "@/lib/formatters";
// import { getDoctors } from "@/services/admin/doctorManagement";
// import { getSpecialities } from "@/services/admin/specialitiesManagement";
// import { Suspense } from "react";

// // ISR: Revalidate every 10 minutes for doctor listings
// export const revalidate = 600;

// const ConsultationPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }) => {
//   const searchParamsObj = await searchParams;
//   const queryString = queryStringFormatter(searchParamsObj);

//   // Fetch doctors and specialties in parallel
//   const [doctorsResponse, specialtiesResponse] = await Promise.all([
//     getDoctors(queryString),
//     getSpecialities(),
//   ]);

//   const doctors = doctorsResponse?.data || [];
//   const specialties = specialtiesResponse?.data || [];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="space-y-6">
//         {/* Header */}
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
//           <p className="text-muted-foreground mt-2">
//             Search and book appointments with our qualified healthcare
//             professionals
//           </p>
//         </div>

//         {/* AI Doctor Suggestion */}
//         <AIDoctorSuggestion />

//         {/* Filters */}
//         <DoctorSearchFilters specialties={specialties} />

//         {/* Doctor Grid */}
//         <Suspense fallback={<TableSkeleton columns={3} />}>
//           <DoctorGrid doctors={doctors} />
//         </Suspense>

//         {/* Pagination */}
//         <TablePagination
//           currentPage={doctorsResponse?.meta?.page || 1}
//           totalPages={doctorsResponse?.meta?.totalPage || 1}
//         />
//       </div>
//     </div>
//   );
// };

// export default ConsultationPage;

import type { Metadata } from "next";
import {
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { Suspense } from "react";

import DoctorGrid from "@/components/modules/Consultation/DoctorGrid";
import DoctorSearchFilters from "@/components/modules/Consultation/DoctorSearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";

export const metadata: Metadata = {
  title: "Find Doctors | Doctori",
  description:
    "Search doctors by name, specialty, and other available filters on Doctori.",
};

export const revalidate = 600;

const ConsultationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const [doctorsResponse, specialtiesResponse] = await Promise.all([
    getDoctors(queryString),
    getSpecialities(),
  ]);

  const doctors = doctorsResponse?.data || [];
  const specialties = specialtiesResponse?.data || [];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">

      {/* =====================================================
          PAGE HERO
      ===================================================== */}
      <section className="relative overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-32 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/30" />

          <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <Stethoscope className="h-4 w-4" />
              Doctor discovery
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Find the doctor that
              <span className="block text-blue-600">
                fits your care needs.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
              Search Doctori&apos;s available healthcare professionals by
              name, specialty, or gender and explore their professional
              information before choosing your doctor.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCTOR DISCOVERY
      ===================================================== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Search / filters area */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                <Search className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Search and filter
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Narrow down doctors based on your preferences.
                </p>
              </div>
            </div>

            <DoctorSearchFilters specialties={specialties} />
          </div>

          {/* Results heading */}
          <div className="mt-10 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Available doctors
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                Healthcare professionals
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Review doctor information and choose the care provider that
                suits your needs.
              </p>
            </div>

            {doctors.length > 0 && (
              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                <Users className="h-4 w-4 text-blue-600" />

                <span>
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    {doctors.length}
                  </strong>{" "}
                  shown on this page
                </span>
              </div>
            )}
          </div>

          {/* Doctor cards */}
          <div className="mt-8">
            <Suspense fallback={<TableSkeleton columns={3} />}>
              <DoctorGrid doctors={doctors} />
            </Suspense>
          </div>

          {/* Pagination */}
          {doctors.length > 0 && (
            <div className="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
              <TablePagination
                currentPage={doctorsResponse?.meta?.page || 1}
                totalPages={doctorsResponse?.meta?.totalPage || 1}
              />
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          TRUST NOTE
      ===================================================== */}
      <section className="border-t border-slate-100 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Choose care based on your healthcare needs
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Doctor profiles and specialty information can help you explore
                available care options. Medical decisions should ultimately be
                made with an appropriately qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConsultationPage;