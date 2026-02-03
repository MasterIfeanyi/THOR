"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Don't render icon until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="other"
        size="text-xl"
        className="flex justify-center items-center p-2 w-9 h-9 rounded-full transition-colors hover:bg-muted"
        aria-label="Toggle theme"
      >
        <div className="w-7.5 h-7.5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="other"
      size="text-xl"
      className="flex justify-center items-center p-2 w-9 h-9 rounded-full transition-colors hover:bg-muted"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon
          size={30}
          className="transition-colors text-muted-foreground hover:text-foreground"
        />
      ) : (
        <Sun
          size={30}
          className="transition-colors text-muted-foreground hover:text-foreground"
        />
      )}
    </Button>
  );
}
