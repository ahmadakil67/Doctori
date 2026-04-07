"use client";
import { EasySteps } from "@/components/modules/Home/EasySteps";
import Hero from "@/components/modules/Home/Hero";
import OurSpecialties from "@/components/modules/Home/OurSpecialties";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import dynamic from "next/dynamic";
import Head from "next/head";

const ClientTestimonials = dynamic(
  () => import('@/components/modules/Home/ClientTestimonials').then(mod => mod.ClientTestimonials),
  { ssr: false }
);

export default function Home() {
  return (
    <>

      <Head>
        <title>Doctori - Your AI-Powered Doctor Finder</title>
        <meta name="description" content="Doctori is an AI-powered doctor finder that helps you quickly find the right doctor based on your symptoms. Get personalized recommendations and book appointments with ease." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <OurSpecialties />
        <TopRatedDoctors />
        <EasySteps />
        <ClientTestimonials />
      </main>

    </>
  );
}
