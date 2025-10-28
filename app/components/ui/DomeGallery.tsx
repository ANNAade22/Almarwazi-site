"use client";
import { useRef, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Image from "next/image";

interface DomeGalleryProps {
  images?: string[];
  className?: string;
}

export default function DomeGallery({
  images = [
    "/campus-life.jpg",
    "/campus-life.jpg",
    "/campus-life.jpg",
    "/campus-life.jpg",
    "/campus-life.jpg",
    "/campus-life.jpg",
  ],
  className = "",
}: DomeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spring animation for smooth transitions
  const [springs, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  // Drag gesture handler
  const bind = useDrag(
    ({ active, movement: [mx, my], direction: [xDir], velocity: [vx] }) => {
      setIsDragging(active);

      if (active) {
        // During drag, move the container
        api.start({
          x: mx,
          y: my,
          scale: 1.05,
          immediate: true,
        });
      } else {
        // When drag ends, snap to nearest image or return to center
        const threshold = 50;
        const velocityThreshold = 0.5;

        if (Math.abs(mx) > threshold || Math.abs(vx) > velocityThreshold) {
          if (xDir > 0 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          } else if (xDir < 0 && currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        }

        // Return to center
        api.start({
          x: 0,
          y: 0,
          scale: 1,
          immediate: false,
        });
      }
    },
    {
      axis: "x",
      bounds: { left: -200, right: 200 },
      rubberband: true,
    }
  );

  // Auto-rotate images
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isDragging, images.length]);

  return (
    <div
      className={`relative w-full h-[500px] overflow-hidden rounded-2xl ${className}`}
    >
      <animated.div
        ref={containerRef}
        {...bind()}
        style={springs}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Main center image */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={images[currentIndex]}
              alt={`جامعة المروزي - صورة ${currentIndex + 1}`}
              fill
              className="object-cover transition-all duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2">حرم جامعي متميز</h3>
              <p className="text-white/90">بيئة تعليمية ملهمة ومتطورة</p>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
              <span className="text-primary font-semibold text-sm">
                جامعة المروزي
              </span>
            </div>
          </div>
        </div>

        {/* Side images */}
        {images.map((image, index) => {
          if (index === currentIndex) return null;

          const offset = index - currentIndex;
          const isLeft = offset < 0;
          const distance = Math.abs(offset);

          return (
            <div
              key={index}
              className={`absolute top-1/2 -translate-y-1/2 w-32 h-32 rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300 ${
                isLeft ? "left-4" : "right-4"
              }`}
              style={{
                transform: `translateY(-50%) scale(${1 - distance * 0.1})`,
                zIndex: 10 - distance,
              }}
            >
              <Image
                src={image}
                alt={`جامعة المروزي - صورة ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          );
        })}

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Drag indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs">اسحب للتنقل</span>
        </div>
      </animated.div>
    </div>
  );
}
