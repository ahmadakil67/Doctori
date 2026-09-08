"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Stethoscope } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";

import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";

interface DashboardMobileSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarContentProps) => {
  const pathname = usePathname();

  /* ======================================
     PROFILE DATA
  ====================================== */

  const profileData =
    userInfo.role === "ADMIN"
      ? userInfo.admin
      : userInfo.role === "DOCTOR"
        ? userInfo.doctor
        : userInfo.role === "PATIENT"
          ? userInfo.patient
          : null;

  const displayName =
    profileData?.name ||
    userInfo.name ||
    "User";

  const profilePhoto =
    profileData?.profilePhoto ||
    undefined;

  const roleLabel =
    userInfo.role
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950">

      <SheetTitle className="sr-only">
        Dashboard Navigation
      </SheetTitle>

      {/* ======================================
          LOGO
      ====================================== */}

      <div className="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800">

        <SheetClose asChild>
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm">
              <Stethoscope className="h-4 w-4" />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                Doctori
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Smart Healthcare
              </p>
            </div>
          </Link>
        </SheetClose>
      </div>

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <ScrollArea className="flex-1">

        <nav className="space-y-6 px-3 py-5">

          {navItems.map(
            (section, sectionIndex) => (
              <div
                key={`${section.title || "main"}-${sectionIndex}`}
              >

                {section.title && (
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {section.title}
                  </p>
                )}

                <div className="space-y-1">

                  {section.items.map(
                    (item) => {
                      const Icon =
                        getIconComponent(
                          item.icon
                        );

                      /*
                       * Dashboard should only be
                       * active on exact dashboard URL.
                       *
                       * Other menu items can remain
                       * active on nested routes.
                       */
                      const isActive =
                        item.href ===
                        dashboardHome
                          ? pathname ===
                            item.href
                          : pathname ===
                              item.href ||
                            pathname.startsWith(
                              `${item.href}/`
                            );

                      return (
                        <SheetClose
                          asChild
                          key={item.href}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "flex min-h-10 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",

                              isActive
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-400 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0" />

                            <span className="flex-1 truncate">
                              {item.title}
                            </span>

                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "ml-auto h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px]",

                                  isActive &&
                                    "bg-white/15 text-white"
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SheetClose>
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </nav>
      </ScrollArea>

      {/* ======================================
          USER PROFILE
      ====================================== */}

      <div className="border-t border-slate-200 p-3 dark:border-slate-800">

        <SheetClose asChild>
          <Link
            href="/my-profile"
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50 dark:hover:bg-slate-900"
          >

            <Avatar className="h-10 w-10">

              <AvatarImage
                src={profilePhoto}
                alt={displayName}
                className="object-cover"
              />

              <AvatarFallback className="bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {displayName}
              </p>

              <p className="text-xs text-slate-400">
                {roleLabel}
              </p>
            </div>
          </Link>
        </SheetClose>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;