import type { PropsWithChildren } from "react";
import { SidebarProvider, SidebarInset } from "@/registry/default/ui/sidebar";
import { Sidebar } from "@/registry/default/refine-ui/layout-1/sidebar";
import { Header } from "@/registry/default/refine-ui/layout-1/header";
import { ThemeProvider } from "@/registry/default/refine-ui/theme/theme-provider";
import { cn } from "@/lib/utils";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
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
              "p-2",
              "md:p-4",
              "lg:p-6",
            )}
          >
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
