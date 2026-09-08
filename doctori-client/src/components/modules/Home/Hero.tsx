"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  Search,
  Sparkles,
  Stethoscope,
  ArrowRight,
  Activity,
  Zap,
  Loader2,
  Star,
  Clock,
  WalletCards,
} from "lucide-react";

interface RecommendedDoctor {
  id: string;
  name: string;
  designation: string;
  experience: number;
  appointmentFee: number;
  averageRating: number;
  specialty: string;
}

const Hero = () => {
  const [symptom, setSymptom] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    RecommendedDoctor[]
  >([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const popularSymptoms = [
    "Fever & Chills",
    "Chest pain",
    "Skin allergy",
    "Migraine",
  ];

  const handleRecommendDoctor = async () => {
    if (!symptom.trim() || symptom.trim().length < 5) {
      setError("Please describe your symptoms in a little more detail.");
      return;
    }

    setIsLoading(true);
    setError("");
    setRecommendations([]);
    setHasSearched(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/doctors/suggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: symptom.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to get doctor recommendation"
        );
      }

      let doctors = result.data;

      if (typeof doctors === "string") {
        try {
          doctors = JSON.parse(doctors);
        } catch {
          doctors = [];
        }
      }

      setRecommendations(Array.isArray(doctors) ? doctors : []);
    } catch (err) {
      console.error("AI doctor suggestion error:", err);

      setError(
        "Unable to get a recommendation right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-900/20" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-900/20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        {/* LEFT */}
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300">
            <Sparkles size={16} className="text-blue-500" />
            <span>Next-Gen Healthcare AI</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.15] text-slate-900 sm:text-6xl dark:text-white">
            Find the right doctor <br />

            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              with AI precision
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Describe what you&apos;re feeling and Doctori will recommend
            suitable doctors from our available specialists.
          </p>

          <div className="mt-10 max-w-xl">
            <div
              className={`relative flex items-center rounded-2xl border-2 bg-white p-2 transition-all duration-300 dark:bg-slate-900 ${
                symptom
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-slate-200 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:hover:border-slate-700"
              }`}
            >
              <div className="pointer-events-none pl-4 text-blue-500">
                <Search size={22} />
              </div>

              <input
                type="text"
                value={symptom}
                onChange={(e) => {
                  setSymptom(e.target.value);
                  setError("");
                }}
                placeholder="E.g., severe chest pain and sweating..."
                className="w-full bg-transparent px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleRecommendDoctor();
                  }
                }}
              />

              <button
                onClick={handleRecommendDoctor}
                disabled={isLoading}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>

                    <ArrowRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        isHovering ? "translate-x-1" : ""
                      }`}
                    />
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Try:
              </span>

              {popularSymptoms.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setSymptom(item);
                    setError("");
                  }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-lg">
          <div className="absolute -right-6 -top-6 animate-pulse rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
            <Zap size={24} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white/60 p-1 shadow-2xl shadow-blue-900/5 backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-900/60 dark:shadow-black/50">
            <div className="rounded-[22px] bg-slate-50/80 p-6 dark:bg-slate-900/80">
              {/* Engine header */}
              <div className="flex items-center gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
                  <Activity size={28} />

                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Doctori Engine
                  </h3>

                  <p className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                    </span>

                    AI Recommendation Active
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {/* BEFORE SEARCH */}
                {!hasSearched && !isLoading && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Example
                      </p>

                      <h4 className="mt-1 text-slate-800 dark:text-slate-200">
                        &quot;Severe chest pain and sweating&quot;
                      </h4>

                      <div className="mt-3 flex items-center gap-3 rounded-xl bg-blue-50 p-3 dark:bg-blue-900/20">
                        <Stethoscope
                          size={18}
                          className="text-blue-600 dark:text-blue-400"
                        />

                        <div>
                          <p className="text-xs text-blue-600/80 dark:text-blue-400/80">
                            Recommended Specialty
                          </p>

                          <p className="font-semibold text-blue-700 dark:text-blue-300">
                            Cardiology
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        How it works
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        Describe your symptoms and Doctori will match them
                        with suitable doctors currently available in the
                        platform.
                      </p>
                    </div>
                  </div>
                )}

                {/* LOADING */}
                {isLoading && (
                  <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                      <Loader2
                        size={28}
                        className="animate-spin text-blue-600"
                      />
                    </div>

                    <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                      Analyzing your symptoms
                    </h4>

                    <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                      Matching your symptoms with suitable doctors...
                    </p>
                  </div>
                )}

                {/* NO MATCH */}
                {!isLoading &&
                  hasSearched &&
                  recommendations.length === 0 &&
                  !error && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-950">
                      <Stethoscope
                        size={32}
                        className="mx-auto text-slate-400"
                      />

                      <h4 className="mt-3 font-semibold text-slate-900 dark:text-white">
                        No matching doctor found
                      </h4>

                      <p className="mt-2 text-sm text-slate-500">
                        Try describing your symptoms in more detail or
                        browse all available doctors.
                      </p>

                      <Link
                        href="/consultation"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Find Doctors
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  )}

                {/* RESULTS */}
                {!isLoading && recommendations.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                          AI Recommended
                        </p>

                        <h4 className="mt-1 font-semibold text-slate-900 dark:text-white">
                          Best matches for you
                        </h4>
                      </div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        {recommendations.length}{" "}
                        {recommendations.length === 1
                          ? "Doctor"
                          : "Doctors"}
                      </span>
                    </div>

                    <div className="max-h-[390px] space-y-3 overflow-y-auto pr-1">
                      {recommendations.map((doctor) => (
                        <div
                          key={doctor.id}
                          className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h5 className="font-bold text-slate-900 dark:text-white">
                                Dr. {doctor.name}
                              </h5>

                              <p className="mt-0.5 text-sm text-slate-500">
                                {doctor.designation}
                              </p>
                            </div>

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                              {doctor.specialty}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                              <Clock size={14} />
                              <span>{doctor.experience || 0} yrs</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                              <Star
                                size={14}
                                className="fill-amber-400 text-amber-400"
                              />
                              <span>
                                {Number(
                                  doctor.averageRating || 0
                                ).toFixed(1)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                              <WalletCards size={14} />
                              <span>
                                BDT {doctor.appointmentFee}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/consultation/doctor/${doctor.id}`}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            View Doctor
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/consultation"
                      className="flex items-center justify-center gap-2 pt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View All Doctors
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;