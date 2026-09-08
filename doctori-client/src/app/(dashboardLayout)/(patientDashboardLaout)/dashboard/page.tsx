import Link from "next/link";
import { format } from "date-fns";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  CreditCard,
  FileText,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";

import { getPatientDashboardMeta } from "@/services/patient/dashboard.services";
import { getMyAppointments } from "@/services/patient/myAppointments";
import { getMyPrescriptions } from "@/services/patient/prescription.services";

interface StatusItem {
  status: string;
  count: number;
}

interface PatientMeta {
  appointmentCount: number;
  prescriptionCount: number;
  reviewCount: number;
  formattedAppointmentStatusDistribution: StatusItem[];
}

interface Appointment {
  id: string;

  status:
    | "SCHEDULED"
    | "INPROGRESS"
    | "COMPLETED"
    | "CANCEL";

  paymentStatus: "PAID" | "UNPAID";

  doctor?: {
    id: string;
    name: string;
    designation: string;
    appointmentFee: number;
    currentWorkingPlace?: string;
    profilePhoto?: string | null;
  };

  schedule?: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };

  payment?: {
    id: string;
    amount: number;
    status: "PAID" | "UNPAID";
  } | null;
}

interface Prescription {
  id: string;
  instructions?: string | null;
  followUpDate?: string | null;

  doctor?: {
    id: string;
    name: string;
    designation?: string;
  };
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "INPROGRESS":
      return "In Progress";

    case "COMPLETED":
      return "Completed";

    case "CANCEL":
      return "Cancelled";

    case "SCHEDULED":
      return "Scheduled";

    default:
      return status;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";

    case "INPROGRESS":
      return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400";

    case "CANCEL":
      return "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400";

    default:
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
  }
};

