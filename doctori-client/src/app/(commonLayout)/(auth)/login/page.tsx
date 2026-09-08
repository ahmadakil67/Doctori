import LoginForm from "@/components/login-form";

import {
  CalendarCheck,
  FileText,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    redirect?: string;
  }>;
}) => {
  const params =
    (await searchParams) || {};

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-2">

        {/* =====================================
            BRAND / TRUST SIDE
        ===================================== */}

        <section className="hidden border-r border-slate-200 px-10 py-16 lg:flex lg:flex-col lg:justify-center dark:border-slate-800">

          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              <ShieldCheck className="h-4 w-4" />
              Secure healthcare access
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 xl:text-5xl dark:text-white">
              Your healthcare,
              <span className="text-blue-600">
                {" "}
                easier to manage.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-500 dark:text-slate-400">
              Sign in to manage appointments,
              prescriptions, your profile, and
              healthcare activity from one place.
            </p>

            <div className="mt-10 space-y-5">

              <Feature
                icon={Stethoscope}
                title="Find the right doctor"
                description="Explore doctors and book consultations with ease."
              />

              <Feature
                icon={CalendarCheck}
                title="Manage appointments"
                description="Keep track of your upcoming and previous consultations."
              />

              <Feature
                icon={FileText}
                title="Access prescriptions"
                description="Review prescriptions and follow-up instructions anytime."
              />
            </div>
          </div>
        </section>

        {/* =====================================
            LOGIN SIDE
        ===================================== */}

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">

          <div className="w-full max-w-md">

            {/* Mobile Intro */}
            <div className="mb-8 lg:hidden">

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <ShieldCheck className="h-4 w-4" />
                Secure account access
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  Sign in to Doctori
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter your account details to
                  continue to your dashboard.
                </p>
              </div>

              <div className="mt-7">
                <LoginForm
                  redirect={params.redirect}
                />
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              Your account information is used
              securely to provide access to
              Doctori services.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;

/* =========================================
   FEATURE
========================================= */

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}