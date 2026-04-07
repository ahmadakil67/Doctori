"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Award, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  location: string;
  availability: string;
  image: string;
  badge: string;
  badgeColor: string;
  tags: string[];
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sophia Mercer",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 1284,
    experience: "18 yrs exp",
    location: "New York, NY",
    availability: "Available Today",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    badge: "Top Rated",
    badgeColor: "amber",
    tags: ["Heart Care", "Preventive", "ECG"],
  },
  {
    id: 2,
    name: "Dr. James Whitfield",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 976,
    experience: "22 yrs exp",
    location: "Boston, MA",
    availability: "Next: Tomorrow",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    badge: "Expert",
    badgeColor: "blue",
    tags: ["Brain Health", "Migraines", "MRI"],
  },
  {
    id: 3,
    name: "Dr. Amara Osei",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 2103,
    experience: "14 yrs exp",
    location: "Los Angeles, CA",
    availability: "Available Today",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    badge: "Most Reviewed",
    badgeColor: "rose",
    tags: ["Skin Care", "Acne", "Cosmetic"],
  },
  {
    id: 4,
    name: "Dr. Ethan Calloway",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    reviews: 831,
    experience: "20 yrs exp",
    location: "Chicago, IL",
    availability: "Next: Mon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    badge: "Specialist",
    badgeColor: "green",
    tags: ["Sports Med", "Joint", "Spine"],
  },
];

const badgeStyles: Record<string, string> = {
  amber:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  blue: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  rose: "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  green:
    "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-3.5 h-3.5",
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
              ? "fill-amber-200 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="group relative overflow-hidden border border-border bg-card hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
      {/* Solid top accent border instead of a gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-6">
        {/* Top row: badge + heart */}
        <div className="flex items-center justify-between mb-5">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5",
              badgeStyles[doctor.badgeColor]
            )}
          >
            <Award className="w-3 h-3" />
            {doctor.badge}
          </Badge>
          <button
            onClick={() => setLiked(!liked)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200",
              liked
                ? "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-500"
                : "bg-muted text-muted-foreground hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30"
            )}
          >
            <Heart
              className={cn("w-4 h-4 transition-all", liked && "fill-rose-500")}
            />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative shrink-0">
            <Avatar className="w-16 h-16 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              {/* Solid color fallback instead of gradient */}
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {doctor.name
                  .split(" ")
                  .slice(1)
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {/* Online dot */}
            {doctor.availability === "Available Today" && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-card" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-[16px] leading-tight mb-1 truncate">
              {doctor.name}
            </h3>
            <p className="text-sm text-primary font-semibold mb-2">
              {doctor.specialty}
            </p>
            <div className="flex items-center gap-2">
              <StarRating rating={doctor.rating} />
              <span className="text-xs font-bold text-foreground">
                {doctor.rating}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                ({doctor.reviews.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-3 mb-5 bg-muted/40 rounded-xl p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <MapPin className="w-3.5 h-3.5 text-foreground/70 shrink-0" />
            <span className="truncate">{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <Award className="w-3.5 h-3.5 text-foreground/70 shrink-0" />
            <span>{doctor.experience}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-xs">
            <Clock
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                doctor.availability === "Available Today"
                  ? "text-emerald-600 dark:text-emerald-500"
                  : "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "font-semibold",
                doctor.availability === "Available Today"
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-muted-foreground"
              )}
            >
              {doctor.availability}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {doctor.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* Solid primary button */}
          <Button
            size="sm"
            className="flex-1 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-200"
          >
            Book Appointment
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl px-3 border-border hover:bg-muted hover:text-primary transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TopRatedDoctors() {
  return (
    <section className="w-full bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10">
            <Star className="w-3.5 h-3.5 fill-primary" />
            Verified Excellence
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight mb-5 leading-tight">
            Our Top Rated{" "}
            {/* Solid text color instead of gradient */}
            <span className="text-primary">Doctors</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Trusted by thousands of patients. Book a same-day or next-day
            appointment with our highest-rated specialists.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-14">
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl px-8 font-bold border-2 border-border hover:bg-secondary hover:text-secondary-foreground hover:border-transparent gap-2 transition-all duration-200"
          >
            View All Doctors
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}