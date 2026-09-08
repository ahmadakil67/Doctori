"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

import {
  Filter,
} from "lucide-react";

const PatientsFilter = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center">

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Filter className="h-4 w-4 text-blue-600" />
            Filter patients
          </div>

          <div className="w-full max-w-[280px]">
            <SearchFilter
              paramName="searchTerm"
              placeholder="Search patients..."
            />
          </div>

          <div className="w-full max-w-[220px]">
            <SearchFilter
              paramName="email"
              placeholder="Filter by email"
            />
          </div>

          <div className="w-full max-w-[190px]">
            <SearchFilter
              paramName="contactNumber"
              placeholder="Filter by contact"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ClearFiltersButton />
          <RefreshButton />
        </div>
      </div>
    </div>
  );
};

export default PatientsFilter;