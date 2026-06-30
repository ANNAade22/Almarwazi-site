"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealDirection = "left" | "right" | "up";

const hiddenOffset: Record<RevealDirection, string> = {
  left: "-translate-x-14",
  right: "translate-x-14",
  up: "translate-y-9",
};

/** One observer per section — avoids dozens of Framer Motion scroll listeners. */
export function useSectionReveal(threshold = 0.6) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

type RevealProps = {
  visible: boolean;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  children: ReactNode;
};

/** GPU-only transform + opacity — keeps hover transforms on inner elements. */
export function Reveal({
  visible,
  direction = "up",
  delay = 0,
  className,
  children,
}: RevealProps) {
  return (
    <div
      className={cn(
        "transform-gpu transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0",
        visible ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", hiddenOffset[direction]),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
