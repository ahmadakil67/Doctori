import PatientsFilter from "@/components/modules/Admin/PatientsManagement/PatientsFilter";
import PatientsTable from "@/components/modules/Admin/PatientsManagement/PatientsTable";

import TablePagination from "@/components/shared/TablePagination";

import { queryStringFormatter } from "@/lib/formatters";
import { getPatients } from "@/services/admin/patientsManagement";

import {
  UsersRound,
} from "lucide-react";

const AdminPatientsManagementPage = async ({
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

  const patientsResult =
    await getPatients(queryString);

  const patients =
    patientsResult?.data || [];

  const meta =
    patientsResult?.meta;

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

      {/* ======================================
          HEADER
      ====================================== */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Patient Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          Patients Management
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Review patient accounts,
          contact information and
          account status across Doctori.
        </p>
      </div>

      {/* ======================================
          INFO
      ====================================== */}

      <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">

        <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Patient accounts
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Patients create their own
            accounts. Admins can review,
            update supported information
            and deactivate accounts when
            necessary.
          </p>
        </div>
      </div>

      {/* ======================================
          ERROR
      ====================================== */}

      {!patientsResult?.success && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {patientsResult?.message ||
            "Unable to load patients."}
        </div>
      )}

      {patientsResult?.success && (
        <>
          <PatientsFilter />

          <PatientsTable
            patients={patients}
          />

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
        </>
      )}
    </div>
  );
};

export default AdminPatientsManagementPage;