"use client";

import React from "react";
import { Card } from "./ui/card";

const eventCategories = [
  { name: "PARTIES", icon: "🎉", color: "bg-pink-100 text-pink-800" },
  { name: "STUDY GROUPS", icon: "📚", color: "bg-blue-100 text-blue-800" },
  { name: "WORKSHOPS", icon: "🛠️", color: "bg-purple-100 text-purple-800" },
  { name: "SPORTS", icon: "⚽", color: "bg-green-100 text-green-800" },
  { name: "CAMPUS EVENTS", icon: "🎭", color: "bg-amber-100 text-amber-800" },
  { name: "DINING", icon: "🍽️", color: "bg-red-100 text-red-800" },
  { name: "JOBS", icon: "💼", color: "bg-indigo-100 text-indigo-800" },
  { name: "CLUBS", icon: "👥", color: "bg-teal-100 text-teal-800" },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50 relative z-10 pt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-black/80 text-yellow-300 font-medium text-sm py-2 px-4 rounded-full mb-6">
            COUNTLESS CAMPUS ACTIVITIES
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="block">With CampusConnect, you no longer</span>
            <span className="block mt-2">need to worry about</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Phone mockup */}
          <div className="w-full md:w-2/5">
            <div className="relative max-w-sm mx-auto transform transition-all hover:scale-105 duration-300">
              <div className="bg-[#f9f9f2] border-4 border-foreground/10 rounded-[40px] p-5 shadow-2xl">
                <div className="rounded-3xl overflow-hidden border border-border bg-white">
                  <div className="bg-white px-5 py-4 flex items-center justify-between border-b">
                    <div className="text-xl font-bold">14</div>
                    <div className="text-sm font-medium text-gray-600">
                      My events
                    </div>
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

              {/* Circular icons around phone */}
              <div className="absolute -top-4 -left-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                🎂
              </div>
              <div className="absolute bottom-20 -right-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-pulse delay-300">
                🌴
              </div>
              <div className="absolute top-32 -right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-pulse delay-500">
                🎟️
              </div>
              <div className="absolute bottom-0 -left-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-pulse delay-700">
                🏠
              </div>
              <div className="absolute top-1/2 -left-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-pulse delay-100">
                📍
              </div>
            </div>
          </div>

          {/* Categories grid */}
          <div className="w-full md:w-3/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventCategories.map((category, i) => (
                <div
                  key={i}
                  className={`${category.color} rounded-xl py-4 px-3 text-center font-medium shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-sm">{category.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
