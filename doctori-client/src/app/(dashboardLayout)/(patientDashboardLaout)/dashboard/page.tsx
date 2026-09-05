import { getPatientDashboardMeta } from "@/services/patient/dashboard.services";

import {
  CalendarDays,
  FileText,
  Star,
} from "lucide-react";

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

const PatientDashboardPage = async () => {
  const result = await getPatientDashboardMeta();

  const data: PatientMeta | null = result.data;

  if (!result.success || !data) {
    return (
      <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4">
        {result.message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Overview of your healthcare activity
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Appointments
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.appointmentCount}
              </p>
            </div>

            <CalendarDays className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Prescriptions
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.prescriptionCount}
              </p>
            </div>

            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Reviews Given
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.reviewCount}
              </p>
            </div>

            <Star className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Appointment Status */}

      <div className="border rounded-xl p-5">
        <h2 className="text-lg font-semibold">
          Appointment Status
        </h2>

        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Current distribution of your appointments
        </p>

        {data.formattedAppointmentStatusDistribution.length ===
        0 ? (
          <p className="text-sm text-muted-foreground">
            No appointment data available.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.formattedAppointmentStatusDistribution.map(
              (item) => (
                <div
                  key={item.status}
                  className="border rounded-lg p-4"
                >
                  <p className="text-sm text-muted-foreground">
                    {item.status}
                  </p>

                  <p className="text-2xl font-semibold mt-1">
                    {item.count}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboardPage;