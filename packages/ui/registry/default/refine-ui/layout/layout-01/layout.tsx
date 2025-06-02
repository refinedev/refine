"use client";

import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset } from "@/registry/default/ui/sidebar";
import { Sidebar } from "@/registry/default/refine-ui/layout/layout-01/sidebar";
import { MobileHeader } from "@/registry/default/refine-ui/layout/layout-01/mobile-header";
import { ThemeProvider } from "@/registry/default/refine-ui/layout/theme-provider";
import { cn } from "@/lib/utils";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <MobileHeader />
          <main
            className={cn(
              "@container/main",
              "container",
              "mx-auto",
              "relative",
              "w-full",
              "flex",
              "flex-col",
              "flex-1",
              "px-2",
              "pt-4",
              "md:p-4",
              "lg:px-6",
              "lg:pt-5.5",
            )}
          >
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
