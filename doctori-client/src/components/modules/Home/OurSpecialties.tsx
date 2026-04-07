// components/OurSpecialties.tsx
"use client";

import {
  HeartPulse,
  Brain,
  Stethoscope,
  Baby,
  Eye,
  Bone,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const specialties = [
  {
    title: "Cardiology",
    description: "Heart care, checkups, and treatment for heart-related problems.",
    icon: HeartPulse,
    gradient: "from-rose-500 to-red-500",
    bgLight: "bg-rose-50 dark:bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    title: "Neurology",
    description: "Expert care for brain, nerves, headache, and stroke issues.",
    icon: Brain,
    gradient: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-50 dark:bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    title: "General Medicine",
    description: "Treatment for common health problems and regular consultations.",
    icon: Stethoscope,
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 dark:bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Pediatrics",
    description: "Special healthcare services for infants, children, and teenagers.",
    icon: Baby,
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    title: "Ophthalmology",
    description: "Eye checkups, vision care, and treatment for eye diseases.",
    icon: Eye,
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 dark:bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    title: "Orthopedics",
    description: "Bone, joint, and muscle treatment for pain and injury recovery.",
    icon: Bone,
    gradient: "from-indigo-500 to-blue-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
];

export default function OurSpecialties() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-20 dark:bg-slate-950 md:py-32">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50/0 to-slate-50/0 dark:from-blue-900/20 dark:via-slate-950/0 dark:to-slate-950/0 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
            Our Services
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Specialties
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            We provide expert healthcare services with highly experienced doctors across a wide range of medical disciplines.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {specialties.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group relative overflow-hidden border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:shadow-blue-900/20"
              >
                {/* Hover Gradient Blob Background */}
                <div 
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10 dark:group-hover:opacity-20`}
                ></div>

                <CardHeader className="relative z-10 pb-4">
                  <div 
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${item.bgLight} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
                  >
                    <Icon className={`h-8 w-8 ${item.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Learn More 
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}