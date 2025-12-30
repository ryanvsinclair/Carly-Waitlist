"use client";

import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export function LoggedOutNav() {
  const handleMeetCarlyClick = () => {
    const firstCard = document.getElementById("personalized-browse-card");
    if (firstCard) {
      const rect = firstCard.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const scrollOffset = cardCenter - viewportCenter;

      window.scrollBy({
        top: scrollOffset + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 nav-with-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 transition-transform hover:scale-105 duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">C</span>
          </div>
          <span className="text-xl md:text-2xl font-light">Carly</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground"
              onClick={handleMeetCarlyClick}
            >
              Meet Carly
            </Button>
          </div>
          
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
