import { getDoctorDashboardMeta } from "@/services/doctor/dashboard.services";

import {
  CalendarDays,
  Users,
  Star,
  Wallet,
} from "lucide-react";

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

const DoctorDashboardPage = async () => {
  const result = await getDoctorDashboardMeta();

  const data: DoctorMeta | null = result.data;

  if (!result.success || !data) {
    return (
      <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4">
        {result.message}
      </div>
    );
  }

  const revenue =
    data.totalRevenue?._sum?.amount || 0;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Overview of your consultation activity
        </p>
      </div>

      {/* Summary */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

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
                Patients
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.patientCount}
              </p>
            </div>

            <Users className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Reviews
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.reviewCount}
              </p>
            </div>

            <Star className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Revenue
              </p>

              <p className="text-3xl font-semibold mt-2">
                BDT {revenue}
              </p>
            </div>

            <Wallet className="h-7 w-7 text-muted-foreground" />
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

export default DoctorDashboardPage;