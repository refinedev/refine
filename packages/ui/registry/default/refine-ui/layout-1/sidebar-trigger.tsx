"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { useSidebar } from "@/registry/default/ui/sidebar";
import { PanelRightOpen } from "lucide-react";

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground",
        "transition-all",
        "duration-200",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelRightOpen
        className={cn({
          "rotate-180": !open,
        })}
      />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

SidebarTrigger.displayName = "SidebarTrigger";
