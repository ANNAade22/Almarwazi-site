"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import FooterSection from "../FooterSection";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { universityContent } from "@/lib/universityContent";

const BranchMap = dynamic(() => import("../components/sections/BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-primary/5 rounded-2xl flex items-center justify-center">
      <p className="text-gray-500">جارٍ تحميل الخريطة...</p>
    </div>
  ),
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "العنوان",
      details: [
        `${universityContent.contact.address}`,
        `صندوق بريد: ${universityContent.contact.poBox}`,
      ],
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "البريد الإلكتروني",
      details: [universityContent.contact.email],
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "الهاتف",
      details: universityContent.contact.phones.slice(0, 3),
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  return (
    <main dir="rtl" className="pt-20 bg-[#e3fae5]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              اتصل بنا
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              نحن هنا للإجابة على استفساراتك ومساعدتك
            </p>
            <p className="text-base sm:text-lg text-white/80">
              Contact Us - We&apos;re Here to Help
            </p>
          </div>
        </div>

        {/* Animated Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/70 text-sm font-medium">تواصل معنا</span>
            <svg
              className="w-6 h-6 text-white/90"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-200 overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${index * 0.1}s`,
                }}
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`w-full h-full bg-gradient-to-bl ${info.gradient} rounded-bl-full`}></div>
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {info.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-green-600 transition-colors duration-300">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed mb-2">
                      {detail}
                    </p>
                  ))}
                </div>

                {/* Decorative Bottom Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form and Working Hours */}
      <section ref={sectionRef} className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-50 to-green-50 p-8 md:p-10 rounded-2xl shadow-lg border-2 border-green-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl text-white">
                    <Send className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary">
                    أرسل لنا رسالة
                  </h2>
                </div>

                {isSubmitted ? (
                  <div className="bg-green-50 border-2 border-green-400 text-green-700 px-6 py-6 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-lg">تم إرسال رسالتك بنجاح!</p>
                        <p className="text-sm">سنتواصل معك في أقرب وقت ممكن</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-800 font-semibold mb-2"
                        >
                          الاسم الكامل *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-800 font-semibold mb-2"
                        >
                          البريد الإلكتروني *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-800 font-semibold mb-2"
                        >
                          رقم الهاتف
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                          placeholder="+252 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-gray-800 font-semibold mb-2"
                        >
                          الموضوع *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        >
                          <option value="">اختر الموضوع</option>
                          <option value="استفسار عام">استفسار عام</option>
                          <option value="القبول والتسجيل">القبول والتسجيل</option>
                          <option value="البرامج الدراسية">البرامج الدراسية</option>
                          <option value="الرسوم الدراسية">الرسوم الدراسية</option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-gray-800 font-semibold mb-2"
                      >
                        الرسالة *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5" />
                      إرسال الرسالة
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Working Hours - Takes 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary to-primary/90 p-8 rounded-2xl text-white shadow-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">ساعات العمل</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">الأحد - الخميس</span>
                      <span className="text-white/90">8:00 ص - 4:00 م</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">الجمعة</span>
                      <span className="text-red-200">مغلق</span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">السبت</span>
                      <span className="text-white/90">9:00 ص - 1:00 م</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-white/80 text-sm leading-relaxed">
                    للطوارئ أو الاستفسارات العاجلة، يرجى الاتصال على رقم الطوارئ الموضح أعلاه
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-[#e3fae5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                موقعنا على الخريطة
              </h2>
              <p className="text-lg text-gray-700">
                فروعنا في الصومال وجنوب أفريقيا والكويت وكينيا وأوغندا
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <BranchMap variant="global" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
              {universityContent.globalBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-primary/10"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm">
                      {branch.name}
                    </h3>
                    <p className="text-gray-600 text-xs mt-0.5">
                      {branch.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
