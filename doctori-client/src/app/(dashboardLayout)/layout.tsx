import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/60 dark:bg-slate-950">

      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <DashboardNavbar />

        <main className="flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            {children}
          </div>

        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;