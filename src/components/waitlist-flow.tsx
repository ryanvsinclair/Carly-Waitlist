"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LaunchUpdatesState = "idle" | "form" | "success";
type Audience = "buyer" | "dealer";

interface WaitlistFlowProps {
  isActivated?: boolean;
}

export function WaitlistFlow({ isActivated = false }: WaitlistFlowProps) {
  const [state, setState] = useState<LaunchUpdatesState>("idle");
  const [audience, setAudience] = useState<Audience>("buyer");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const handleGetUpdatesClick = () => {
    setState("form");
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    if (!name.trim()) {
      setError(
        audience === "dealer" ? "Dealership is required" : "Name is required",
      );
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("waitlist_signups")
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: audience,
          source: "coming-soon",
        });

      if (insertError) {
        if (insertError.code === "23505") {
          setError("You're already signed up.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }

      setState("success");
      setEmail("");
      setName("");
    } catch (err) {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setState("idle");
    setError("");
    setEmail("");
    setName("");
  };

  if (state === "success") {
    return (
      <div className="pt-4 animate-fade-in">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">You're all set.</p>
          <p className="text-sm text-muted-foreground">
            We'll send you {audience === "buyer" ? "buyer" : "dealer"}
            -focused launch updates.
          </p>
        </div>
      </div>
    );
  }

  if (state === "form") {
    return (
      <div className="pt-8 animate-fade-slide-in">
        <div className="max-w-md mx-auto">
          {/* Premium form container */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.24)] border border-border/20">
            {/* Shopper / Dealer Toggle */}
            <div className="mb-8">
              <div className="relative bg-background/40 rounded-xl p-1 inline-flex w-full max-w-xs mx-auto overflow-hidden">
                {/* Animated gradient background layer */}
                <div
                  className="absolute inset-y-1 w-[calc(50%-2px)] bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 rounded-lg shadow-sm transition-all duration-300 ease-in-out"
                  style={{
                    left: audience === "buyer" ? "4px" : "calc(50% + 2px)",
                  }}
                />

                {/* Toggle buttons */}
                <button
                  type="button"
                  onClick={() => setAudience("buyer")}
                  className={`relative z-10 flex-1 py-2.5 px-4 text-sm font-medium transition-colors duration-200 ${
                    audience === "buyer"
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setAudience("dealer")}
                  className={`relative z-10 flex-1 py-2.5 px-4 text-sm font-medium transition-colors duration-200 ${
                    audience === "dealer"
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dealer
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email-input"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-0.5"
                >
                  <span
                    className={`inline-block transition-opacity duration-300 ${audience === "dealer" ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
                  >
                    Dealer{" "}
                  </span>
                  {audience === "dealer" ? "" : " "} Email Address
                </label>
                <Input
                  id="email-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12 bg-background/60 border-border/40 rounded-xl focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name-input"
                  className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-0.5"
                >
                  {audience === "dealer" ? (
                    <span className="inline-block animate-fade-in">
                      Dealership
                    </span>
                  ) : (
                    <span className="inline-block animate-fade-in">Name</span>
                  )}
                </label>
                <Input
                  id="name-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="h-12 bg-background/60 border-border/40 rounded-xl focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10 dark:focus:ring-purple-400/10 transition-all duration-200"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center mt-5">{error}</p>
            )}

            <div className="flex gap-3 mt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={isSubmitting}
                className="h-11 px-5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent transition-all duration-200"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-500/30 dark:hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.99]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <Button
        size="lg"
        onClick={handleGetUpdatesClick}
        tabIndex={isActivated ? 0 : -1}
        className={`h-12 px-8 text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all duration-300 hover:scale-[0.98] ${
          isActivated
            ? "opacity-100 hover:opacity-90"
            : "opacity-60 hover:opacity-70"
        }`}
      >
        Get Launch Updates
      </Button>
    </div>
  );
}
