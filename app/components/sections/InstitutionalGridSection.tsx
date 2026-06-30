"use client";
import {
  Compass,
  Flag,
  BookMarked,
  GraduationCap,
  Languages,
  Users,
  MonitorSmartphone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, useSectionReveal, type RevealDirection } from "../ui/ScrollReveal";

const featureMeta = [
  { icon: GraduationCap, title: "منهج تعليمي قوي" },
  { icon: BookMarked, title: "كادر من المدينة المنورة" },
  { icon: Languages, title: "التدريس باللغة العربية" },
  { icon: Users, title: "فصل تام بين الطلاب" },
  { icon: MonitorSmartphone, title: "أنظمة دراسية مرنة" },
];

const featureDirections: RevealDirection[] = [
  "left",
  "left",
  "right",
  "right",
  "up",
];

export default function InstitutionalGridSection() {
  const { ref, isVisible } = useSectionReveal();

  const features = universityContent.features.map((text, i) => ({
    ...featureMeta[i],
    text,
  }));

  const featureLayout = [
    { index: 2, span: "col-span-1" },
    { index: 3, span: "col-span-1" },
    { index: 0, span: "col-span-1" },
    { index: 1, span: "col-span-1" },
    { index: 4, span: "col-span-2" },
  ];

  const tints = [
    "bg-[#eaf4ec]",
    "bg-[#faf4e3]",
    "bg-[#eef3f1]",
    "bg-[#f4eee2]",
    "bg-[#eaf4ec]",
  ];

  return (
    <section className="py-12 md:py-16 bg-[#e3fae5]">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal visible={isVisible} direction="up" className="mb-8 md:mb-10">
          <div ref={ref}>
            <SectionHeading
              eyebrow="رؤيتها ورسالتها وميزاتها"
              title="من نحن ولماذا نحن"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[210px] max-w-6xl mx-auto">
          <Reveal
            visible={isVisible}
            direction="right"
            delay={80}
            className="col-span-2 md:row-span-2"
          >
            <div className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-7 md:p-8 text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500">
              <Compass className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 text-white/10 transition-transform duration-500 group-hover:rotate-12" />
              <div className="relative flex h-full flex-col">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <Compass className="h-7 w-7 text-accent-light" />
                </div>
                <h3 className="mb-3 text-2xl md:text-3xl font-bold leading-tight">
                  الرؤية
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-white/85">
                  {universityContent.vision}
                </p>
                <span className="mt-auto inline-block h-1 w-14 rounded-full bg-accent-light" />
              </div>
            </div>
          </Reveal>

          <Reveal
            visible={isVisible}
            direction="left"
            delay={160}
            className="col-span-2"
          >
            <div className="group relative h-full overflow-hidden rounded-3xl bg-sand p-6 md:p-7 border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500">
              <Flag className="pointer-events-none absolute -top-4 -left-4 h-28 w-28 text-accent/10" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
                    <Flag className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary">الرسالة</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 line-clamp-3">
                  {universityContent.mission}
                </p>
              </div>
            </div>
          </Reveal>

          {featureLayout.map(({ index, span }, layoutIndex) => {
            const feature = features[index];
            const Icon = feature.icon || BookMarked;
            return (
              <Reveal
                key={index}
                visible={isVisible}
                direction={featureDirections[index]}
                delay={240 + layoutIndex * 90}
                className={span}
              >
                <div
                  className={`group relative h-full overflow-hidden rounded-3xl ${tints[index]} p-5 md:p-6 border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500`}
                >
                  <Icon className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 text-primary/5 transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 shadow-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-1.5 text-base md:text-lg font-bold text-primary leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal visible={isVisible} direction="up" delay={580} className="mt-6 md:mt-8 flex justify-center">
          <Link
            href="/about"
            className="group inline-flex flex-col items-center text-center gap-4 rounded-3xl bg-gradient-to-l from-accent to-accent-light px-8 py-7 md:px-12 md:py-8 text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-xl w-full"
          >
            <div>
              <h3 className="text-lg md:text-xl font-bold">تعرّف أكثر على جامعتنا</h3>
              <p className="mt-2 text-sm md:text-base text-white/85 leading-relaxed">
                اكتشف رؤيتنا ورسالتنا وقيمنا التعليمية بالتفصيل
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-2.5 font-semibold backdrop-blur-sm transition-colors group-hover:bg-white/30">
              من نحن
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
