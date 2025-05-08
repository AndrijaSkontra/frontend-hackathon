"use client";

import { Button } from "./ui/button";
import { ScallopedImage } from "./ScallopedImage";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Define fixed shapes to avoid hydration errors
  const decorativeShapes = [
    { width: "150px", height: "150px", top: "10%", left: "5%", opacity: 0.7 },
    { width: "120px", height: "120px", top: "70%", left: "15%", opacity: 0.6 },
    { width: "100px", height: "100px", top: "30%", left: "85%", opacity: 0.5 },
    { width: "80px", height: "80px", top: "60%", left: "80%", opacity: 0.7 },
    { width: "130px", height: "130px", top: "20%", left: "40%", opacity: 0.6 },
    { width: "110px", height: "110px", top: "80%", left: "60%", opacity: 0.5 },
    { width: "90px", height: "90px", top: "40%", left: "20%", opacity: 0.7 },
    { width: "160px", height: "160px", top: "50%", left: "75%", opacity: 0.4 },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-300/70 via-orange-200/60 to-yellow-100/70" style={{ paddingBottom: "50px" } as React.CSSProperties}>
      {/* Decorative shapes - now using fixed values */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        {decorativeShapes.map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-orange-400/70 blur-lg"
            style={{
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: shape.left,
              opacity: shape.opacity,
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