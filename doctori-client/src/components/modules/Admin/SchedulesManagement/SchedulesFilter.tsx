"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";

import { Input } from "@/components/ui/input";

import {
  CalendarRange,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

const SchedulesFilter = () => {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    startDateInput,
    setStartDateInput,
  ] = useState(
    searchParams.get(
      "startDate"
    ) || ""
  );

  const [
    endDateInput,
    setEndDateInput,
  ] = useState(
    searchParams.get(
      "endDate"
    ) || ""
  );

  /*
   * Keep local input synchronized
   * when ClearFiltersButton or
   * browser navigation changes URL.
   */
  useEffect(() => {
    setStartDateInput(
      searchParams.get(
        "startDate"
      ) || ""
    );

    setEndDateInput(
      searchParams.get(
        "endDate"
      ) || ""
    );
  }, [searchParams]);

  /* =========================================================
     URL FILTER
  ========================================================= */

  const updateFilter = (
    key: "startDate" | "endDate",
    value: string
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set(
      "page",
      "1"
    );

    startTransition(() => {
      router.replace(
        `?${params.toString()}`
      );
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">

            <CalendarRange className="h-4 w-4 text-blue-600" />

            Filter by date
          </div>

          {/* Start */}
          <div className="flex items-center gap-2">

            <span className="text-xs font-medium text-slate-400">
              From
            </span>

            <Input
              type="date"
              value={
                startDateInput
              }
              onChange={(e) => {
                const value =
                  e.target.value;

                setStartDateInput(
                  value
                );

                updateFilter(
                  "startDate",
                  value
                );
              }}
              disabled={
                isPending
              }
              className="h-10 w-[165px] rounded-xl"
            />
          </div>

          {/* End */}
          <div className="flex items-center gap-2">

            <span className="text-xs font-medium text-slate-400">
              To
            </span>

            <Input
              type="date"
              value={
                endDateInput
              }
              onChange={(e) => {
                const value =
                  e.target.value;

                setEndDateInput(
                  value
                );

                updateFilter(
                  "endDate",
                  value
                );
              }}
              disabled={
                isPending
              }
              className="h-10 w-[165px] rounded-xl"
            />
          </div>
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

export default SchedulesFilter;