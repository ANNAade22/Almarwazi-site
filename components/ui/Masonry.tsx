"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTransition, a } from "@react-spring/web";
import Image from "next/image";

interface MasonryItem {
  id: string | number;
  height: number;
  image: string;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MasonryProps {
  data: MasonryItem[];
}

function Masonry({ data }: MasonryProps) {
  const [columns, setColumns] = useState<number>(2);

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        setColumns(4);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setColumns(3);
      } else if (window.matchMedia("(min-width: 480px)").matches) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [heights, gridItems] = useMemo<[number[], GridItem[]]>(() => {
    const heights = new Array(columns).fill(0);
    const gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height / 2.5) - child.height / 2.5;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2.5,
      };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div
      ref={ref}
      className="relative w-full h-full mx-auto"
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div
          style={style}
          className="absolute p-2 sm:p-3 lg:p-4 [will-change:transform,width,height,opacity] left-2 transform -translate-x-1/2"
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-105">
            <Image
              src={item.image}
              alt="Gallery image"
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/campus-life.jpg";
                target.onerror = null;
              }}
            />
          </div>
        </a.div>
      ))}
    </div>
  );
}

export default Masonry;
