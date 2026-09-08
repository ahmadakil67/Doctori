"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Moon,
  Stethoscope,
  Sun,
  Menu,
  Home,
  Users,
  ChevronRight,
  LayoutDashboard,
  User,
  LogOut,
  HeartPulse,
  CircleHelp,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { logoutUser } from "@/services/auth/logoutUser";
import {
  getDefaultDashboardRoute,
  UserRole,
} from "@/lib/auth-utils";

const navList = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Find Doctors",
    href: "/consultation",
    icon: Users,
  },
  {
    label: "Specialties",
    href: "/specialties",
    icon: HeartPulse,
  },
  {
    label: "How It Works",
    href: "/how-it-works",
    icon: CircleHelp,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
];

const PublicNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("User");
  const [dashboardRoute, setDashboardRoute] =
    useState("/dashboard");

  const pathname = usePathname();

  useEffect(() => {
    const loadUser = async () => {
      const token = await getCookie("accessToken");

      if (!token) {
        setAccessToken(null);
        return;
      }

      setAccessToken(token);

      const user = await getUserInfo();

      if (user) {
        setUserName(user.name || "User");

        if (user.role) {
          setDashboardRoute(
            getDefaultDashboardRoute(
              user.role as UserRole
            )
          );
        }
      }
    };

    loadUser();
  }, [pathname]);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
            <Stethoscope size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Doctori
            </h1>

            <p className="hidden text-[11px] uppercase tracking-wider text-slate-500 sm:block">
              Smart Healthcare
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navList.map((item) => {
            const isHomeActive =
              item.href === "/" &&
              pathname === "/";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isHomeActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300"
                }`}
              >
                {item.label}

                {isHomeActive && (
                  <span className="absolute inset-x-3 -bottom-[22px] h-0.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {accessToken ? (
            <>
              {/* Dashboard */}
              <Link
                href={dashboardRoute}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {userName
                      .charAt(0)
                      .toUpperCase()}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2"
                >
                  <div className="px-2 py-2">
                    <p className="text-sm font-semibold">
                      {userName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Doctori Account
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href={dashboardRoute}
                    >
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/my-profile">
                      <User />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-600 dark:text-slate-200"
              >
                Log in
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px]"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Stethoscope size={19} />
                  </div>

                  Doctori
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1">
                {navList.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {item.label}
                      </div>

                      <ChevronRight
                        size={16}
                      />
                    </Link>
                  );
                })}

                <div className="my-3 border-t" />

                {accessToken ? (
                  <>
                    <Link
                      href={dashboardRoute}
                      className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700"
                    >
                      <LayoutDashboard
                        size={18}
                      />
                      Dashboard
                    </Link>

                    <Link
                      href="/my-profile"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold"
                    >
                      Log in
                    </Link>

                    <Link
                      href="/register"
                      className="mt-1 flex justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;