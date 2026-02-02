"use client";

import Button from "@/components/Button";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
