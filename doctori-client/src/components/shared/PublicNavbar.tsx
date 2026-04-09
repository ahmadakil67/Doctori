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
  HeartPulse,
  Info,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";

const navList = [
  { label: "Home", href: "/", icon: Home },
  { label: "Doctors", href: "/doctors", icon: Users },
  { label: "Services", href: "/services", icon: HeartPulse },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: MessageSquare },
];

const PublicNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadToken = async () => {
      const token = await getCookie("accessToken");
      setAccessToken(token || null);
    };

    loadToken();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
            <Stethoscope size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Doctori
            </h1>
            <p className="hidden text-[11px] font-medium uppercase tracking-wider text-slate-500 sm:block dark:text-slate-400">
              Smart Healthcare
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navList.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} className="group relative px-4 py-2">
                <span
                  className={`relative z-10 text-sm font-medium ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <Menu size={20} />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] border-l bg-white/95 dark:border-slate-800 dark:bg-slate-950/95">
              <SheetHeader className="mb-6 border-b border-slate-100 pb-6 dark:border-slate-800">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <Stethoscope size={20} />
                  </span>
                  <span className="text-xl font-bold tracking-tight">Doctori</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {navList.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                          : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {item.label}
                      </div>
                      <ChevronRight size={16} />
                    </Link>
                  );
                })}
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                {accessToken ? (
                  <LogoutButton />
                ) : (
                  <Link
                    href="/login"
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3.5 text-sm font-semibold text-white"
                  >
                    Login to Account
                  </Link>
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