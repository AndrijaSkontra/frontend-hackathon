"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { UserAvatar } from "./UserAvatar";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Extract the locale from the pathname
  const locale = pathname?.split('/')[1] || 'en';

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use a safe default (non-scrolled state) during SSR
  const headerClasses = cn(
    "w-full py-6 px-8 flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    mounted && scrolled
      ? "bg-background/90 backdrop-blur-sm shadow-sm"
      : "bg-transparent",
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="flex items-center text-2xl font-bold text-primary"
        >
          <span className="mr-2">🎓</span>
          <span>CampusConnect</span>
        </Link>

        <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
          <Link 
            href={`/${locale}/posts`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium",
              pathname?.includes('/posts')
                ? "bg-black/10 text-primary" 
                : "text-foreground hover:text-primary"
            )}
          >
            <span className="text-lg">📝</span>
            <span>Postings</span>
          </Link>
          <Link 
            href={`/${locale}/cafeteria`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-colors font-medium",
              pathname?.includes('/cafeteria')
                ? "bg-black/10 text-primary" 
                : "text-foreground hover:text-primary"
            )}
          >
            <span className="text-lg">🍽️</span>
            <span>Cafeteria</span>
          </Link>
        </nav>

        <div>
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
