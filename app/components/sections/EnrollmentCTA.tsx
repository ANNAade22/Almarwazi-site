"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { universityContent } from "@/lib/universityContent";

export default function EnrollmentCTA() {
  const { contact } = universityContent;

  return (
    <section className="py-14 md:py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-accent-light font-semibold tracking-wide mb-3">
            انضم إلى رحلة العلم الشرعي
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {universityContent.name}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {universityContent.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-accent text-white font-bold rounded-lg hover:bg-accent-light transition-colors"
            >
              تسجيل القبول
            </Link>
            <a
              href={`tel:${contact.primaryPhone}`}
              className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              اتصل بنا
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-sm text-white/85 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-accent-light" />
              {contact.primaryPhone}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-accent-light" />
              {contact.email}
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-accent-light" />
              {contact.address}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
