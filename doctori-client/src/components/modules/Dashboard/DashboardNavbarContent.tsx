"use client";

import { usePathname } from "next/navigation";

import {
  Menu,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";

import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems = [],
  dashboardHome = "",
}: DashboardNavbarContentProps) => {
  const pathname = usePathname();

  const allItems = navItems.flatMap(
    (section) => section.items
  );

  /*
   * Find the most specific matching nav item.
   */
  const currentItem = allItems
    .filter((item) => {
      if (
        item.href === dashboardHome
      ) {
        return pathname === item.href;
      }

      return (
        pathname === item.href ||
        pathname.startsWith(
          `${item.href}/`
        )
      );
    })
    .sort(
      (a, b) =>
        b.href.length -
        a.href.length
    )[0];

  const pageTitle =
    currentItem?.title ||
    "Dashboard";

  const roleLabel =
    userInfo.role === "PATIENT"
      ? "Patient Portal"
      : userInfo.role === "DOCTOR"
        ? "Doctor Portal"
        : userInfo.role === "ADMIN"
          ? "Admin Portal"
          : "Dashboard";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">

      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">

        {/* ===============================
            LEFT
        =============================== */}

        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger
              asChild
              className="md:hidden"
            >
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl"
              >
                <Menu className="h-5 w-5" />

                <span className="sr-only">
                  Open dashboard navigation
                </span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 p-0"
            >
              <SheetTitle className="sr-only">
                Dashboard Navigation
              </SheetTitle>

              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems}
                dashboardHome={
                  dashboardHome
                }
              />
            </SheetContent>
          </Sheet>

          {/* Current Page */}
          <div className="min-w-0">

            <h1 className="truncate text-base font-bold text-slate-950 sm:text-lg dark:text-white">
              {pageTitle}
            </h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              {roleLabel}
            </p>
          </div>
        </div>

        {/* ===============================
            RIGHT
        =============================== */}

        <UserDropdown
          userInfo={userInfo}
        />
      </div>
    </header>
  );
};

export default DashboardNavbarContent;