const PatientDashboardPage = async () => {
  /*
   * Load dashboard data in parallel
   * instead of waiting for each API request one-by-one.
   */
  const [
    metaResult,
    appointmentsResult,
    prescriptionsResult,
  ] = await Promise.all([
    getPatientDashboardMeta(),
    getMyAppointments(),
    getMyPrescriptions(),
  ]);

  const data: PatientMeta | null =
    metaResult?.data || null;

  if (!metaResult?.success || !data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
        {metaResult?.message ||
          "Unable to load your dashboard."}
      </div>
    );
  }

  const appointments: Appointment[] =
    appointmentsResult?.success &&
    Array.isArray(appointmentsResult?.data)
      ? appointmentsResult.data
      : [];

  const prescriptions: Prescription[] =
    prescriptionsResult?.success &&
    Array.isArray(prescriptionsResult?.data)
      ? prescriptionsResult.data
      : [];

  const now = new Date();

  /*
   * Find appointments that are still relevant
   * and scheduled for now/future.
   */
  const upcomingAppointments = appointments
    .filter((appointment) => {
      if (!appointment.schedule?.startDateTime) {
        return false;
      }

      if (
        appointment.status === "CANCEL" ||
        appointment.status === "COMPLETED"
      ) {
        return false;
      }

      return (
        new Date(
          appointment.schedule.startDateTime
        ).getTime() >= now.getTime()
      );
    })
    .sort((a, b) => {
      const dateA = new Date(
        a.schedule!.startDateTime
      ).getTime();

      const dateB = new Date(
        b.schedule!.startDateTime
      ).getTime();

      return dateA - dateB;
    });

  const nextAppointment =
    upcomingAppointments[0] || null;

  const latestPrescription =
    prescriptions[0] || null;

  return (
    <div className="space-y-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Patient Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Your healthcare overview
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Keep track of your appointments,
            prescriptions, and healthcare activity.
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
          NEXT APPOINTMENT + QUICK ACTIONS
      ================================================== */}

      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">

        {/* NEXT APPOINTMENT */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-600/10 sm:p-7">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-100">
                  Next Appointment
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {nextAppointment
                    ? "Your upcoming consultation"
                    : "No upcoming appointment"}
                </h2>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>

            {nextAppointment ? (
              <>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">

                  {/* Doctor */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-200">
                      Doctor
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      Dr.{" "}
                      {nextAppointment.doctor?.name ||
                        "Doctor"}
                    </p>

                    <p className="mt-1 text-sm text-blue-100">
                      {nextAppointment.doctor
                        ?.designation || "Healthcare Professional"}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-200">
                      Date & Time
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium">
                      <CalendarDays className="h-4 w-4" />

                      {format(
                        new Date(
                          nextAppointment.schedule!
                            .startDateTime
                        ),
                        "EEEE, MMMM d"
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-100">
                      <Clock3 className="h-4 w-4" />

                      {format(
                        new Date(
                          nextAppointment.schedule!
                            .startDateTime
                        ),
                        "h:mm a"
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                      {getStatusLabel(
                        nextAppointment.status
                      )}
                    </span>

                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                      {nextAppointment.paymentStatus}
                    </span>
                  </div>

                  <Link
                    href="/dashboard/my-appointments"
                    className="group inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    View Appointments

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="mt-8">
                <p className="max-w-lg text-sm leading-6 text-blue-100">
                  You do not have an upcoming
                  appointment right now. Find a
                  doctor when you are ready to
                  book your next consultation.
                </p>

                <Link
                  href="/consultation"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Find a Doctor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Common things you may need.
          </p>

          <div className="mt-5 space-y-2">

            <QuickAction
              href="/consultation"
              icon={Search}
              title="Find a Doctor"
              description="Search available doctors"
            />

            <QuickAction
              href="/dashboard/my-appointments"
              icon={CalendarDays}
              title="My Appointments"
              description="View your bookings"
            />

            <QuickAction
              href="/dashboard/my-prescriptions"
              icon={FileText}
              title="My Prescriptions"
              description="View your prescriptions"
            />
          </div>
        </section>
      </div>

      {/* ==================================================
          ACTIVITY SUMMARY
      ================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Your Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A quick summary of your Doctori activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={CalendarDays}
            title="Appointments"
            value={data.appointmentCount}
          />

          <SummaryCard
            icon={FileText}
            title="Prescriptions"
            value={data.prescriptionCount}
          />

          <SummaryCard
            icon={Star}
            title="Reviews Given"
            value={data.reviewCount}
          />
        </div>
      </section>

      {/* ==================================================
          UPCOMING APPOINTMENTS + PRESCRIPTION
      ================================================== */}

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

        {/* UPCOMING */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your next scheduled consultations.
              </p>
            </div>

            <Link
              href="/dashboard/my-appointments"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">

              {upcomingAppointments
                .slice(0, 3)
                .map((appointment) => {
                  const startTime = new Date(
                    appointment.schedule!.startDateTime
                  );

                  return (
                    <div
                      key={appointment.id}
                      className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                          <Stethoscope className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            Dr.{" "}
                            {appointment.doctor?.name ||
                              "Doctor"}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {appointment.doctor
                              ?.designation || "Doctor"}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {format(
                            startTime,
                            "MMM d, yyyy"
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {format(
                            startTime,
                            "h:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-950/50">

              <CalendarDays className="mx-auto h-7 w-7 text-slate-400" />

              <p className="mt-3 font-medium text-slate-700 dark:text-slate-300">
                No upcoming appointments
              </p>

              <p className="mt-1 text-sm text-slate-500">
                New bookings will appear here.
              </p>
            </div>
          )}
        </section>

        {/* RECENT PRESCRIPTION */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Recent Prescription
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest prescription.
              </p>
            </div>

            <FileText className="h-5 w-5 text-blue-600" />
          </div>

          {latestPrescription ? (
            <div className="mt-5">

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Prescribed by
                </p>

                <p className="mt-2 font-semibold text-slate-900 dark:text-white">
                  Dr.{" "}
                  {latestPrescription.doctor?.name ||
                    "Doctor"}
                </p>

                {latestPrescription.doctor
                  ?.designation && (
                  <p className="mt-1 text-sm text-slate-500">
                    {
                      latestPrescription.doctor
                        .designation
                    }
                  </p>
                )}
              </div>

              {latestPrescription.instructions && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Instructions
                  </p>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {latestPrescription.instructions}
                  </p>
                </div>
              )}

              {latestPrescription.followUpDate && (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">

                  <CalendarDays className="h-4 w-4 text-blue-600" />

                  Follow up:{" "}
                  {format(
                    new Date(
                      latestPrescription.followUpDate
                    ),
                    "MMM d, yyyy"
                  )}
                </div>
              )}

              <Link
                href="/dashboard/my-prescriptions"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View Prescriptions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-slate-50 p-8 text-center dark:bg-slate-950/50">

              <FileText className="mx-auto h-7 w-7 text-slate-400" />

              <p className="mt-3 font-medium text-slate-700 dark:text-slate-300">
                No prescriptions yet
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Prescriptions from completed
                consultations will appear here.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* ==================================================
          APPOINTMENT STATUS
      ================================================== */}

      {data.formattedAppointmentStatusDistribution
        .length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Appointment Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current status of your appointments.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {data.formattedAppointmentStatusDistribution.map(
              (item) => (
                <div
                  key={item.status}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <div className="flex items-center justify-between">

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {getStatusLabel(
                        item.status
                      )}
                    </span>

                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      {item.count}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default PatientDashboardPage;

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SummaryCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
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

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-950/60"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
    </Link>
  );
}