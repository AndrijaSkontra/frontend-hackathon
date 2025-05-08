"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

interface ScallopedImageProps {
  imageSrc: string;
  className?: string;
  height?: number;
}

export function ScallopedImage({
  imageSrc,
  className,
  height = 300,
}: ScallopedImageProps) {
  // Generate a stable ID for the clip-path
  const clipPathId = useId();

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Scalloped container with outline */}
      <div
        className="w-screen max-w overflow-hidden bg-gradient-to-br from-white to-gray-100 shadow-xl"
        style={{
          clipPath: `url(#${clipPathId})`,
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
          marginBottom: "-80px", // More overlap at the bottom
        }}
      >
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Student life"
          className="w-full object-cover block"
          style={{
            height: `${height}px`,
            objectPosition: "center 25%",
            width: "100%",
          }}
        />

        {/* SVG definitions for clip path */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id={clipPathId}>
              <path
                d="M0,10 
                C50,30 100,10 150,40 
                C200,70 250,30 300,20 
                C350,10 400,60 450,40 
                C500,20 550,10 600,30 
                C650,50 700,10 750,30 
                C800,50 850,20 900,40 
                C950,60 1000,10 1050,30 
                C1100,50 1150,20 1200,40 
                L1200,500 
                
                C1150,480 1100,510 1050,490 
                C1000,470 950,500 900,480 
                C850,460 800,500 750,480 
                C700,460 650,500 600,490 
                C550,480 500,450 450,480 
                C400,510 350,470 300,500 
                C250,530 200,490 150,510 
                C100,530 50,500 0,480 
                
                L0,10 Z"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
