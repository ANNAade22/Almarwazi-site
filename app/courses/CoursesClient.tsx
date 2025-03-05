"use client";
import { useState } from "react";
import Image from "next/image";
import FooterSection from "../FooterSection";

const courses = [
  {
    id: 1,
    title: "علوم الشريعة الإسلامية",
    description:
      "دراسة متعمقة في أصول الفقه والتفسير والحديث والعقيدة الإسلامية.",
    duration: "4 سنوات",
    level: "بكالوريوس",
  },
  {
    id: 2,
    title: "اللغة العربية وآدابها",
    description: "دراسة شاملة للغة العربية وقواعدها وآدابها وتاريخها.",
    duration: "4 سنوات",
    level: "بكالوريوس",
  },
  {
    id: 3,
    title: "الدراسات الإسلامية المعاصرة",
    description: "تحليل القضايا المعاصرة من منظور إسلامي وتطوير حلول مبتكرة.",
    duration: "2 سنوات",
    level: "ماجستير",
  },
  {
    id: 4,
    title: "تحفيظ القرآن الكريم",
    description: "برنامج متخصص في حفظ القرآن الكريم وتجويده وتفسيره.",
    duration: "3 سنوات",
    level: "دبلوم",
  },
  {
    id: 5,
    title: "الفقه المقارن",
    description: "دراسة مقارنة للمذاهب الفقهية المختلفة وأصولها وتطبيقاتها.",
    duration: "2 سنوات",
    level: "ماجستير",
  },
  {
    id: 6,
    title: "الدعوة والإرشاد",
    description: "تطوير مهارات الدعوة والإرشاد والتواصل الفعال في المجتمع.",
    duration: "4 سنوات",
    level: "بكالوريوس",
  },
];

export default function CoursesClient() {
  const [filter, setFilter] = useState("all");

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.level === filter);

  return (
    <main dir="rtl">
      <section className="bg-[#e3fae5] py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary text-center mb-12">
            البرامج الدراسية
          </h1>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-8">
              تقدم جامعة المروزي مجموعة متنوعة من البرامج الدراسية المصممة
              لتلبية احتياجات الطلاب وتطلعاتهم المستقبلية.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2.5 text-sm font-medium rounded-r-lg ${filter === "all" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                جميع البرامج
              </button>
              <button
                onClick={() => setFilter("بكالوريوس")}
                className={`px-5 py-2.5 text-sm font-medium ${filter === "بكالوريوس" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                بكالوريوس
              </button>
              <button
                onClick={() => setFilter("ماجستير")}
                className={`px-5 py-2.5 text-sm font-medium ${filter === "ماجستير" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                ماجستير
              </button>
              <button
                onClick={() => setFilter("دبلوم")}
                className={`px-5 py-2.5 text-sm font-medium rounded-l-lg ${filter === "دبلوم" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                دبلوم
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
