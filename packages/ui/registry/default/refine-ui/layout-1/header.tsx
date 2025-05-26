"use client";

import { useSidebar } from "@/registry/default/ui/sidebar";
import { SidebarTrigger } from "@/registry/default/refine-ui/layout-1/sidebar-trigger";
import { ThemeToggle } from "@/registry/default/refine-ui/theme/theme-toggle";
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
        className={cn({
          "rotate-0": isMobile,
          "opacity-0": open,
          "opacity-100": !open || isMobile,
          "pointer-events-auto": !open || isMobile,
          "pointer-events-none": open && !isMobile,
          "w-9": !open || isMobile,
          "w-0": open && !isMobile,
        })}
      />
      <ThemeToggle />
    </header>
  );
}

Header.displayName = "Header";
