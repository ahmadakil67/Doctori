import AppointmentsFilter from "@/components/modules/Admin/AppointmentsManagement/AppointmentsFilter";
import AppointmentsTable from "@/components/modules/Admin/AppointmentsManagement/AppointmentsTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAppointments } from "@/services/admin/appoitmentsManagement";
import { Suspense } from "react";

const AppointmentsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);

  const response = await getAppointments(queryString);

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Appointments Management"
        description="Monitor, review and update patient appointments"
      />

      <AppointmentsFilter />

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Suspense fallback={<TableSkeleton columns={7} />}>
          <AppointmentsTable appointments={response?.data || []} />
        </Suspense>
      </div>

      <div className="flex justify-end">
        <TablePagination
          currentPage={response?.meta?.page || 1}
          totalPages={response?.meta?.totalPage || 1}
        />
      </div>
    </div>
  );
};

export default AppointmentsManagementPage;