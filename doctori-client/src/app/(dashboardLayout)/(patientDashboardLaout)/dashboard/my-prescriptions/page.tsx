import Link from "next/link";
import { format } from "date-fns";

import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  FileText,
  MapPin,
  Search,
  Stethoscope,
} from "lucide-react";

import { getMyPrescriptions } from "@/services/patient/prescription.services";

interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;

  instructions: string;
  followUpDate: string | null;

  createdAt: string;
  updatedAt: string;

  doctor?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    designation: string;
    qualification: string;
    currentWorkingPlace: string;
    appointmentFee: number;
  };

  appointment?: {
    id: string;

    status:
      | "SCHEDULED"
      | "INPROGRESS"
      | "COMPLETED"
      | "CANCEL";

    paymentStatus: "PAID" | "UNPAID";

    schedule?: {
      id: string;
      startDateTime: string;
      endDateTime: string;
    };
  };
}

const MyPrescriptionsPage = async () => {
  const result = await getMyPrescriptions();

  const prescriptions: Prescription[] =
    result?.success && Array.isArray(result?.data)
      ? result.data
      : [];

  /*
   * Show most recently created prescriptions first
   */
  const sortedPrescriptions = [...prescriptions].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const now = new Date();

  const upcomingFollowUps = prescriptions.filter(
    (prescription) =>
      prescription.followUpDate &&
      new Date(prescription.followUpDate).getTime() >=
        now.getTime()
  ).length;

  return (
    <div className="space-y-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Medical Records
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            My Prescriptions
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review prescriptions and follow-up instructions
            provided by your doctors.
          </p>
        </div>

        <Link
          href="/consultation"
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
          Find a Doctor
        </Link>
      </div>

      {/* ==================================================
          ERROR
      ================================================== */}

      {!result?.success && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {result?.message ||
            "Unable to load your prescriptions."}
        </div>
      )}

      {/* ==================================================
          SUMMARY
      ================================================== */}

      {result?.success && prescriptions.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">

          <SummaryCard
            icon={FileText}
            title="Total Prescriptions"
            value={prescriptions.length}
          />

          <SummaryCard
            icon={CalendarCheck}
            title="Upcoming Follow-ups"
            value={upcomingFollowUps}
          />
        </div>
      )}

      {/* ==================================================
          EMPTY STATE
      ================================================== */}

      {result?.success &&
        prescriptions.length === 0 && (
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <FileText className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No prescriptions yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Prescriptions provided after your doctor
              consultations will appear here.
            </p>

            <Link
              href="/consultation"
              className="group mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Find a Doctor

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

      {/* ==================================================
          PRESCRIPTION LIST
      ================================================== */}

      {sortedPrescriptions.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Prescription History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your most recent prescriptions appear first.
            </p>
          </div>

          <div className="space-y-5">

            {sortedPrescriptions.map(
              (prescription) => {
                const startDate =
                  prescription.appointment?.schedule
                    ?.startDateTime
                    ? new Date(
                        prescription.appointment.schedule
                          .startDateTime
                      )
                    : null;

                const endDate =
                  prescription.appointment?.schedule
                    ?.endDateTime
                    ? new Date(
                        prescription.appointment.schedule
                          .endDateTime
                      )
                    : null;

                const followUpDate =
                  prescription.followUpDate
                    ? new Date(
                        prescription.followUpDate
                      )
                    : null;

                const createdAt = new Date(
                  prescription.createdAt
                );

                const isUpcomingFollowUp =
                  followUpDate &&
                  followUpDate.getTime() >=
                    now.getTime();

                return (
                  <article
                    key={prescription.id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                  >

                    {/* ==================================
                        DOCTOR + APPOINTMENT
                    ================================== */}

                    <div className="p-5 sm:p-6">

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Doctor */}
                        <div className="flex min-w-0 gap-4">

                          {prescription.doctor
                            ?.profilePhoto ? (
                            <img
                              src={
                                prescription.doctor
                                  .profilePhoto
                              }
                              alt={
                                prescription.doctor
                                  .name
                              }
                              className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100 dark:ring-slate-800"
                            />
                          ) : (
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                              <Stethoscope className="h-6 w-6" />
                            </div>
                          )}

                          <div className="min-w-0">

                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                              Prescribed by
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                              Dr.{" "}
                              {prescription.doctor
                                ?.name ||
                                "Unknown Doctor"}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {prescription.doctor
                                ?.designation ||
                                "Doctor"}
                            </p>

                            {prescription.doctor
                              ?.currentWorkingPlace && (
                              <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-400">

                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                                <span>
                                  {
                                    prescription
                                      .doctor
                                      .currentWorkingPlace
                                  }
                                </span>
                              </div>
                            )}

                            {prescription.doctor
                              ?.qualification && (
                              <p className="mt-2 text-xs text-slate-400">
                                {
                                  prescription
                                    .doctor
                                    .qualification
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Appointment */}
                        <div className="space-y-2 lg:min-w-[250px]">

                          {startDate && (
                            <>
                              <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">

                                <CalendarDays className="h-4 w-4 shrink-0 text-blue-600" />

                                <span className="font-medium">
                                  {format(
                                    startDate,
                                    "EEE, MMM d, yyyy"
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center gap-2.5 text-sm text-slate-500">

                                <Clock className="h-4 w-4 shrink-0" />

                                <span>
                                  {format(
                                    startDate,
                                    "h:mm a"
                                  )}

                                  {endDate &&
                                    ` – ${format(
                                      endDate,
                                      "h:mm a"
                                    )}`}
                                </span>
                              </div>
                            </>
                          )}

                          <p className="pt-1 text-xs text-slate-400">
                            Prescription created{" "}
                            {format(
                              createdAt,
                              "MMM d, yyyy"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ==================================
                        INSTRUCTIONS
                    ================================== */}

                    <div className="border-t border-slate-100 px-5 py-5 sm:px-6 dark:border-slate-800">

                      <div className="mb-3 flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                          <FileText className="h-4 w-4" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            Prescription Instructions
                          </h4>

                          <p className="text-xs text-slate-500">
                            Instructions provided by your doctor
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50">

                        <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                          {prescription.instructions ||
                            "No additional instructions provided."}
                        </p>
                      </div>
                    </div>

                    {/* ==================================
                        FOLLOW-UP
                    ================================== */}

                    {followUpDate && (
                      <div
                        className={`border-t px-5 py-4 sm:px-6 dark:border-slate-800 ${
                          isUpcomingFollowUp
                            ? "border-blue-100 bg-blue-50/60 dark:bg-blue-950/20"
                            : "border-slate-100 bg-slate-50/60 dark:bg-slate-950/30"
                        }`}
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                          <div className="flex items-center gap-3">

                            <CalendarCheck
                              className={`h-5 w-5 ${
                                isUpcomingFollowUp
                                  ? "text-blue-600"
                                  : "text-slate-400"
                              }`}
                            />

                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                Follow-up
                              </p>

                              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {format(
                                  followUpDate,
                                  "EEEE, MMMM d, yyyy"
                                )}
                              </p>
                            </div>
                          </div>

                          {isUpcomingFollowUp && (
                            <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================
                        SMALL FOOTER
                    ================================== */}

                    <div className="border-t border-slate-100 px-5 py-3 sm:px-6 dark:border-slate-800">

                      <p className="truncate text-xs text-slate-400">
                        Prescription ID:{" "}
                        {prescription.id}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyPrescriptionsPage;

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof FileText;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}