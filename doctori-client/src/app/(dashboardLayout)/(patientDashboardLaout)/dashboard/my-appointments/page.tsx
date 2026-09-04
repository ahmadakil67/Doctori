import { getMyAppointments } from "@/services/patient/myAppointments";
import { CalendarDays, Clock, Stethoscope, CreditCard } from "lucide-react";
import { format } from "date-fns";

type Appointment = {
  id: string;
  status: "SCHEDULED" | "INPROGRESS" | "COMPLETED" | "CANCEL";
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
  } | null;
};

const statusClass = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "INPROGRESS":
      return "bg-blue-100 text-blue-700";
    case "CANCEL":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const paymentClass = (status: string) =>
  status === "PAID"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

const MyAppointmentsPage = async () => {
  const result = await getMyAppointments();

  const appointments: Appointment[] = result.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Appointments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage your doctor appointments
        </p>
      </div>

      {/* Error */}
      {!result.success && (
        <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4">
          {result.message}
        </div>
      )}

      {/* Empty State */}
      {result.success && appointments.length === 0 && (
        <div className="border rounded-xl p-12 text-center">
          <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-3" />

          <h2 className="font-medium">No appointments found</h2>

          <p className="text-sm text-muted-foreground mt-1">
            Your booked appointments will appear here.
          </p>
        </div>
      )}

      {/* Appointment Cards */}
      <div className="grid gap-4">
        {appointments.map((appointment) => {
          const startTime = appointment.schedule?.startDateTime
            ? new Date(appointment.schedule.startDateTime)
            : null;

          const endTime = appointment.schedule?.endDateTime
            ? new Date(appointment.schedule.endDateTime)
            : null;

          return (
            <div
              key={appointment.id}
              className="border rounded-xl p-5 bg-background"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* Doctor */}
                <div className="flex items-center gap-4">
                  {appointment.doctor?.profilePhoto ? (
                    <img
                      src={appointment.doctor.profilePhoto}
                      alt={appointment.doctor.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                  )}

                  <div>
                    <h2 className="font-semibold text-lg">
                      Dr. {appointment.doctor?.name || "Unknown Doctor"}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor?.designation || "Doctor"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor?.currentWorkingPlace}
                    </p>
                  </div>
                </div>

                {/* Date / Time */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4" />

                    <span>
                      {startTime
                        ? format(startTime, "EEEE, MMMM d, yyyy")
                        : "Date unavailable"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />

                    <span>
                      {startTime
                        ? format(startTime, "h:mm a")
                        : "N/A"}

                      {endTime &&
                        ` - ${format(endTime, "h:mm a")}`}
                    </span>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />

                    <span className="font-medium">
                      BDT{" "}
                      {appointment.payment?.amount ??
                        appointment.doctor?.appointmentFee ??
                        0}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${paymentClass(
                        appointment.paymentStatus
                      )}`}
                    >
                      {appointment.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Appointment ID */}
              <div className="border-t mt-4 pt-3">
                <p className="text-xs text-muted-foreground">
                  Appointment ID: {appointment.id}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;