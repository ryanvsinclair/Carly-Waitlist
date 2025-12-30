"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type WaitlistState = 'idle' | 'choose-role' | 'buyer-form' | 'dealer-form' | 'success';

interface WaitlistFlowProps {
  isActivated?: boolean;
}

export function WaitlistFlow({ isActivated = false }: WaitlistFlowProps) {
  const [state, setState] = useState<WaitlistState>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleJoinClick = () => {
    setState('choose-role');
  };

  const handleRoleSelect = (role: 'buyer' | 'dealer') => {
    setState(role === 'buyer' ? 'buyer-form' : 'dealer-form');
    setError('');
  };

  const handleSubmit = async (role: 'buyer' | 'dealer') => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('waitlist_signups')
        .insert({
          email: email.trim().toLowerCase(),
          role,
          source: 'coming-soon'
        });

      if (insertError) {
        if (insertError.code === '23505') {
          setError("You're already on the waitlist.");
        } else {
          setError('Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      setState('success');
      setEmail('');
      setName('');
    } catch (err) {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setState('choose-role');
    setError('');
    setEmail('');
    setName('');
  };

  if (state === 'success') {
    return (
      <div className="pt-4 animate-fade-in">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">You're on the list.</p>
          <p className="text-sm text-muted-foreground">
            Carly is being built carefully. We'll be in touch.
          </p>
        </div>
      </div>
    );
  }

  if (state === 'buyer-form' || state === 'dealer-form') {
    const role = state === 'buyer-form' ? 'buyer' : 'dealer';
    const roleLabel = role === 'buyer' ? 'Buyer' : 'Dealer';

    return (
      <div className="pt-4 animate-fade-slide-in">
        <div className="max-w-sm mx-auto space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Signing up as a {roleLabel}</p>
          </div>
          
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="h-11"
            />
            
            <Input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="h-11"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => handleSubmit(role)}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'choose-role') {
    return (
      <div className="pt-4 animate-fade-slide-in">
        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => handleRoleSelect('buyer')}
            className={`h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-all duration-300 ${
              isActivated ? 'animate-role-button-glow' : ''
            }`}
          >
            I'm a Buyer
          </Button>
          <Button
            size="lg"
            onClick={() => handleRoleSelect('dealer')}
            className={`h-12 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90 transition-all duration-300 ${
              isActivated ? 'animate-role-button-glow' : ''
            }`}
          >
            I'm a Dealer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <Button
        size="lg"
        onClick={handleJoinClick}
        tabIndex={isActivated ? 0 : -1}
        className={`h-12 px-8 text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all duration-300 hover:scale-[0.98] ${
          isActivated 
            ? 'opacity-100 hover:opacity-90' 
            : 'opacity-60 hover:opacity-70'
        }`}
      >
        Join the Waitlist
      </Button>
    </div>
  );
}
