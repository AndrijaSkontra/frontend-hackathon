"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Call once to set initial state
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-sm border-b border-gray-200"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-xl font-bold ${!scrolled && "text-black"}`}>
              🎓 Campus<span className="text-amber-500">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/posts"
              className={`hover:text-black transition-colors ${
                scrolled ? "text-gray-600" : "text-black hover:text-gray-200"
              }`}
            >
              Posts
            </Link>
            <Link
              href="/cafeteria"
              className={`hover:text-black transition-colors ${
                scrolled ? "text-gray-600" : "text-black hover:text-gray-200"
              }`}
            >
              Cafeteria
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button
                variant={scrolled ? "outline" : "secondary"}
                className={`rounded-full bg-orange-500 hover:bg-orange-600 text-white ${
                  !scrolled && "border-white/30"
                }`}
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className={!scrolled ? "text-white" : ""} />
            ) : (
              <Menu size={24} className={!scrolled ? "text-white" : ""} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-6 flex flex-col gap-4">
            <Link
              href="/posts"
              className="py-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Posts
            </Link>
            <Link
              href="/cafeteria"
              className="py-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cafeteria
            </Link>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
