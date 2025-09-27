"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";

export const InfiniteMovingMarquee = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { src: string; alt?: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  // Memoize animation duration based on speed
  const animationDuration = useMemo(() => {
    switch (speed) {
      case "fast": return "20s";
      case "normal": return "40s";
      case "slow": return "80s";
      default: return "20s";
    }
  }, [speed]);

  // Memoize animation direction
  const animationDirection = useMemo(() => {
    return direction === "left" ? "forwards" : "reverse";
  }, [direction]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Only add duplicates if not already added
      if (scrollerContent.length === items.length) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
      }

      // Set CSS custom properties
      containerRef.current.style.setProperty("--animation-direction", animationDirection);
      containerRef.current.style.setProperty("--animation-duration", animationDuration);

      setStart(true);
    }
  }, [items.length, animationDirection, animationDuration]);

  useEffect(() => {
    // Use requestAnimationFrame for smoother initialization
    const timer = requestAnimationFrame(() => {
      addAnimation();
    });

    return () => cancelAnimationFrame(timer);
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.src}-${idx}`} // Better key using src
            className="relative w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] md:w-[400px] md:h-[260px] max-w-full shrink-0 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700"
          >
            <Image
              src={item.src}
              alt={item.alt || `testimonial-${idx + 1}`}
              width={400}
              height={260}
              className="w-full h-full object-cover"
              loading="lazy"
              quality={85}
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 400px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuw9moP//Z"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};