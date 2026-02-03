"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Avatar from "./Avatar";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Docs", href: "/getting-started" },
    { label: "Playground", href: "/playground" },
    { label: "Community", href: "/community" },
  ];

  // Mock user - change this to test different scenarios
  const user = session?.user || null; // Not logged in

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur border-border bg-background/95 supports-backdrop-filter:bg-background/60">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex gap-1 items-center">
            <Image
              src="/images/thor.png"
              alt="THOR Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-foreground">THOR</span>
          </Link>

          <div className="hidden gap-8 items-center md:flex ms-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {/* GitHub Repo Link */}
            <Link
              href="https://github.com/MasterIfeanyi/THOR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center w-9 h-9 rounded-lg transition-colors text-foreground/80 hover:text-foreground hover:bg-muted"
            >
              <FaGithub size={20} />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Circle */}
            <Avatar user={user} size={36} />
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="py-4 border-t md:hidden border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex gap-3 items-center pt-2 border-t border-border">
              <Link
                href="https://github.com/MasterIfeanyi/THOR"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaGithub size={20} />
              </Link>

              <ThemeToggle />

              <Avatar user={user} size={36} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
