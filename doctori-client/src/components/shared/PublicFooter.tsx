import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/consultation" },
  { label: "Specialties", href: "/specialties" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

const accountLinks = [
  { label: "Log in", href: "/login" },
  { label: "Create Account", href: "/register" },
];

export default function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white dark:border-slate-800">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* Brand */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/20">
                <Stethoscope className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xl font-bold tracking-tight">
                  Doctori
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Smart Healthcare
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Doctori is designed to make healthcare discovery simpler —
              helping patients explore specialties, find doctors, and continue
              their care journey through one connected platform.
            </p>

            <Link
              href="/consultation"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Find a Doctor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-sm font-semibold text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">
              Account
            </h3>

            <ul className="mt-5 space-y-3.5">
              {accountLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <HeartPulse className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

              <p className="text-xs leading-5 text-slate-400">
                Looking for care? Browse available doctors and medical
                specialties on Doctori.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Doctori. All rights reserved.
            </p>

            <div className="flex max-w-2xl items-start gap-2.5 md:text-right">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

              <p className="text-xs leading-5 text-slate-500">
                Doctori supports healthcare discovery and does not replace
                professional medical diagnosis, treatment, or emergency care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}