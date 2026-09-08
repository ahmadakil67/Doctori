import SchedulesFilter from "@/components/modules/Admin/SchedulesManagement/SchedulesFilter";
import SchedulesManagementHeader from "@/components/modules/Admin/SchedulesManagement/SchedulesManagementHeader";
import SchedulesTable from "@/components/modules/Admin/SchedulesManagement/SchedulesTable";

import TablePagination from "@/components/shared/TablePagination";

import { queryStringFormatter } from "@/lib/formatters";
import { getSchedules } from "@/services/admin/schedulesManagement";

const AdminSchedulesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
}) => {
  const searchParamsObj =
    await searchParams;

  const queryString =
    queryStringFormatter(
      searchParamsObj
    );

  const schedulesResult =
    await getSchedules(
      queryString
    );

  const schedules =
    schedulesResult?.data || [];

  const meta =
    schedulesResult?.meta;

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

      {/* Header + Create Schedule */}
      <SchedulesManagementHeader />

      {/* Filters */}
      <SchedulesFilter />

      {/* Schedule Table */}
      <SchedulesTable
        schedules={
          schedules
        }
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

export default AdminSchedulesManagementPage;