import Link from "next/link";

export function CarlyFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-b from-neutral-900 to-neutral-950 dark:from-neutral-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Product */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
              Product
            </h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Meet Carly
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                How Carly Works
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Carly Verified
              </Link>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
              Navigate
            </h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Browse
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Saved Vehicles
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Messages
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Appointments
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
              Support
            </h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Help Center
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Ask Carly
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>

          {/* Trust & Safety */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
              Trust & Safety
            </h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Terms of Use
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Trust & Safety
              </Link>
              <Link href="#" className="block text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-200">
                Data & Transparency
              </Link>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="border-t border-neutral-800 pt-8 mb-8">
          <p className="text-center text-sm text-neutral-500 italic">
            Carly helps you choose well — not rush.
          </p>
        </div>

        {/* Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-neutral-600">
          <span>© {currentYear} Vynance Technologies Inc.</span>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:text-neutral-400 transition-colors">
            Legal
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:text-neutral-400 transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
