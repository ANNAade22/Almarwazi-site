"use client";
import dynamic from "next/dynamic";

// Dynamically import BranchMap to avoid SSR issues with Leaflet
const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-200 rounded-2xl flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function BranchLocations() {
  return (
    <section
      className="py-12 md:py-16 lg:py-20 relative"
      style={{ backgroundColor: "#e3fae5" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
              فروعنا حول العالم
            </h2>
          </div>

          {/* Map Component */}
          <div className="relative w-full" style={{ zIndex: 1 }}>
            <BranchMap />
          </div>
        </div>
      </div>
    </section>
  );
}
