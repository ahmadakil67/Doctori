"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import Swiper styles
import 'swiper/css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "John Doe", role: "CEO, TechFlow", feedback: "Amazing service! The team was professional and efficient.", rating: 5, image: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Jane Smith", role: "Product Manager", feedback: "Highly recommend! Very satisfied with the results.", rating: 5, image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Ali Khan", role: "Founder, StartupX", feedback: "Fantastic experience. They understood my needs perfectly.", rating: 4.9, image: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Sara Lee", role: "Design Lead", feedback: "Professional and friendly staff. Seamless communication.", rating: 5, image: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Mike Ross", role: "Legal Partner", feedback: "Top-tier execution and world-class support.", rating: 5, image: "https://i.pravatar.cc/150?u=5" },
];

export const ClientTestimonials: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header - Compact */}
        <div className="px-4 mb-10">
          <h2 className="text-2xl text-center md:text-3xl font-black tracking-tight text-slate-900 border-l-4 border-blue-600 pl-4">
            Trusted by <span className="text-blue-600">Industry Leaders</span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3.2}
          loop={true}
          speed={5000} // Speed of the transition (increase for slower, decrease for faster)
          autoplay={{
            delay: 0, // No delay for continuous movement
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }, // Rectangular look is best with more columns
          }}
          // This CSS transition-timing-function is crucial for a smooth marquee
          className="swiper-linear"
        >
          {testimonials.concat(testimonials).map((testimonial, idx) => (
            <SwiperSlide key={`${testimonial.id}-${idx}`}>
              <Card className="border border-slate-200 shadow-sm bg-white rounded-xl overflow-hidden group hover:border-blue-300 transition-colors">
                <CardContent className="p-4 flex flex-col justify-between h-32"> {/* Fixed height for rectangular look */}
                  
                  {/* Top: Feedback & Quote */}
                  <div className="flex gap-3">
                    <Quote className="w-5 h-5 text-blue-500 shrink-0 opacity-40" />
                    <p className="text-sm text-slate-600 leading-snug line-clamp-2 font-medium">
                      {testimonial.feedback}
                    </p>
                  </div>

                  {/* Bottom: Client Details & Rating */}
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={testimonial.image} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {testimonial.name}
                        </p>
                        <p className="text-[10px] text-blue-600 font-semibold truncate uppercase tracking-tighter">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-0.5 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-slate-700">{testimonial.rating}</span>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* Forces the Swiper transition to be perfectly linear for marquee effect */
        .swiper-linear .swiper-wrapper {
          transition-timing-function: linear !important;
        }
        
        /* Pause on hover to allow users to read */
        .swiper-linear:hover .swiper-wrapper {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};