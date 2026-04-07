"use client";

import React, { useState } from "react";
import { Search, Sparkles, Stethoscope, ArrowRight, Activity, Zap } from "lucide-react";

const Hero = () => {
  const [symptom, setSymptom] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleRecommendDoctor = () => {
    if (!symptom) return;
    console.log("Patient symptom:", symptom);
    // Add logic to handle the recommendation
  };

  const popularSymptoms = [
    "Fever & Chills", 
    "Chest pain", 
    "Skin allergy", 
    "Migraine"
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Gradient Orbs */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-900/20"></div>
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-900/20"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        
        {/* Left Content */}
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300">
            <Sparkles size={16} className="text-blue-500" />
            <span>Next-Gen Healthcare AI</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.15] text-slate-900 sm:text-6xl dark:text-white">
            Find the right doctor <br/>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              with AI precision
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Don't guess your care. Describe what you're feeling, and our smart AI will instantly match you with the perfect specialist for your needs.
          </p>

          {/* Search Box Area */}
          <div className="mt-10 max-w-xl">
            <div 
              className={`relative flex items-center rounded-2xl border-2 bg-white p-2 transition-all duration-300 dark:bg-slate-900 ${
                symptom ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-200 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:hover:border-slate-700'
              }`}
            >
              <div className="pointer-events-none pl-4 text-blue-500">
                <Search size={22} />
              </div>
              <input
                type="text"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="E.g., sharp lower back pain and tingling..."
                className="w-full bg-transparent px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleRecommendDoctor()}
              />
              <button
                onClick={handleRecommendDoctor}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-md active:scale-95"
              >
                <span>Analyze</span>
                <ArrowRight 
                  size={18} 
                  className={`transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} 
                />
              </button>
            </div>

            {/* Interactive Suggestions */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Try:
              </span>
              {popularSymptoms.map((symp, index) => (
                <button
                  key={index}
                  onClick={() => setSymptom(symp)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  {symp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Visual AI Showcase */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg z-10">
          {/* Decorative floating element */}
          <div className="absolute -right-6 -top-6 animate-pulse rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
            <Zap size={24} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white/60 p-1 shadow-2xl shadow-blue-900/5 backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-900/60 dark:shadow-black/50">
            <div className="rounded-[22px] bg-slate-50/80 p-6 dark:bg-slate-900/80">
              
              <div className="flex items-center gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
                  <Activity size={28} />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-slate-900"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Doctori Engine
                  </h3>
                  <p className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    </span>
                    Live Analysis Active
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {/* AI Example 1 */}
                <div className="group rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Input Symptom</p>
                      <h4 className="mt-1 text-slate-800 dark:text-slate-200">"Severe chest pain and sweating"</h4>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-blue-50 p-3 dark:bg-blue-900/20">
                    <Stethoscope size={18} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-xs text-blue-600/80 dark:text-blue-400/80">Recommended Match</p>
                      <p className="font-semibold text-blue-700 dark:text-blue-300">Cardiologist</p>
                    </div>
                  </div>
                </div>

                {/* AI Example 2 */}
                <div className="group rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Input Symptom</p>
                      <h4 className="mt-1 text-slate-800 dark:text-slate-200">"Red, itchy rash on arms"</h4>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-indigo-50 p-3 dark:bg-indigo-900/20">
                    <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80">Recommended Match</p>
                      <p className="font-semibold text-indigo-700 dark:text-indigo-300">Dermatologist</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;