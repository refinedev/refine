"use client";

import { useSidebar, SidebarTrigger } from "@/registry/default/ui/sidebar";
import { ThemeToggle } from "@/registry/default/refine-ui/layout/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const { open, isMobile } = useSidebar();

  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-16",
        "shrink-0",
        "items-center",
        "gap-2",
        "border-b",
        "border-sidebar-border",
        "bg-sidebar",
        "pr-3",
        "justify-between",
        "z-40",
      )}
    >
      <SidebarTrigger
        className={cn("text-muted-foreground", "rotate-180", "ml-1", {
          "opacity-0": open,
          "opacity-100": !open || isMobile,
          "pointer-events-auto": !open || isMobile,
          "pointer-events-none": open && !isMobile,
        })}
      />
      <ThemeToggle />
    </header>
  );
}

Header.displayName = "Header";
