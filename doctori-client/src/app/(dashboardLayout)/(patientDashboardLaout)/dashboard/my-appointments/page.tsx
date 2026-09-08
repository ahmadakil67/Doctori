import Link from "next/link";
import { format } from "date-fns";

import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Search,
  Stethoscope,
} from "lucide-react";

import { getMyAppointments } from "@/services/patient/myAppointments";

import ReviewButton from "@/components/modules/Patient/ReviewButton";

type Appointment = {
  id: string;

  status:
    | "SCHEDULED"
    | "INPROGRESS"
    | "COMPLETED"
    | "CANCEL";

  paymentStatus: "PAID" | "UNPAID";

  videoCallingId: string;
  createdAt: string;

  doctor?: {
    id: string;
    name: string;
    designation: string;
    qualification: string;
    appointmentFee: number;
    profilePhoto?: string | null;
    currentWorkingPlace: string;
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
    transactionId: string;
  } | null;

  prescription?: {
    id: string;
  } | null;

  review?: {
    id: string;
    rating: number;
    comment?: string | null;
  } | null;
};

/* =========================================================
   STATUS HELPERS
========================================================= */

const getStatusLabel = (status: string) => {
  switch (status) {
    case "SCHEDULED":
      return "Scheduled";

    case "INPROGRESS":
      return "In Progress";

    case "COMPLETED":
      return "Completed";

    case "CANCEL":
      return "Cancelled";

    default:
      return status;
  }
};

