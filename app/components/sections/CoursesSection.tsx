"use client";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Languages,
  ArrowLeft,
  Landmark,
  Scale,
  School,
  Library,
} from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";
import { Reveal, useSectionReveal, type RevealDirection } from "../ui/ScrollReveal";

const programIcons = [GraduationCap, BookOpen, Languages];
const collegeIcons = [Landmark, Scale, School, Library];

const collegeDirections: RevealDirection[] = ["right", "left", "right", "left"];

export default function CoursesSection() {
  const { ref, isVisible } = useSectionReveal();
  const [firstProgram, ...restPrograms] = universityContent.programs;
  const collegeTints = [
    "bg-[#eaf4ec]",
    "bg-[#faf4e3]",
    "bg-[#eef3f1]",
    "bg-[#f4eee2]",
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal visible={isVisible} direction="up" className="mb-8 md:mb-10">
          <div ref={ref}>
            <SectionHeading
              eyebrow="مراحلها وأقسامها"
              title="برامج الجامعة وأقسامها"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[200px] max-w-6xl mx-auto">
          <Reveal
            visible={isVisible}
            direction="right"
            delay={80}
            className="col-span-2 md:row-span-2"
          >
            <Link
              href={`/courses#${firstProgram.id}`}
              className="group relative flex h-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-7 md:p-8 text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500"
            >
              <GraduationCap className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 text-white/10 transition-transform duration-500 group-hover:rotate-6" />
              <div className="relative flex h-full flex-col">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <GraduationCap className="h-7 w-7 text-accent-light" />
                </div>
                <span className="mb-2 text-sm font-semibold text-accent-light">
                  {firstProgram.order}
                </span>
                <h3 className="mb-3 text-2xl md:text-3xl font-bold leading-tight">
                  {firstProgram.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-white/85">
                  {firstProgram.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent-light">
                  التفاصيل
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {restPrograms.map((program, index) => {
            const Icon = programIcons[index + 1] || GraduationCap;
            return (
              <Reveal
                key={program.id}
                visible={isVisible}
                direction="left"
                delay={160 + index * 100}
                className="col-span-2"
              >
                <Link
                  href={`/courses#${program.id}`}
                  className="group relative flex h-full overflow-hidden rounded-3xl bg-sand p-6 border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500"
                >
                  <Icon className="pointer-events-none absolute -top-4 -left-4 h-28 w-28 text-accent/10" />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-xs font-semibold text-accent">
                        {program.order}
                      </span>
                    </div>
                    <h3 className="mb-1.5 text-lg font-bold text-primary leading-snug">
                      {program.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
                      {program.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          {universityContent.colleges.map((college, index) => {
            const Icon = collegeIcons[index] || Library;
            return (
              <Reveal
                key={college.id}
                visible={isVisible}
                direction={collegeDirections[index]}
                delay={320 + index * 90}
              >
                <Link
                  href={`/courses#${college.id}`}
                  className={`group relative flex h-full overflow-hidden rounded-3xl ${collegeTints[index]} p-5 border border-primary/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[box-shadow,transform] duration-500`}
                >
                  <Icon className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 text-primary/5 transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 shadow-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-primary leading-snug">
                      {college.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                      التفاصيل
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal visible={isVisible} direction="up" delay={550} className="text-center mt-8 md:mt-10">
          <Link
            href="/courses"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg text-base font-semibold hover:bg-primary-light transition-colors"
          >
            عرض جميع البرامج
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
