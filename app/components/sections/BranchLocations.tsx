"use client";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-primary/5 rounded-2xl flex items-center justify-center">
      <p className="text-gray-500">جارٍ تحميل الخريطة...</p>
    </div>
  ),
});

export default function BranchLocations({ showMap = true }: { showMap?: boolean }) {
  return (
    <section
      className="py-10 md:py-14 relative"
      style={{ backgroundColor: "#e3fae5" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="فروعها وعناوينها"
            title="كمبسات الجامعة في الصومال"
            subtitle="خمسة كمبسات تخدم الطلاب في مختلف الولايات الصومالية"
            className="mb-6 md:mb-8"
          />

          {showMap && (
            <div className="relative w-full mb-8 md:mb-12" style={{ zIndex: 1 }}>
              <BranchMap />
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
            {universityContent.branches.map((branch) => (
              <div
                key={branch.id}
                className="flex items-start gap-3 bg-white rounded-xl p-5 border border-primary/10 hover:border-accent/40 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-sm sm:text-base">
                    {branch.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-0.5">{branch.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
