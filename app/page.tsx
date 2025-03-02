// import Image from "next/image";
// import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CoursesSection from "@/components/sections/CoursesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}
