"use client";

import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";

function ContributorCard({ contributor }) {
  return (
    <a
      href={`https://github.com/${contributor.github}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 items-center p-4 rounded-lg border transition-all duration-300 group border-border bg-card hover:border-primary hover:bg-card/80 hover:scale-110"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github.com/${contributor.github}.png`}
        alt={contributor.name}
        className="object-cover w-12 h-12 rounded-full border-2 transition-colors border-border group-hover:border-primary"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate transition-colors text-foreground group-hover:text-primary">
          {contributor.name}
        </h3>
        <p className="text-sm truncate text-muted-foreground">
          @{contributor.github}
        </p>
      </div>
      <FaGithub
        className="transition-colors text-muted-foreground group-hover:text-primary shrink-0"
        size={20}
      />
    </a>
  );
}

export default function ContributorsWheel({ contributors = [] }) {
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

  if (!contributors || contributors.length === 0)
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Our Amazing Contributors</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Loading contributors from GitHub...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Our Amazing Contributors</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Special thanks to the {contributors.length} amazing{" "}
            {contributors.length === 1 ? "person" : "people"} who contributed to
            making THOR better!
          </p>
        </div>

        {/* Code Contributors */}
        {contributors.length > 0 && (
          <div className="overflow-x-auto mx-auto mb-2 max-w-2xl">
            {/* List with fade effect */}
            <div className="relative">
              {/* Top fade */}
              <div className="absolute top-0 right-0 left-0 z-10 h-20 bg-gradient-to-b to-transparent pointer-events-none from-background via-background/80"></div>

              {/* Bottom fade */}
              <div className="absolute right-0 bottom-0 left-0 z-10 h-20 bg-gradient-to-t to-transparent pointer-events-none from-background via-background/80"></div>

              {/* Contributors List */}
              <ul
                ref={listRef}
                className="overflow-y-auto overflow-x-visible py-12 mb-12 space-y-3 h-auto scrollbar-hide"
              >
                {contributors.map((contributor) => (
                  <li
                    key={contributor.github}
                    className="overflow-x-visible list-none"
                  >
                    <ContributorCard contributor={contributor} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* How to Contribute Section */}
        <div className="p-8 mx-auto max-w-3xl rounded-lg border bg-card border-border">
          <h2 className="mb-4 text-2xl font-bold">
            Want to Join Our Community?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Contributing is easy! Just follow these simple steps:
          </p>

          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="flex justify-center items-center w-6 h-6 font-semibold rounded-full shrink-0 bg-primary text-primary-foreground">
                1
              </span>
              <div>
                <strong>Fork the repository</strong> on GitHub
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex justify-center items-center w-6 h-6 font-semibold rounded-full shrink-0 bg-primary text-primary-foreground">
                2
              </span>
              <div>
                <strong>Make your changes</strong> - fix bugs, add features,
                improve docs
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex justify-center items-center w-6 h-6 font-semibold rounded-full shrink-0 bg-primary text-primary-foreground">
                3
              </span>
              <div>
                <strong>Submit a pull request</strong> - once merged, you will
                automatically appear here!
              </div>
            </li>
          </ol>

          <div className="p-4 mt-6 rounded-lg border bg-accent border-primary/20">
            <p className="text-sm">
              <strong>✨ Pro tip:</strong> Contributors are fetched
              automatically from GitHub API. You do not need to add yourself
              anywhere - just make valuable contributions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
