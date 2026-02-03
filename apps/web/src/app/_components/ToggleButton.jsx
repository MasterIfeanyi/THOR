"use client"

import { useTheme } from "next-themes"
import { FiSun, FiMoon } from "react-icons/fi"
import Button from "@/components/Button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size="small"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md border border-border bg-card hover:bg-muted transition-colors"
    >
      {theme === "dark" ? <FiSun className="text-yellow-500" /> : <FiMoon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}