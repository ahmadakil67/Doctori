import CreatePrescriptionForm from "@/components/modules/Doctor/CreatePrescriptionForm";
import { getMyAppointments } from "@/services/patient/myAppointments";

interface Appointment {
  id: string;

  status:
    | "SCHEDULED"
    | "INPROGRESS"
    | "COMPLETED"
    | "CANCEL";

  paymentStatus: "PAID" | "UNPAID";

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

const DoctorPrescriptionPage = async () => {
  const result = await getMyAppointments();

  const appointments: Appointment[] =
    result.data || [];

  const eligibleAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "COMPLETED" &&
        appointment.paymentStatus === "PAID" &&
        !appointment.prescription
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Prescriptions
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Create prescriptions for completed patient
          consultations
        </p>
      </div>

      {!result.success && (
        <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4">
          {result.message}
        </div>
      )}

      {result.success && (
        <CreatePrescriptionForm
          appointments={eligibleAppointments}
        />
      )}
    </div>
  );
};

export default DoctorPrescriptionPage;