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
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12 relative">
            {/* Decorative top accent */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary relative inline-block">
              جامعة المروزي حول العالم
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
              Marwazi University Around the World
            </p>
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
