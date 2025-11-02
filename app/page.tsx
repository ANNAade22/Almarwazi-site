import Image from "next/image";
import Link from "next/link";

import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import BranchLocations from "./components/sections/BranchLocations";
// import CoursesSection from "./components/sections/CoursesSection";
// import FacebookPosts from "./components/sections/FacebookPosts";
// import PartnerUniversities from "../components/sections/PartnerUniversities";

import FooterSection from "./FooterSection";
import OurTeachers from "./components/sections/OurTeachers";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      {/* <CoursesSection /> */}
      {/* PartnerUniversities removed per request */}
      {/* <FacebookPosts /> */}
      <BranchLocations />
      <OurTeachers />
      <FooterSection />
    </main>
  );
}
