"use client";
import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { universityContent } from "@/lib/universityContent";

export default function ContactTopBar() {
  const { contact } = universityContent;

  return (
    <div className="hidden md:block bg-primary-dark text-white text-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 flex-wrap">
          <a
            href={`tel:${contact.primaryPhone}`}
            className="inline-flex items-center gap-2 hover:text-accent-light transition-colors"
          >
            <Phone className="w-4 h-4 text-accent-light" />
            {contact.primaryPhone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 hover:text-accent-light transition-colors"
          >
            <Mail className="w-4 h-4 text-accent-light" />
            {contact.email}
          </a>
          <span className="text-white/70">{contact.website}</span>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent text-white rounded-md font-semibold hover:bg-accent-light transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          تسجيل القبول
        </Link>
      </div>
    </div>
  );
}
