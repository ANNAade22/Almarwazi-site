"use client";

import React, { useEffect, useState } from "react";
import CountUp from "../ui/CountUp";
import { GraduationCap, Users, Building2, UserCheck } from "lucide-react";

interface StatItem {
  number: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const UniversityStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats: StatItem[] = [
    {
      number: 15000,
      label: "طالب",
      icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      number: 450,
      label: "أستاذ",
      icon: <Users className="w-12 h-12 text-green-500" />,
      color: "from-green-500 to-green-600",
    },
    {
      number: 8,
      label: "حرم جامعي",
      icon: <Building2 className="w-12 h-12 text-purple-500" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      number: 1200,
      label: "موظف",
      icon: <UserCheck className="w-12 h-12 text-orange-500" />,
      color: "from-orange-500 to-orange-600",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section
      id="stats-section"
      className="section bg-gradient-to-br from-primary to-secondary py-16"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">إحصائيات الجامعة</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            أرقام تعكس حجم إنجازاتنا ومدى تطورنا في مجال التعليم العالي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stats-card rounded-2xl p-8 text-center transform transition-all duration-500 hover:scale-105"
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp
                  from={0}
                  to={stat.number}
                  separator=","
                  direction="up"
                  duration={2.5}
                  startWhen={isVisible}
                  className="count-up-text"
                />
                {stat.number >= 1000 && "+"}
              </div>
              <div className="text-lg text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 space-x-reverse text-white/80">
            <div className="w-12 h-0.5 bg-white/40"></div>
            <span className="text-sm font-medium">نحن فخورون بإنجازاتنا</span>
            <div className="w-12 h-0.5 bg-white/40"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityStats;
