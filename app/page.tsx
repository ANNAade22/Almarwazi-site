// import Image from "next/image";
// import Link from "next/link";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CoursesSection from "@/components/sections/CoursesSection";

import FooterSection from "@/components/sections/FooterSection";
import OurTeachers from "@/components/sections/OurTeachers";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <OurTeachers />
      <FooterSection />
    </main>
  );
}
