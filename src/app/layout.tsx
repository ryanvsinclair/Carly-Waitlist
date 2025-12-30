import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carly — The first marketplace built for both sides of the deal",
  description: "Carly is a new automotive marketplace connecting buyers and dealers with transparency and trust. Launching soon — join the waitlist to be first in line.",
  keywords: ["car marketplace", "automotive marketplace", "buy cars online", "car dealerships", "transparent car buying"],
  authors: [{ name: "Carly" }],
  metadataBase: new URL("https://bcda714f-b0bc-4f37-b3d3-2d7e98b4777a.canvases.tempo.build"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Carly — The first marketplace built for both sides of the deal",
    description: "Carly is a new automotive marketplace connecting buyers and dealers with transparency and trust. Launching soon — join the waitlist to be first in line.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carly — The first marketplace built for both sides of the deal",
    description: "Carly is a new automotive marketplace connecting buyers and dealers with transparency and trust. Launching soon — join the waitlist to be first in line.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Carly",
              url: "https://bcda714f-b0bc-4f37-b3d3-2d7e98b4777a.canvases.tempo.build",
              logo: "https://bcda714f-b0bc-4f37-b3d3-2d7e98b4777a.canvases.tempo.build/favicon.svg",
              description: "Carly is a new automotive marketplace connecting buyers and dealers with transparency and trust.",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
