"use client";
import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import FooterSection from "../FooterSection";
import Image from "next/image";

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

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    config: { tension: 280, friction: 60 },
  });

  return (
    <main dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-[#e3fae5] py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-primary mb-6">اتصل بنا</h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما تحتاجه. لا تتردد
              في التواصل معنا.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <animated.div style={fadeIn} className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-3xl font-bold text-primary mb-8">
                  أرسل لنا رسالة
                </h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-md">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="font-medium">
                        تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          الاسم الكامل
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          رقم الهاتف
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="أدخل رقم هاتفك"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          الموضوع
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">اختر الموضوع</option>
                          <option value="استفسار عام">استفسار عام</option>
                          <option value="القبول والتسجيل">
                            القبول والتسجيل
                          </option>
                          <option value="البرامج الدراسية">
                            البرامج الدراسية
                          </option>
                          <option value="الرسوم الدراسية">
                            الرسوم الدراسية
                          </option>
                          <option value="أخرى">أخرى</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        الرسالة
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="اكتب رسالتك هنا..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      إرسال الرسالة
                    </button>
                  </form>
                )}
              </div>
            </animated.div>

            <animated.div style={fadeIn} className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-primary mb-8">
                معلومات الاتصال
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-reverse space-x-5">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      العنوان
                    </h3>
                    <p className="text-gray-600">مقديشوا, الصومال</p>
                    <p className="text-gray-600 mt-1">
                      الحرم الجامعي الرئيسي، شارع الجامعة
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-reverse space-x-5">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      البريد الإلكتروني
                    </h3>
                    <p className="text-gray-600">info@almarwazi.edu</p>
                    <p className="text-gray-600 mt-1">
                      admissions@almarwazi.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-reverse space-x-5">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      الهاتف
                    </h3>
                    <p className="text-gray-600">966-11-000-0000+</p>
                    <p className="text-gray-600 mt-1">966-11-000-0001+</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-[#e3fae5] p-8 rounded-xl">
                <h3 className="text-xl font-bold text-primary mb-4">
                  ساعات العمل
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="font-medium">الأحد - الخميس:</span>
                    <span>8:00 صباحاً - 4:00 مساءً</span>
                  </li>
                  <li className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="font-medium">الجمعة:</span>
                    <span>مغلق</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">السبت:</span>
                    <span>9:00 صباحاً - 1:00 ظهراً</span>
                  </li>
                </ul>
              </div>
            </animated.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#e3fae5]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            موقعنا
          </h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm h-[400px]">
            {/* Google Maps iframe for Mogadishu */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127356.21295435993!2d45.24351962320662!3d2.0371281066307366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955ce6b53%3A0x5c2da92d6f4bf467!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2s!4v1653913936963!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mogadishu Map"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
