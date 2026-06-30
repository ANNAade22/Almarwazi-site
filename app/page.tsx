import HeroSection from "./components/sections/HeroSection";
import CoursesSection from "./components/sections/CoursesSection";
import InstitutionalGridSection from "./components/sections/InstitutionalGridSection";
import CampusGallerySection from "./components/sections/CampusGallerySection";
import OurTeachers from "./components/sections/OurTeachers";
import EnrollmentCTA from "./components/sections/EnrollmentCTA";
import FooterSection from "./FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CoursesSection />
      <InstitutionalGridSection />
      <CampusGallerySection />
      <OurTeachers />
      <EnrollmentCTA />
      <FooterSection />
    </main>
  );
}
