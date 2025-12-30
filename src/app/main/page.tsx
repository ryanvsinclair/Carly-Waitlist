"use client";

import { useState, useEffect, useRef } from "react";
import { LoggedOutNav } from "@/components/navigation/logged-out-nav";
import { CarlyFooter } from "@/components/navigation/carly-footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WaitlistFlow } from "@/components/waitlist-flow";
import { Users, Shield, Brain, CheckCircle2 } from "lucide-react";

export default function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ctaActivated, setCtaActivated] = useState(false);
  const whyCarlyRef = useRef<HTMLHeadingElement>(null);

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
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ctaActivated]);

  return (
    <div className={`carly-gradient-bg min-h-screen flex flex-col transition-all ease-out ${
      isLoaded ? "opacity-100 scale-100 duration-[400ms]" : "opacity-0 scale-[1.02] duration-0"
    }`}>
      <LoggedOutNav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:drop-shadow-[0_0_12px_rgba(139,92,246,0.35)]">
            The first marketplace built for both sides of the deal.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Carly breaks down the walls between buyers and dealers — making car buying transparent, intelligent, and human again.
          </p>
          
          <WaitlistFlow isActivated={ctaActivated} />
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
                  Buyers and dealers operate in the same ecosystem — no shadows, no lead reselling, no games.
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
                  Transparent pricing, verified listings, real data — no bait-and-switch.
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
                  Carly learns what matters to you and cuts through the noise automatically.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Carly Exists Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 ref={whyCarlyRef} className="text-3xl md:text-4xl font-light tracking-tight mb-8 text-center">
            Why Carly Exists
          </h2>
          
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Current car marketplaces are broken. Buyers don't trust them because they're built to generate leads, not facilitate honest transactions. Dealers are buried in noise — low-quality inquiries, tire-kickers, and platforms that treat them as profit centers rather than partners.
            </p>
            
            <p>
              The result? A system where everyone loses. Buyers feel manipulated. Dealers waste time. And the industry keeps spinning the same tired playbook.
            </p>
            
            <p>
              Carly was built differently. It's not another classifieds site. It's not another lead-farm. It's a dual-sided marketplace designed to break down the walls that keep buyers and dealers apart — creating a transparent, intelligent space where both sides can operate with confidence.
            </p>
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
        </div>
      </section>

      <CarlyFooter />
    </div>
  );
}
