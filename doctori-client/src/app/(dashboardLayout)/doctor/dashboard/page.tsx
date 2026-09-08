import Link from "next/link";

import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock3,
  FileText,
  Star,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

import { getDoctorDashboardMeta } from "@/services/doctor/dashboard.services";

interface StatusItem {
  status: string;
  count: number;
}

interface DoctorMeta {
  appointmentCount: number;
  patientCount: number;
  reviewCount: number;

  totalRevenue?: {
    _sum?: {
      amount?: number | null;
    };
  };

  formattedAppointmentStatusDistribution: StatusItem[];
}

/* =========================================================
   STATUS HELPERS
========================================================= */

const getStatusLabel = (status: string) => {
  switch (status.toUpperCase()) {
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

const getStatusClass = (status: string) => {
  switch (status.toUpperCase()) {
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

/* =========================================================
   PAGE
========================================================= */

const DoctorDashboardPage = async () => {
  const result =
    await getDoctorDashboardMeta();

  const data: DoctorMeta | null =
    result.data;

  if (!result.success || !data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
        {result.message ||
          "Unable to load dashboard data."}
      </div>
    );
  }

  const revenue =
    data.totalRevenue?._sum
      ?.amount || 0;

  const statusDistribution =
    data.formattedAppointmentStatusDistribution ||
    [];

  return (
    <div className="space-y-8">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Doctor Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Consultation Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your appointments,
            patients, schedules, and
            consultation activity.
          </p>
        </div>

        <Link
          href="/doctor/dashboard/my-schedules"
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Clock3 className="h-4 w-4" />
          Manage Schedules
        </Link>
      </div>

      {/* ==================================================
          SUMMARY
      ================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          icon={CalendarDays}
          title="Appointments"
          value={data.appointmentCount}
          description="Total consultations"
        />

        <SummaryCard
          icon={Users}
          title="Patients"
          value={data.patientCount}
          description="Patients consulted"
        />

        <SummaryCard
          icon={Star}
          title="Reviews"
          value={data.reviewCount}
          description="Patient feedback"
        />

        <SummaryCard
          icon={Wallet}
          title="Revenue"
          value={`BDT ${revenue.toLocaleString()}`}
          description="Total earnings"
        />
      </div>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

        {/* ==============================================
            APPOINTMENT STATUS
        ============================================== */}

        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                Appointment Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current distribution of
                your consultations.
              </p>
            </div>

            <Link
              href="/doctor/dashboard/appoinments"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View appointments

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {statusDistribution.length ===
          0 ? (
            <div className="mt-6 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 text-center dark:border-slate-700">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                <CalendarCheck className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                No appointment data
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Appointment activity will
                appear here once patients
                begin booking consultations.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {statusDistribution.map(
                (item) => (
                  <div
                    key={item.status}
                    className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {getStatusLabel(
                            item.status
                          )}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
                          {item.count}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {getStatusLabel(
                          item.status
                        )}
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${
                            data.appointmentCount >
                            0
                              ? Math.min(
                                  100,
                                  (item.count /
                                    data.appointmentCount) *
                                    100
                                )
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* ==============================================
            QUICK ACTIONS
        ============================================== */}

        <aside className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Common tools for your daily
            consultations.
          </p>

          <div className="mt-5 space-y-2">

            <QuickAction
              href="/doctor/dashboard/appoinments"
              icon={CalendarDays}
              title="Appointments"
              description="Review patient bookings"
            />

            <QuickAction
              href="/doctor/dashboard/my-schedules"
              icon={Clock3}
              title="My Schedules"
              description="Manage available times"
            />

            <QuickAction
              href="/doctor/dashboard/prescriptions"
              icon={FileText}
              title="Prescriptions"
              description="Manage patient prescriptions"
            />

            <QuickAction
              href="/my-profile"
              icon={Stethoscope}
              title="Doctor Profile"
              description="Update professional details"
            />
          </div>
        </aside>
      </div>

      {/* ==================================================
          PRACTICE SUMMARY
      ================================================== */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white sm:p-7">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-sm font-medium text-blue-100">
              Practice Summary
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your Doctori activity at
              a glance
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
              You have managed{" "}
              <span className="font-semibold text-white">
                {data.appointmentCount}
              </span>{" "}
              appointments for{" "}
              <span className="font-semibold text-white">
                {data.patientCount}
              </span>{" "}
              patients and received{" "}
              <span className="font-semibold text-white">
                {data.reviewCount}
              </span>{" "}
              reviews.
            </p>
          </div>

          <Link
            href="/doctor/dashboard/appoinments"
            className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            View Appointments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboardPage;

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

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
      className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-blue-50 dark:hover:bg-blue-950/20"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-blue-600 transition group-hover:bg-white dark:bg-slate-950">
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