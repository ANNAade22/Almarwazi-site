"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { universityContent } from "@/lib/universityContent";

export default function MobileEnrollmentBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-primary border-t border-white/10 px-4 py-3 flex items-center gap-3 safe-area-pb">
      <a
        href={`tel:${universityContent.contact.primaryPhone}`}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-white/25 text-white rounded-lg font-semibold text-sm"
      >
        <Phone className="w-4 h-4" />
        اتصل للقبول
      </a>
      <Link
        href="/contact"
        className="flex-1 inline-flex items-center justify-center py-3 bg-accent text-white rounded-lg font-bold text-sm"
      >
        سجل الآن
      </Link>
    </div>
  );
}
