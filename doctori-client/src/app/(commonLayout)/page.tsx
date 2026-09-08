import type { Metadata } from "next";

import { EasySteps } from "@/components/modules/Home/EasySteps";
import Hero from "@/components/modules/Home/Hero";
import OurSpecialties from "@/components/modules/Home/OurSpecialties";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import { ClientTestimonials } from "@/components/modules/Home/ClientTestimonials";

export const metadata: Metadata = {
  title: "Doctori | Smart Healthcare",
  description:
    "Explore medical specialties, discover doctors, and manage your healthcare journey with Doctori.",
};

export default function Home() {
  return (
    <main>
      <Hero />

      <OurSpecialties />

      <TopRatedDoctors />

      <EasySteps />

      <ClientTestimonials />
    </main>
  );
}