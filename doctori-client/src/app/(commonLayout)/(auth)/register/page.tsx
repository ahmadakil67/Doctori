import RegisterForm from "@/components/register-form";

import {
  CalendarCheck,
  FileText,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

const RegisterPage = () => {
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
              Start your healthcare journey
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 xl:text-5xl dark:text-white">
              Better healthcare starts with
              <span className="text-blue-600">
                {" "}
                one account.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-500 dark:text-slate-400">
              Create your Doctori account to find doctors,
              book appointments, access prescriptions, and
              manage your healthcare from one place.
            </p>

            <div className="mt-10 space-y-5">

              <Feature
                icon={Stethoscope}
                title="Find trusted doctors"
                description="Explore available doctors and choose the right care for you."
              />

              <Feature
                icon={CalendarCheck}
                title="Book appointments easily"
                description="Choose available schedules and manage your consultations."
              />

              <Feature
                icon={FileText}
                title="Keep your care organized"
                description="Access prescriptions, follow-up information, and appointment history."
              />
            </div>
          </div>
        </section>

        {/* =====================================
            REGISTER SIDE
        ===================================== */}

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">

          <div className="w-full max-w-xl">

            {/* Mobile Label */}
            <div className="mb-7 lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                <ShieldCheck className="h-4 w-4" />
                Create your secure account
              </div>
            </div>

            {/* Registration Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600">
                  Get started
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter your information below to create
                  your Doctori patient account.
                </p>
              </div>

              <div className="mt-7">
                <RegisterForm />
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              Your account information is securely used
              to provide Doctori healthcare services.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;

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