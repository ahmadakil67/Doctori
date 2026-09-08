import SpecialitiesManagementHeader from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader";
import SpecialitiesTable from "@/components/modules/Admin/SpecialitiesManagement/SpecialitiesTable";
import RefreshButton from "@/components/shared/RefreshButton";

import { getSpecialities } from "@/services/admin/specialitiesManagement";

const AdminSpecialitiesManagementPage =
  async () => {
    const result =
      await getSpecialities();

    const specialities =
      result?.data || [];

    return (
      <div className="space-y-8">

        <SpecialitiesManagementHeader />

        {!result?.success && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {result?.message ||
              "Unable to load specialties."}
          </div>
        )}

        {result?.success && (
          <>
            <div className="flex justify-end">
              <RefreshButton />
            </div>

            <SpecialitiesTable
              specialities={
                specialities
              }
            />
          </>
        )}
      </div>
    );
  };

export default AdminSpecialitiesManagementPage;