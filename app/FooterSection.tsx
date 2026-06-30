"use client";
import Link from "next/link";
import { universityContent } from "@/lib/universityContent";

export default function FooterSection() {
  const { contact, branches } = universityContent;

  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-white w-full mb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-accent-light font-bold text-lg">
                م
              </div>
              <h3 className="text-xl lg:text-2xl font-bold">
                {universityContent.nameShort}
              </h3>
            </div>
            <p className="text-gray-200 leading-relaxed text-sm lg:text-base">
              {universityContent.mission}
            </p>
            <p className="text-gray-300 text-xs lg:text-sm">
              {contact.website}
            </p>
          </div>

          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 relative inline-block">
              روابط سريعة
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3 text-sm lg:text-base">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/about", label: "عن الجامعة" },
                { href: "/courses", label: "الكليات" },
                { href: "/deanships", label: "العمادات" },
                { href: "/album", label: "الألبوم" },
                { href: "/contact", label: "اتصل بنا" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 relative inline-block">
              فروعها
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3 text-gray-200 text-sm lg:text-base">
              {branches.map((branch) => (
                <li key={branch.id} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">📍</span>
                  <span>{branch.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 relative inline-block">
              تواصل معنا
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </h3>

            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm lg:text-base"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {contact.email}
              </a>
              {contact.phones.slice(0, 3).map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm lg:text-base"
                >
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {phone}
                </a>
              ))}
              <p className="text-gray-300 text-sm">
                {contact.address} — ص.ب: {contact.poBox}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`https://wa.me/${contact.primaryPhone.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Link>
              <Link
                href="https://facebook.com/Almarwazi252"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-200">
              © {new Date().getFullYear()} {universityContent.name} - جميع الحقوق محفوظة
            </p>
            <div className="flex gap-6 text-gray-200">
              <Link href="/privacy" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
