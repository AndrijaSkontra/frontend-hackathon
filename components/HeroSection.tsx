"use client";

import { Button } from "./ui/button";
import { ScallopedImage } from "./ScallopedImage";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-300/70 via-orange-200/60 to-yellow-100/70" style={{ paddingBottom: "50px" } as React.CSSProperties}>
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/70 blur-lg"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-28 md:pt-40">
        <div className="container mx-auto px-6 flex flex-col items-center text-center mb-12">
          <div className="inline-block bg-black/80 text-yellow-300 font-medium text-sm py-2 px-4 rounded-full mb-8">
            STUDENT LIFE AND MORE
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="block text-black">Never miss any of</span>
            <span className="block text-black">your campus events</span>
          </h1>

          <p className="text-black/80 font-medium text-lg md:text-xl max-w-3xl mb-12">
            Connect with fellow students, find study groups, discover job opportunities, 
            and stay updated on campus events and dining options all in one place!
          </p>

          <Button size="lg" className="text-lg mb-8 rounded-full px-8 py-6 bg-black text-white hover:bg-black/90">
            Get Started
          </Button>
        </div>
        
        {/* Full width scalloped image */}
        <div className="w-full px-0 -mb-16 ">
          <ScallopedImage 
            imageSrc="/student_dashboard.jpg" 
            className="w-full"
            height={280}
          />
        </div>
      </div>
    </section>
  );
} 