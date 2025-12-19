/**
 * Root Layout Component
 * 
 * The root layout component for the Next.js application.
 * This component wraps all pages and provides:
 * - Global font configuration (Inter with all weights)
 * - HTML structure and metadata
 * - Global CSS imports
 * 
 * @layout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure Inter font with all available weights
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Application metadata
export const metadata: Metadata = {
  title: "Silent Whistle - Dashboard",
  description: "Silent Whistle platform dashboard and administration panel",
};

/**
 * Root Layout Component
 * 
 * Provides the base HTML structure and font configuration for all pages
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