const statusClass = (status: string) => {
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

const paymentClass = (status: string) => {
  return status === "PAID"
    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
    : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400";
};

/* =========================================================
   PAGE
========================================================= */

const MyAppointmentsPage = async () => {
  const result = await getMyAppointments();

  const appointments: Appointment[] =
    result?.success && Array.isArray(result?.data)
      ? result.data
      : [];

  /*
   * Upcoming:
   * SCHEDULED / INPROGRESS
   *
   * History:
   * COMPLETED / CANCEL
   */
  const upcomingAppointments = appointments
    .filter(
      (appointment) =>
        appointment.status === "SCHEDULED" ||
        appointment.status === "INPROGRESS"
    )
    .sort((a, b) => {
      const dateA = a.schedule?.startDateTime
        ? new Date(a.schedule.startDateTime).getTime()
        : Number.MAX_SAFE_INTEGER;

      const dateB = b.schedule?.startDateTime
        ? new Date(b.schedule.startDateTime).getTime()
        : Number.MAX_SAFE_INTEGER;

      return dateA - dateB;
    });

  const appointmentHistory = appointments
    .filter(
      (appointment) =>
        appointment.status === "COMPLETED" ||
        appointment.status === "CANCEL"
    )
    .sort((a, b) => {
      const dateA = a.schedule?.startDateTime
        ? new Date(a.schedule.startDateTime).getTime()
        : 0;

      const dateB = b.schedule?.startDateTime
        ? new Date(b.schedule.startDateTime).getTime()
        : 0;

      return dateB - dateA;
    });

  const completedCount = appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED"
  ).length;

  return (
    <div className="space-y-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Patient Care
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            My Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            View your upcoming consultations and previous
            appointment history.
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
            "Unable to load your appointments."}
        </div>
      )}

      {/* ==================================================
          SUMMARY
      ================================================== */}

      {result?.success && appointments.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={CalendarDays}
            title="Total Appointments"
            value={appointments.length}
          />

          <SummaryCard
            icon={Clock}
            title="Upcoming"
            value={upcomingAppointments.length}
          />

          <SummaryCard
            icon={CalendarCheck}
            title="Completed"
            value={completedCount}
          />
        </div>
      )}

      {/* ==================================================
          EMPTY
      ================================================== */}

      {result?.success && appointments.length === 0 && (
        <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
            <CalendarDays className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            No appointments yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Once you book a consultation with a doctor,
            your appointment details will appear here.
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
          UPCOMING
      ================================================== */}

      {upcomingAppointments.length > 0 && (
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your scheduled and ongoing consultations.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              {upcomingAppointments.length} upcoming
            </span>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.map(
              (appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              )
            )}
          </div>
        </section>
      )}

      {/* ==================================================
          HISTORY
      ================================================== */}

      {appointmentHistory.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Appointment History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Completed and cancelled consultations.
            </p>
          </div>

          <div className="space-y-4">
            {appointmentHistory.map(
              (appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyAppointmentsPage;

/* =========================================================
   APPOINTMENT CARD
========================================================= */

function AppointmentCard({
  appointment,
}: {
  appointment: Appointment;
}) {
  const startTime =
    appointment.schedule?.startDateTime
      ? new Date(
          appointment.schedule.startDateTime
        )
      : null;

  const endTime =
    appointment.schedule?.endDateTime
      ? new Date(
          appointment.schedule.endDateTime
        )
      : null;

  const amount =
    appointment.payment?.amount ??
    appointment.doctor?.appointmentFee ??
    0;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">

      <div className="p-5 sm:p-6">

        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          {/* ================================
              DOCTOR
          ================================ */}

          <div className="flex min-w-0 items-center gap-4 xl:w-[34%]">

            {appointment.doctor?.profilePhoto ? (
              <img
                src={
                  appointment.doctor.profilePhoto
                }
                alt={
                  appointment.doctor.name
                }
                className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100 dark:ring-slate-800"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                <Stethoscope className="h-6 w-6" />
              </div>
            )}

            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                Dr.{" "}
                {appointment.doctor?.name ||
                  "Unknown Doctor"}
              </h3>

              <p className="mt-1 truncate text-sm text-slate-500">
                {appointment.doctor
                  ?.designation || "Doctor"}
              </p>

              {appointment.doctor
                ?.currentWorkingPlace && (
                <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-400">

                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                  <span className="line-clamp-1">
                    {
                      appointment.doctor
                        .currentWorkingPlace
                    }
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ================================
              DATE & TIME
          ================================ */}

          <div className="space-y-2 xl:w-[28%]">

            <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">

              <CalendarDays className="h-4 w-4 shrink-0 text-blue-600" />

              <span className="font-medium">
                {startTime
                  ? format(
                      startTime,
                      "EEE, MMM d, yyyy"
                    )
                  : "Date unavailable"}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-slate-500">

              <Clock className="h-4 w-4 shrink-0" />

              <span>
                {startTime
                  ? format(
                      startTime,
                      "h:mm a"
                    )
                  : "N/A"}

                {endTime &&
                  ` – ${format(
                    endTime,
                    "h:mm a"
                  )}`}
              </span>
            </div>
          </div>

          {/* ================================
              PAYMENT + STATUS
          ================================ */}

          <div className="xl:w-[28%]">

            <div className="flex items-center gap-2 text-sm">

              <CreditCard className="h-4 w-4 text-slate-400" />

              <span className="font-semibold text-slate-800 dark:text-slate-200">
                BDT {amount}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                  appointment.status
                )}`}
              >
                {getStatusLabel(
                  appointment.status
                )}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentClass(
                  appointment.paymentStatus
                )}`}
              >
                {appointment.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          COMPLETED APPOINTMENT ACTIONS
      ================================================== */}

      {appointment.status ===
        "COMPLETED" && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-950/30">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Review */}
            <div>
              {appointment.review ? (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Your rating
                    </span>

                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                      ★{" "}
                      {
                        appointment.review
                          .rating
                      }
                      /5
                    </span>
                  </div>

                  {appointment.review
                    .comment && (
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      {
                        appointment.review
                          .comment
                      }
                    </p>
                  )}
                </div>
              ) : (
                <ReviewButton
                  appointmentId={
                    appointment.id
                  }
                  doctorName={
                    appointment.doctor
                      ?.name || "Doctor"
                  }
                />
              )}
            </div>

            {/* Prescription */}
            {appointment.prescription && (
              <Link
                href="/dashboard/my-prescriptions"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <FileText className="h-4 w-4" />
                View Prescription
              </Link>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   SUMMARY CARD
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