"use client";

import React from "react";
import { Card } from "./ui/card";

const eventCategories = [
  "PARTIES", "STUDY GROUPS", "WORKSHOPS", "SPORTS", 
  "CAMPUS EVENTS", "DINING", "JOBS", "CLUBS"
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50 relative z-10 pt-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-300 text-black font-medium text-sm py-1 px-3 rounded-full mb-6">
            COUNTLESS CAMPUS ACTIVITIES
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">With CampusConnect, you no longer</span>
            <span className="block mt-2">need to worry about</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-full md:w-2/5">
            <div className="relative max-w-sm mx-auto">
              {/* Phone mockup - improved UI based on reference image */}
              <div className="bg-[#f9f9f2] border-4 border-foreground/10 rounded-[40px] p-5 shadow-xl">
                <div className="rounded-3xl overflow-hidden border border-border bg-white">
                  <div className="bg-white px-5 py-4 flex items-center justify-between border-b">
                    <div className="text-xl font-bold">14</div>
                    <div className="text-sm font-medium text-gray-600">My events</div>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full bg-black"></div>
                        <div className="h-3 rounded-full bg-gray-200 w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Circular icons around phone - using better icons based on reference image */}
              <div className="absolute -top-4 -left-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                🎂
              </div>
              <div className="absolute bottom-20 -right-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                🌴
              </div>
              <div className="absolute top-32 -right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center">
                🎟️
              </div>
              <div className="absolute bottom-0 -left-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center">
                🏠
              </div>
              <div className="absolute top-1/2 -left-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                📍
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 flex items-center justify-center">
            <div className="flex flex-wrap justify-center gap-4 max-w-xl">
              {eventCategories.map((category, i) => (
                <div 
                  key={i} 
                  className="rounded-full py-2 px-5 text-center text-sm font-medium"
                  style={{
                    backgroundColor: `hsl(${(i * 40) % 360}, 80%, 85%)`,
                    color: `hsl(${(i * 40) % 360}, 80%, 25%)`,
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 