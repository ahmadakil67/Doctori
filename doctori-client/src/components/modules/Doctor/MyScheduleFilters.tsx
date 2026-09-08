"use client";

import {
  Filter,
} from "lucide-react";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SelectFilter from "@/components/shared/SelectFilter";

const MySchedulesFilters = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Filter className="h-4 w-4 text-blue-600" />
            Filter schedules
          </div>

          <SelectFilter
            paramName="isBooked"
            placeholder="Booking Status"
            options={[
              {
                label: "All Schedules",
                value: "all",
              },
              {
                label: "Available",
                value: "false",
              },
              {
                label: "Booked",
                value: "true",
              },
            ]}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          <ClearFiltersButton />

          <RefreshButton />
        </div>
      </div>
    </div>
  );
};

export default MySchedulesFilters;