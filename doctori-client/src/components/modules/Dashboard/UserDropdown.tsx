"use client";

import Link from "next/link";

import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/user.interface";

interface UserDropdownProps {
  userInfo: UserInfo;
}

const UserDropdown = ({
  userInfo,
}: UserDropdownProps) => {
  /* ========================================
     USER DATA
  ======================================== */

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

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <DropdownMenu>

      {/* =====================================
          TRIGGER
      ===================================== */}

      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 rounded-xl px-2 hover:bg-slate-100 sm:px-3 dark:hover:bg-slate-900"
        >
          <Avatar className="h-8 w-8">

            <AvatarImage
              src={profilePhoto}
              alt={displayName}
              className="object-cover"
            />

            <AvatarFallback className="bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Desktop name */}
          <div className="ml-2 hidden min-w-0 text-left sm:block">

            <p className="max-w-[140px] truncate text-sm font-semibold leading-4 text-slate-900 dark:text-white">
              {displayName}
            </p>

            <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
              {roleLabel}
            </p>
          </div>

          <ChevronDown className="ml-2 hidden h-4 w-4 text-slate-400 sm:block" />

          <span className="sr-only">
            Open account menu
          </span>
        </Button>
      </DropdownMenuTrigger>

      {/* =====================================
          DROPDOWN
      ===================================== */}

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[280px] rounded-2xl border-slate-200 p-2 shadow-xl shadow-slate-900/10 dark:border-slate-800"
      >

        {/* Profile Header */}
        <DropdownMenuLabel className="p-3 font-normal">

          <div className="flex items-center gap-3">

            <Avatar className="h-11 w-11">

              <AvatarImage
                src={profilePhoto}
                alt={displayName}
                className="object-cover"
              />

              <AvatarFallback className="bg-blue-50 text-sm font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                {displayName}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {userInfo.email}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                {roleLabel}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* My Profile */}
        <DropdownMenuItem
          asChild
          className="h-10 cursor-pointer rounded-xl"
        >
          <Link href="/my-profile">

            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
              <User className="h-4 w-4" />
            </div>

            <span className="font-medium">
              My Profile
            </span>
          </Link>
        </DropdownMenuItem>

        {/* Change Password - Patient */}
        {userInfo.role === "PATIENT" && (
          <DropdownMenuItem
            asChild
            className="h-10 cursor-pointer rounded-xl"
          >
            <Link href="/change-password">

              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <Settings className="h-4 w-4" />
              </div>

              <span className="font-medium">
                Change Password
              </span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="h-10 cursor-pointer rounded-xl text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/30"
        >
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/30">
            <LogOut className="h-4 w-4" />
          </div>

          <span className="font-medium">
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;