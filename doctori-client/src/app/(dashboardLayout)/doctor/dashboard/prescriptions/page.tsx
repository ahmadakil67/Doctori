import CreatePrescriptionForm from "@/components/modules/Doctor/CreatePrescriptionForm";

import {
  CheckCircle2,
  FileText,
  Users,
} from "lucide-react";

import { getMyAppointments } from "@/services/patient/myAppointments";

interface Appointment {
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
  };

  schedule?: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };

  prescription?: {
    id: string;
  } | null;
}

const DoctorPrescriptionPage =
  async () => {
    const result =
      await getMyAppointments();

    const appointments: Appointment[] =
      result?.success &&
      Array.isArray(result?.data)
        ? result.data
        : [];

    /*
     * Prescription can only be created
     * after a completed + paid consultation
     * and when no prescription exists yet.
     */
    const eligibleAppointments =
      appointments.filter(
        (appointment) =>
          appointment.status ===
            "COMPLETED" &&
          appointment.paymentStatus ===
            "PAID" &&
          !appointment.prescription
      );

    const prescribedAppointments =
      appointments.filter(
        (appointment) =>
          Boolean(
            appointment.prescription
          )
      );

    return (
      <div className="space-y-8">

        {/* ======================================
            HEADER
        ====================================== */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Patient Care
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Prescriptions
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Create prescriptions for
            patients after completed and
            paid consultations.
          </p>
        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {!result?.success && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {result?.message ||
              "Unable to load appointment data."}
          </div>
        )}

        {/* ======================================
            SUMMARY
        ====================================== */}

        {result?.success && (
          <div className="grid gap-4 sm:grid-cols-2">

            <SummaryCard
              icon={Users}
              title="Ready for Prescription"
              value={
                eligibleAppointments.length
              }
              description="Completed and paid consultations"
            />

            <SummaryCard
              icon={CheckCircle2}
              title="Prescriptions Created"
              value={
                prescribedAppointments.length
              }
              description="Appointments with prescriptions"
            />
          </div>
        )}

        {/* ======================================
            CREATE PRESCRIPTION
        ====================================== */}

        {result?.success && (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-100 pb-5 dark:border-slate-800">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                    Create Prescription
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Select an eligible
                    patient consultation
                    and provide treatment
                    instructions and
                    follow-up information.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">

              {eligibleAppointments.length >
              0 ? (
                <CreatePrescriptionForm
                  appointments={
                    eligibleAppointments
                  }
                />
              ) : (
                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 text-center dark:border-slate-700">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-950">
                    <FileText className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                    No consultations are ready
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    A prescription can be
                    created after the
                    consultation is completed,
                    payment is confirmed, and
                    no prescription has been
                    issued yet.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    );
  };

export default DoctorPrescriptionPage;

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
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
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