"use client";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-white w-full mb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold">
                جامعة المروزي
              </h3>
            </div>
            <p className="text-gray-200 leading-relaxed text-sm lg:text-base">
              رسالة الجامعة: الكتاب والسنة على فهم سلف الأمة بالفصحى العربية
            </p>
            <p className="text-gray-300 text-xs lg:text-sm italic">
              Excellence in Islamic Education
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 relative inline-block">
              روابط سريعة
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3 text-sm lg:text-base">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  عن الجامعة
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  الكليات
                </Link>
              </li>
              <li>
                <Link
                  href="/deanships"
                  className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  العمادات
                </Link>
              </li>
              <li>
                <Link
                  href="/album"
                  className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  الألبوم
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Info */}
          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 relative inline-block">
              فروعنا العالمية
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3 text-gray-200 text-sm lg:text-base">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">📍</span>
                <span>الصومال - Somalia</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">📍</span>
                <span>جنوب أفريقيا - South Africa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">📍</span>
                <span>الكويت - Kuwait</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">📍</span>
                <span>كينيا - Kenya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">📍</span>
                <span>أوغندا - Uganda</span>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg lg:text-xl font-bold mb-6 relative inline-block">
              تواصل معنا
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:info@marwazi.edu" 
                className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm lg:text-base"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@marwazi.edu
              </a>
              <a 
                href="tel:+966110000000" 
                className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm lg:text-base"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +966 11 000 0000
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <Link
                href="https://wa.me/966110000000"
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
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-200">
              © {new Date().getFullYear()} جامعة الإمام محمد بن نصر المروزي - جميع الحقوق محفوظة
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
