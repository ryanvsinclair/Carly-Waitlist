"use client";

import { useState, useEffect, useRef } from "react";
import { LoggedOutNav } from "@/components/navigation/logged-out-nav";
import { CarlyFooter } from "@/components/navigation/carly-footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaitlistFlow } from "@/components/waitlist-flow";
import {
  Users,
  Shield,
  Brain,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Gauge,
  Calendar,
  Wrench,
  Award,
  TrendingUp,
} from "lucide-react";

export default function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ctaActivated, setCtaActivated] = useState(false);
  const whyCarlyRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivation = () => {
      if (!ctaActivated) {
        setCtaActivated(true);
      }
    };

    const handleScroll = () => {
      if (ctaActivated) return;

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= 30) {
        handleActivation();
        return;
      }

      if (whyCarlyRef.current) {
        const rect = whyCarlyRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          handleActivation();
        }
      }
    };

    timeoutId = setTimeout(() => {
      handleActivation();
    }, 7000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ctaActivated]);

  // Card data
  const cards = [
    {
      title: "Personalized Browse",
      description:
        "Shop your way — instantly. A tailored experience at the toggle of a button. No more listings that don't match you. Carly cuts the noise and highlights what actually fits.",
      outcome: "Outcome: Faster shortlists. Fewer dead clicks.",
      icon: Sparkles,
    },
    {
      title: "My Garage",
      description:
        "Your cars. Your saves. One place. Save listings, upload your personal vehicles, see live market values, and publish to the marketplace in one click whenever you're ready.",
      outcome: "Outcome: You're always one step from selling or trading.",
      icon: Gauge,
    },
    {
      title: "Instant Appointments",
      description:
        "Pick a time. Show up. Schedule a test drive or appointment directly from the listing. No calls. No hold music. Choose a date. Choose a time. Done.",
      outcome: "Outcome: Real momentum doesn't wait.",
      icon: Calendar,
    },
    {
      title: "Instant Service Booking",
      description:
        "Need service? Get slots - Not voicemail. Submit a service request and receive available time slots at service centers near you—without calling five places.",
      outcome: "Outcome : Faster fixes. Less guessing.",
      icon: Wrench,
    },
    {
      title: "Dealer Reputation",
      description:
        "Trust - built like a receipt. Carly breaks reviews down step-by-step based on the real experience — No fake inflation. Reviews are dual-confirmed to keep them honest.",
      outcome: "Outcome : Confidence before you get there.",
      icon: Award,
    },
    {
      title: "Listing Metrics",
      description:
        "Know what's real — and what's been recycled. Live view and save count. Track what's trending and what's stalling.",
      outcome: "Outcome: Better timing. Smarter decisions.",
      icon: TrendingUp,
    },
    {
      title: "VIN Timeline",
      description:
        "Know what's real — and what's been recycled. See when a listing first appeared - each VIN is date and time tagged. Understand when it was first listed and all that has happened since.",
      outcome: "Outcome: Clear history at a glance.",
      icon: TrendingUp,
    },
  ];

  // Reveal cards when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !cardsVisible) {
            setCardsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    if (cardsContainerRef.current) {
      observer.observe(cardsContainerRef.current);
    }

    return () => observer.disconnect();
  }, [cardsVisible]);

  // Scroll sync - update active card based on viewport center
  useEffect(() => {
    if (!cardsVisible) return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2 + window.scrollY;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2 + window.scrollY;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeCardIndex) {
        setActiveCardIndex(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardsVisible, activeCardIndex]);

  // Handle Next button click
  const handleNextCard = () => {
    if (activeCardIndex < cards.length - 1) {
      const nextIndex = activeCardIndex + 1;
      setActiveCardIndex(nextIndex);

      // Smooth scroll to center next card in viewport
      const nextCard = cardRefs.current[nextIndex];
      if (nextCard) {
        const rect = nextCard.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const scrollOffset = cardCenter - viewportCenter;

        window.scrollBy({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      className={`carly-gradient-bg min-h-screen flex flex-col transition-all ease-out ${
        isLoaded
          ? "opacity-100 scale-100 duration-[400ms]"
          : "opacity-0 scale-[1.02] duration-0"
      }`}
    >
      <LoggedOutNav />
      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:drop-shadow-[0_0_12px_rgba(139,92,246,0.35)]">
            The first marketplace built for both sides of the deal.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-accent">
            Carly breaks down the walls between buyers and dealers — making car
            buying transparent, intelligent, and human again.
          </p>
        </div>
      </section>
      {/* Value Proposition - Three Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dual-Sided */}
            <Card className="card-lift rounded-xl border bg-card shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-medium tracking-tight">
                  Dual-Sided by Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Buyers and dealers operate in the same ecosystem — no shadows,
                  no lead reselling, no games.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Built on Trust */}
            <Card className="card-lift rounded-xl border bg-card shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-medium tracking-tight">
                  Built on Trust, Not Tricks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Transparent pricing, verified listings, real data — no
                  bait-and-switch.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Intelligent */}
            <Card className="card-lift rounded-xl border bg-card shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-indigo-500" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-medium tracking-tight">
                  Intelligent by Default
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Carly learns what matters to you and cuts through the noise
                  automatically.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Why Carly Exists Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8 text-center">
            Why Carly Exists
          </h2>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Current car marketplaces are broken. Buyers don't trust them
              because they're built to generate leads, not facilitate honest
              transactions. Dealers are buried in noise — low-quality inquiries,
              tire-kickers, and platforms that treat them as profit centers
              rather than partners.
            </p>

            <p>
              The result? A system where everyone loses. Buyers feel
              manipulated. Dealers waste time. And the industry keeps spinning
              the same tired playbook.
            </p>

            <p>
              Carly was built differently. It's not another classifieds site.
              It's not another lead-farm. It's a dual-sided marketplace designed
              to break down the walls that keep buyers and dealers apart —
              creating a transparent, intelligent space where both sides can
              operate with confidence.
            </p>
          </div>
        </div>
      </section>
      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-4xl mx-auto" />
      {/* Why Carly Section - Guided Spotlight Walkthrough */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2
              ref={whyCarlyRef}
              className="text-4xl md:text-5xl font-light tracking-tight mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Less noise. More certainty.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Carly is built around the moments that usually waste your time —
              browsing, booking, trusting, and deciding.
            </p>
          </div>

          {/* Cards Container */}
          <div ref={cardsContainerRef} className="space-y-16">
            {cards.map((card, index) => {
              const isActive = activeCardIndex === index;
              const isInactive = activeCardIndex !== index && cardsVisible;
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  id={index === 0 ? "personalized-browse-card" : undefined}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`relative transition-all duration-700 ease-out ${
                    cardsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  } ${isInactive ? "opacity-50" : ""}`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Radial glow behind card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl rounded-3xl" />
                  )}
                  <div
                    className={`relative bg-card backdrop-blur-sm rounded-3xl p-10 md:p-12 transition-all duration-500 border-2 ${
                      isActive
                        ? "shadow-2xl shadow-purple-500/20 scale-[1.01] border-transparent bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10"
                        : "shadow-sm border-border/50"
                    }`}
                  >
                    <div className="space-y-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-blue-500" />
                        </div>
                        <h3
                          className={`text-3xl md:text-4xl font-medium tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent transition-all duration-400 ${
                            isActive ? "opacity-100" : "opacity-80"
                          }`}
                        >
                          {card.title}
                        </h3>
                      </div>

                      <p
                        className={`text-base md:text-lg leading-relaxed transition-all duration-400 ${
                          isActive ? "text-foreground/90" : "text-foreground/70"
                        }`}
                      >
                        {card.description}
                      </p>

                      <p
                        className={`text-sm md:text-base transition-all duration-400 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium ${
                          isActive ? "opacity-100" : "opacity-70"
                        }`}
                      >
                        {card.outcome}
                      </p>

                      {/* Next button - only on active card */}
                      {isActive && activeCardIndex < cards.length - 1 && (
                        <div className="pt-4">
                          <Button
                            onClick={handleNextCard}
                            variant="ghost"
                            size="lg"
                            className="group text-base font-medium transition-all duration-300 hover:bg-blue-500/10"
                          >
                            Next
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-4xl mx-auto" />
      {/* Status / Roadmap Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              Carly is currently in private development.
            </h2>
            <p className="text-lg text-muted-foreground">
              Public access is coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-8">
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm">Verified listings</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-sm">Personalized browsing</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span className="text-sm">Direct buyer-dealer interaction</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <span className="text-sm">No lead selling</span>
            </div>
          </div>

          {/* Waitlist CTA */}
          <div className="pt-8">
            <WaitlistFlow isActivated={ctaActivated} />
          </div>
        </div>
      </section>
      <CarlyFooter />
    </div>
  );
}
