"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const legalLinks = [
  {
    href: "/legal/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/legal/terms-and-condition",
    label: "Terms & Conditions",
  },
  {
    href: "/legal/eula",
    label: "EULA",
  },
  {
    href: "/legal/support",
    label: "Support",
  },
];

export default function Legallayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="" className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold tracking-[0.16em] text-white uppercase">
                  Silent Whistle
                </p>
                <p className="text-xs text-zinc-500">Legal Center</p>
              </div>
            </Link>

            <div className="hidden rounded-full border border-zinc-800 bg-[#101012] px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-500 sm:inline-flex">
              Legal and Support
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {legalLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-green-500/40 bg-green-500/12 text-green-400"
                      : "border-zinc-800 bg-[#101012] text-zinc-300 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
