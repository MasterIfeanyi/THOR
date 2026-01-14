'use client';

import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

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
    name: "Emma Davis",
    role: "Contributor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    github: "emma",
    contributions: ["New features"]
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
      <FaGithub className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" size={20} />
    </a>
  );
}

export default function CommunityPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSpinning) {
        setActiveIndex((prev) => (prev + 1) % CONTRIBUTORS.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSpinning]);

  const spinWheel = () => {
    setIsSpinning(true);
    let spins = 0;
    const maxSpins = 15;
    
    const spinInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CONTRIBUTORS.length);
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const getVisibleContributors = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + CONTRIBUTORS.length) % CONTRIBUTORS.length;
      visible.push({
        contributor: CONTRIBUTORS[index],
        isActive: i === 0,
        offset: i
      });
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Amazing Contributors 🎉</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Special thanks to everyone who has contributed to making THOR better!
          </p>
        </div>

        {/* Slot Machine Wheel */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative bg-card/50 rounded-xl border-2 border-primary/20 p-4 overflow-hidden">
            {/* Spotlight Effect */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            
            <div className="space-y-4">
              {getVisibleContributors().map(({ contributor, isActive, offset }) => (
                <div
                  key={contributor.github}
                  style={{
                    transform: `translateY(${offset * 10}px)`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ContributorCard contributor={contributor} isActive={isActive} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Contribute Section */}
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Want to Join Our Community? 🚀</h2>
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
                <strong>Add yourself</strong> to <code className="bg-muted px-2 py-0.5 rounded">src/data/contributors.json</code>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</span>
              <div>
                <strong>Submit a pull request</strong> and you are done!
              </div>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold mb-2">Example entry:</p>
            <pre className="text-xs overflow-x-auto">
{`{
  "name": "Your Name",
  "role": "Contributor",
  "avatar": "https://github.com/yourusername.png",
  "github": "yourusername",
  "contributions": ["Your contribution"]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}