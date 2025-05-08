"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "w-full py-6 px-8 flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/90 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-2xl font-bold text-primary">
          <span className="mr-2">🎓</span>
          <span>CampusConnect</span>
        </Link>

        <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
          <Link href="/events" className="text-foreground hover:text-primary transition-colors font-medium">
            Events
          </Link>
          <Link href="/study" className="text-foreground hover:text-primary transition-colors font-medium">
            Study
          </Link>
          <Link href="/jobs" className="text-foreground hover:text-primary transition-colors font-medium">
            Jobs
          </Link>
          <Link href="/dining" className="text-foreground hover:text-primary transition-colors font-medium">
            Food
          </Link>
        </nav>

        <div>
          {isLoggedIn ? (
            <Button variant="default" className="rounded-full px-6">Dashboard</Button>
          ) : (
            <Button variant="default" className="rounded-full px-6">Login</Button>
          )}
        </div>
      </div>
    </header>
  );
} 