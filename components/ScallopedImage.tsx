"use client";

import { cn } from "@/lib/utils";
import { useId, useRef, useEffect, useState } from "react";

interface ScallopedImageProps {
  imageSrc: string;
  className?: string;
  height?: number;
  parallaxStrength?: number;
}

export function ScallopedImage({
  imageSrc,
  className,
  height = 300,
  parallaxStrength = 0.2,
}: ScallopedImageProps) {
  const clipPathId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleParallax = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const viewportPosition =
        (rect.top + rect.height / 2 - viewportHeight / 2) /
        (viewportHeight / 2);

      // Calculate parallax offset based on viewportPosition
      const offset = viewportPosition * parallaxStrength * 100;
      setParallaxOffset(offset);
    };

    // Add scroll and resize event listeners
    window.addEventListener("scroll", handleParallax, { passive: true });
    window.addEventListener("resize", handleParallax, { passive: true });

    // Initial calculation
    handleParallax();

    return () => {
      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("resize", handleParallax);
    };
  }, [parallaxStrength]);

  // Return a simplified version during server rendering
  if (!isMounted) {
    return (
      <div
        className={cn("relative w-full overflow-hidden", className)}
        style={{ height: `${height}px` }}
      >
        <div className="w-full h-full bg-gradient-to-br from-white to-gray-100"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div
        className="w-full overflow-hidden bg-gradient-to-br from-white to-gray-100 shadow-xl"
        style={{
          clipPath: `url(#${clipPathId})`,
          height: `${height}px`,
        }}
      >
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Student life"
          className="w-full object-cover block transition-transform duration-300 ease-out"
          style={{
            height: `${height + Math.abs(parallaxStrength * 100)}px`,
            objectPosition: "center 30%",
            transform: `translateY(${parallaxOffset - 20}px)`,
            willChange: "transform",
          }}
        />

        {/* SVG definitions for clip path */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
              <path
                d={`
                  M0,0.02 
                  C0.05,0.06 0.1,0.02 0.15,0.08 
                  C0.2,0.14 0.25,0.06 0.3,0.04 
                  C0.35,0.02 0.4,0.12 0.45,0.08 
                  C0.5,0.04 0.55,0.02 0.6,0.06 
                  C0.65,0.1 0.7,0.02 0.75,0.06 
                  C0.8,0.1 0.85,0.04 0.9,0.08 
                  C0.95,0.12 1,0.02 1,0.02 
                  L1,0.98 
                  C0.95,0.94 0.9,0.98 0.85,0.94 
                  C0.8,0.9 0.75,0.98 0.7,0.94 
                  C0.65,0.9 0.6,0.98 0.55,0.96 
                  C0.5,0.94 0.45,0.9 0.4,0.94 
                  C0.35,0.98 0.3,0.94 0.25,0.98 
                  C0.2,1.02 0.15,0.96 0.1,0.98 
                  C0.05,1 0,0.96 0,0.96 
                  L0,0.02 Z
                `}
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
