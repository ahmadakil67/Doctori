import { getAdminDashboardMeta } from "@/services/admin/dashboard.services";

import {
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

interface StatusItem {
  status: string;
  count: number;
}

interface MonthlyItem {
  month: string;
  count: number;
}

interface AdminMeta {
  patientCount: number;
  doctorCount: number;
  adminCount: number;
  appointmentCount: number;
  paymentCount: number;

  totalRevenue?: {
    _sum?: {
      amount?: number | null;
    };
  };

  barChartData: MonthlyItem[];
  pieChartData: StatusItem[];
}

const AdminDashboardPage = async () => {
  const result = await getAdminDashboardMeta();

  const data: AdminMeta | null = result.data;

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
          Overview of Doctori platform activity
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

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
                Doctors
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.doctorCount}
              </p>
            </div>

            <Stethoscope className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Admins
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.adminCount}
              </p>
            </div>

            <ShieldCheck className="h-7 w-7 text-muted-foreground" />
          </div>
        </div>

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
                Payments
              </p>

              <p className="text-3xl font-semibold mt-2">
                {data.paymentCount}
              </p>
            </div>

            <CreditCard className="h-7 w-7 text-muted-foreground" />
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
          Overall appointment distribution
        </p>

        {data.pieChartData.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No appointment data available.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.pieChartData.map((item) => (
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
            ))}
          </div>
        )}
      </div>

      {/* Monthly Appointments */}
      <div className="border rounded-xl p-5">
        <h2 className="text-lg font-semibold">
          Monthly Appointments
        </h2>

        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Appointment count by month
        </p>

        {data.barChartData.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No monthly appointment data available.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.barChartData.map((item, index) => (
              <div
                key={`${item.month}-${index}`}
                className="border rounded-lg p-4"
              >
                <p className="text-sm text-muted-foreground">
                  {new Date(item.month).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>

                <p className="text-2xl font-semibold mt-1">
                  {item.count}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;