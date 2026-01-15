'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import Avatar from './Avatar';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {

    const { data: session } = useSession();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Docs', href: '/getting-started' },
        { label: 'Community', href: '/community' },
    ];

    // Mock user - change this to test different scenarios
    const user = session?.user || null; // Not logged in
    

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-0">
                <div className='flex h-16 items-center justify-between'>

                    <Link href="/" className="flex items-center gap-1">
                        <Image 
                            src="/images/thor.png" 
                            alt="THOR Logo" 
                            width={40} 
                            height={40}
                        />
                        <span className="text-xl font-bold text-foreground">THOR</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 ms-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        {/* GitHub Repo Link */}
                        <Link
                            href="https://github.com/MasterIfeanyi/THOR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FaGithub size={20} />
                        </Link>


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
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>


                        <div className="flex items-center gap-3 pt-2 border-t border-border">
                            <Link
                                    href="https://github.com/MasterIfeanyi/THOR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <FaGithub size={20} />
                            </Link>

                            <Avatar user={user} size={36} />
                        </div>

                    </div>
                )}
            </div>
        </nav>
    )
}