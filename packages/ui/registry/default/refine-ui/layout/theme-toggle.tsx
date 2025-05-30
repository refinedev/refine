"use client";

import { useTheme } from "@/registry/default/refine-ui/layout/theme-provider";
import { Button } from "@/registry/default/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn("rounded-full", "border-sidebar-border", "bg-transparent")}
    >
      <Sun
        className={cn(
          "h-[1.2rem]",
          "w-[1.2rem]",
          "rotate-0",
          "scale-100",
          "transition-all",
          "dark:-rotate-90",
          "dark:scale-0",
        )}
      />
      <Moon
        className={cn(
          "absolute",
          "h-[1.2rem]",
          "w-[1.2rem]",
          "rotate-90",
          "scale-0",
          "transition-all",
          "dark:rotate-0 dark:scale-100",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

ThemeToggle.displayName = "ThemeToggle";
