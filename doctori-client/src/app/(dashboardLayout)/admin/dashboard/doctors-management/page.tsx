import DoctorFilters from "@/components/modules/Admin/DoctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";

import TablePagination from "@/components/shared/TablePagination";

import { queryStringFormatter } from "@/lib/formatters";

import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";

const AdminDoctorsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
}) => {
  const params = await searchParams;

  const queryString =
    queryStringFormatter(params);

  const [
    doctorsResult,
    specialitiesResult,
  ] = await Promise.all([
    getDoctors(queryString),
    getSpecialities(),
  ]);

  const doctors =
    doctorsResult?.data || [];

  const specialities =
    specialitiesResult?.data || [];

  const meta =
    doctorsResult?.meta;

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
      <DoctorsManagementHeader
        specialities={specialities}
      />

      <DoctorFilters
        specialties={specialities}
      />

      <DoctorsTable
        doctors={doctors}
        specialities={specialities}
      />

      {totalPages > 1 && (
        <div className="flex justify-end">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDoctorsManagementPage;