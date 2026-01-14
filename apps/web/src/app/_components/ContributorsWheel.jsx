'use client';

import { useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';


// This would normally come from your contributors.json file
const CONTRIBUTORS = [
  {
    name: "Alice Johnson",
    role: "Creator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    github: "alice",
    contributions: ["Initial setup", "Documentation"]
  },
  {
    name: "Bob Smith",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    github: "bob",
    contributions: ["Bug fixes", "UI improvements"]
  },
  {
    name: "Carol White",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    github: "carol",
    contributions: ["Testing", "Feature requests"]
  },
  {
    name: "David Lee",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    github: "david",
    contributions: ["Code review"]
  },
  {
    name: "Frank Miller",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
    github: "frank",
    contributions: ["Refactoring", "Performance tuning"]
  },
  {
    name: "Grace Kim",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    github: "grace",
    contributions: ["Accessibility improvements"]
  },
  {
    name: "Henry Walker",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
    github: "henry",
    contributions: ["API integration"]
  },
  {
    name: "Isabella Martinez",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    github: "isabella",
    contributions: ["Edge case fixes", "Testing"]
  }
];

function ContributorCard({ contributor }) {
  return (
    <a
      href={`https://github.com/${contributor.github}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary hover:bg-card/80 transition-all duration-300 hover:scale-110"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github.com/${contributor.github}.png`}
        alt={contributor.name}
        className="w-12 h-12 rounded-full border-2 border-border group-hover:border-primary transition-colors object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {contributor.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate">@{contributor.github}</p>
      </div>
      <FaGithub className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" size={20} />
    </a>
  );
}

export default function CommunityPage() {
    
    const listRef = useRef(null);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        let animationId;
        const speed = 0.25; // gentle, slow motion

        const autoScroll = () => {
        el.scrollTop += speed;

        // loop back to top when reaching the bottom
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
            el.scrollTop = 0;
        }

        animationId = requestAnimationFrame(autoScroll);
        };

        animationId = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(animationId);
    }, []);

    if (!CONTRIBUTORS || CONTRIBUTORS.length === 0) return null;


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Amazing Contributors</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Special thanks to everyone who has contributed to making THOR better!
          </p>
        </div>

        {/* Code Contributors */}
        {CONTRIBUTORS.length > 0 && (
          <div className='max-w-2xl mx-auto mb-12 overflow-x-auto'>
            
                {/* List with fade effect */}
                <div className="relative">
                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background via-background/80 to-transparent pointer-events-none z-10"></div>
                
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-10"></div>
                
                {/* Contributors List */}
                <ul 
                    ref={listRef} 
                    className="
                        space-y-3
                        py-4
                        h-120
                        overflow-y-auto
                        overflow-x-visible
                        scrollbar-hide
                    "
                >
                    {CONTRIBUTORS.map((contributor) => (
                    <li key={contributor.github} className="list-none overflow-x-visible">
                        <ContributorCard contributor={contributor} />
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        )}

        {/* How to Contribute Section */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Want to Join Our Community?</h2>
            <p className="text-muted-foreground mb-6">
                Contributing is easy! Just follow these simple steps:
            </p>
            
            <ol className="space-y-4 text-sm">
                <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</span>
                    <div>
                        <strong>Fork the repository</strong> on GitHub
                    </div>
                </li>
                <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</span>
                    <div>
                        <strong>Make your changes</strong> - fix bugs, add features, improve docs
                    </div>
                </li>
                <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</span>
                    <div>
                        <strong>Submit a pull request</strong> - once merged, you will automatically appear here!
                    </div>
                </li>
            </ol>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm">
                    <strong>✨ Pro tip:</strong> Contributors are fetched automatically from GitHub API. 
                    You do not need to add yourself anywhere - just make valuable contributions!
                </p>
          </div>

        </div>
      </div>
    </div>
  );
}