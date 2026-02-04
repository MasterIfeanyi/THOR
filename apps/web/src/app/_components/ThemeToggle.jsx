"use client";

import Button from "@/components/Button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="other"
      size="text-xl"
      className="flex justify-center items-center p-2 w-9 h-9 rounded-full transition-colors hover:bg-muted"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
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
      </span>
    </Button>
  );
}
