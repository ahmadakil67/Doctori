import MySchedulesFilters from "@/components/modules/Doctor/MyScheduleFilters";
import MySchedulesHeader from "@/components/modules/Doctor/MyScheduleHeader";
import MySchedulesTable from "@/components/modules/Doctor/MyScheduleTable";

import TablePagination from "@/components/shared/TablePagination";

import { queryStringFormatter } from "@/lib/formatters";

import {
  getAvailableSchedules,
  getDoctorOwnSchedules,
} from "@/services/doctor/doctorScedule.services";

interface DoctorMySchedulesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

const DoctorMySchedulesPage = async ({
  searchParams,
}: DoctorMySchedulesPageProps) => {
  const params = await searchParams;

  const queryString =
    queryStringFormatter(params);

  /* =========================================
     PARALLEL DATA FETCHING
  ========================================= */

  const [
    myDoctorsScheduleResponse,
    availableSchedulesResponse,
  ] = await Promise.all([
    getDoctorOwnSchedules(queryString),
    getAvailableSchedules(),
  ]);

  const schedules =
    myDoctorsScheduleResponse?.data || [];

  const availableSchedules =
    availableSchedulesResponse?.data || [];

  const meta =
    myDoctorsScheduleResponse?.meta;

  const currentPage =
    meta?.page || 1;

  const totalPages = Math.max(
    1,
    Math.ceil(
      (meta?.total || 0) /
        (meta?.limit || 1)
    )
  );

  return (
    <div className="space-y-8">

      {/* Header + Add Schedule */}
      <MySchedulesHeader
        availableSchedules={
          availableSchedules
        }
      />

      {/* Filters */}
      <MySchedulesFilters />

      {/* Schedule List */}
      <MySchedulesTable
        schedules={schedules}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end">
          <TablePagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
          />
        </div>
      )}
    </div>
  );
};

export default DoctorMySchedulesPage;