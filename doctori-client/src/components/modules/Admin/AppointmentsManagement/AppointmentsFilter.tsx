"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { SlidersHorizontal } from "lucide-react";

const AppointmentsFilter = () => {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Filter Appointments</h3>
            <p className="text-xs text-muted-foreground">
              Find appointments by status, payment, patient or doctor
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SelectFilter
            paramName="status"
            placeholder="Appointment Status"
            options={[
              { label: "All Statuses", value: "" },
              { label: "Scheduled", value: "SCHEDULED" },
              { label: "In Progress", value: "INPROGRESS" },
              { label: "Completed", value: "COMPLETED" },
              { label: "Canceled", value: "CANCELED" },
            ]}
          />

          <SelectFilter
            paramName="paymentStatus"
            placeholder="Payment Status"
            options={[
              { label: "All Payment Statuses", value: "" },
              { label: "Paid", value: "PAID" },
              { label: "Unpaid", value: "UNPAID" },
            ]}
          />

          <SearchFilter
            paramName="patientEmail"
            placeholder="Search patient email"
          />

          <SearchFilter
            paramName="doctorEmail"
            placeholder="Search doctor email"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t pt-4">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsFilter;