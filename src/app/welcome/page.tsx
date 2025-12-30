"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Fade in headline
    const timer1 = setTimeout(() => setStep(1), 300);
    // Fade in first part of subheadline
    const timer2 = setTimeout(() => setStep(2), 1100);
    // Fade in second part of subheadline
    const timer3 = setTimeout(() => setStep(3), 1900);
    // Enable click-anywhere interaction
    const timer4 = setTimeout(() => setStep(4), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && step === 4) {
        handleProceed();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [step]);

  const handleProceed = () => {
    setStep(5); // Trigger fade out
    setTimeout(() => {
      router.push("/main");
    }, 300);
  };

  const handleClick = () => {
    if (step === 4) {
      handleProceed();
    }
  };

  return (
    <div
      className={`carly-gradient-bg min-h-screen flex items-center justify-center px-4 transition-all ease-out ${
        step === 4 ? "cursor-pointer" : "cursor-default"
      } ${step === 5 ? "opacity-0 scale-[0.96] duration-300" : "opacity-100 scale-100 duration-0"}`}
      onClick={handleClick}
    >
      <div className="max-w-3xl mx-auto text-center space-y-8 pointer-events-none">
        {/* Headline */}
        <h1
          className={`text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:drop-shadow-[0_0_12px_rgba(139,92,246,0.35)] transition-all duration-700 ${
            step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Welcome to Carly
        </h1>

        {/* Subheadline - Two-Part Reveal */}
        <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed space-y-2">
          <p
            className={`transition-all duration-700 ease-out ${
              step >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            Car shopping without all the noise.
          </p>
          <p
            className={`transition-all duration-700 ease-out ${
              step >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            Because we all deserve to make the best decision.
          </p>
        </div>
      </div>

      {/* Click Anywhere Hint */}
      <div
        className={`fixed bottom-8 left-0 right-0 text-center transition-all duration-700 pointer-events-none ${
          step === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-base md:text-lg text-muted-foreground/60 animate-pulse-glow">
          Click anywhere to enter
        </p>
      </div>
    </div>
  );
}
