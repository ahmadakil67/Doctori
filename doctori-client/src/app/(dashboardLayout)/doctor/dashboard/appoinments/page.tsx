import { format } from "date-fns";

import {
  CalendarCheck,
  CalendarDays,
  Clock,
  CreditCard,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";

import { getMyAppointments } from "@/services/patient/myAppointments";
import AppointmentStatusSelect from "@/components/modules/Doctor/AppointmentStatusSelect";

type Appointment = {
  id: string;

  status:
    | "SCHEDULED"
    | "INPROGRESS"
    | "COMPLETED"
    | "CANCEL";

  paymentStatus:
    | "PAID"
    | "UNPAID";

  patient?: {
    id: string;
    name: string;
    email: string;
    contactNumber?: string;
    profilePhoto?: string | null;
  };

  schedule?: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };

  payment?: {
    amount: number;
    status:
      | "PAID"
      | "UNPAID";
  } | null;
};

/* =========================================================
   HELPERS
========================================================= */

const getStatusLabel = (
  status: string
) => {
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

const statusClass = (
  status: string
) => {
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

const paymentClass = (
  status: string
) =>
  status === "PAID"
    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
    : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400";

/* =========================================================
   PAGE
========================================================= */

const DoctorAppointmentsPage =
  async () => {
    const result =
      await getMyAppointments();

    const appointments: Appointment[] =
      result?.success &&
      Array.isArray(result?.data)
        ? result.data
        : [];

    const scheduledCount =
      appointments.filter(
        (appointment) =>
          appointment.status ===
          "SCHEDULED"
      ).length;

    const inProgressCount =
      appointments.filter(
        (appointment) =>
          appointment.status ===
          "INPROGRESS"
      ).length;

    const completedCount =
      appointments.filter(
        (appointment) =>
          appointment.status ===
          "COMPLETED"
      ).length;

    const sortedAppointments = [
      ...appointments,
    ].sort((a, b) => {
      const timeA =
        a.schedule?.startDateTime
          ? new Date(
              a.schedule.startDateTime
            ).getTime()
          : 0;

      const timeB =
        b.schedule?.startDateTime
          ? new Date(
              b.schedule.startDateTime
            ).getTime()
          : 0;

      return timeB - timeA;
    });

    return (
      <div className="space-y-8">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Patient Care
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Appointments
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review patient bookings,
            appointment times, payments,
            and consultation status.
          </p>
        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {!result?.success && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {result?.message ||
              "Unable to load appointments."}
          </div>
        )}

        {/* ==================================================
            SUMMARY
        ================================================== */}

        {result?.success &&
          appointments.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
                icon={Users}
                title="Total"
                value={
                  appointments.length
                }
              />

              <SummaryCard
                icon={CalendarDays}
                title="Scheduled"
                value={scheduledCount}
              />

              <SummaryCard
                icon={Clock}
                title="In Progress"
                value={inProgressCount}
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

        {result?.success &&
          appointments.length === 0 && (
            <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                <CalendarDays className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                No appointments yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Patient bookings will
                appear here when an
                appointment is scheduled
                with you.
              </p>
            </div>
          )}

        {/* ==================================================
            LIST
        ================================================== */}

        {sortedAppointments.length >
          0 && (
          <section>

            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                Patient Appointments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage consultation
                details and update
                appointment progress.
              </p>
            </div>

            <div className="space-y-4">

              {sortedAppointments.map(
                (appointment) => {
                  const startTime =
                    appointment.schedule
                      ?.startDateTime
                      ? new Date(
                          appointment.schedule.startDateTime
                        )
                      : null;

                  const endTime =
                    appointment.schedule
                      ?.endDateTime
                      ? new Date(
                          appointment.schedule.endDateTime
                        )
                      : null;

                  const amount =
                    appointment.payment
                      ?.amount ?? 0;

                  return (
                    <article
                      key={
                        appointment.id
                      }
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                    >

                      <div className="p-5 sm:p-6">

                        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_1fr] xl:items-center">

                          {/* =================================
                              PATIENT
                          ================================= */}

                          <div className="flex min-w-0 items-center gap-4">

                            {appointment
                              .patient
                              ?.profilePhoto ? (
                              <img
                                src={
                                  appointment
                                    .patient
                                    .profilePhoto
                                }
                                alt={
                                  appointment
                                    .patient
                                    .name
                                }
                                className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-slate-100 dark:ring-slate-800"
                              />
                            ) : (
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                                <User className="h-6 w-6" />
                              </div>
                            )}

                            <div className="min-w-0">

                              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                Patient
                              </p>

                              <h3 className="mt-1 truncate text-lg font-bold text-slate-900 dark:text-white">
                                {appointment
                                  .patient
                                  ?.name ||
                                  "Unknown Patient"}
                              </h3>

                              {appointment
                                .patient
                                ?.email && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">

                                  <Mail className="h-3.5 w-3.5 shrink-0" />

                                  <span className="truncate">
                                    {
                                      appointment
                                        .patient
                                        .email
                                    }
                                  </span>
                                </div>
                              )}

                              {appointment
                                .patient
                                ?.contactNumber && (
                                <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">

                                  <Phone className="h-3.5 w-3.5 shrink-0" />

                                  <span>
                                    {
                                      appointment
                                        .patient
                                        .contactNumber
                                    }
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* =================================
                              DATE / TIME
                          ================================= */}

                          <div className="space-y-2">

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

                          {/* =================================
                              PAYMENT / STATUS
                          ================================= */}

                          <div>

                            <div className="flex items-center gap-2 text-sm">

                              <CreditCard className="h-4 w-4 text-slate-400" />

                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                BDT{" "}
                                {amount}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">

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
                                {
                                  appointment.paymentStatus
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* =====================================
                          ACTION BAR
                      ===================================== */}

                      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-950/30">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Appointment Status
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Update the consultation
                              progress when needed.
                            </p>
                          </div>

                          <AppointmentStatusSelect
                            appointmentId={
                              appointment.id
                            }
                            currentStatus={
                              appointment.status
                            }
                          />
                        </div>
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

export default DoctorAppointmentsPage;

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