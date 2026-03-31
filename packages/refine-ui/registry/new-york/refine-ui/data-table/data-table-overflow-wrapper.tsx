"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const DataTableOverflowContext = React.createContext<{
  horizontal: boolean;
  vertical: boolean;
}>({ horizontal: false, vertical: false });

export const useDataTableOverflow = () =>
  React.useContext(DataTableOverflowContext);

export function DataTableOverflowWrapper({
  children,
  className,
  deps = [],
}: {
  children: React.ReactNode;
  className?: string;
  deps?: unknown[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState({
    horizontal: false,
    vertical: false,
  });

  React.useEffect(() => {
    const checkOverflow = () => {
      const container = containerRef.current;
      if (!container) return;

      const table = container.querySelector("table");
      if (!table) return;

      setIsOverflowing({
        horizontal: table.offsetWidth > container.clientWidth,
        vertical: table.offsetHeight > container.clientHeight,
      });
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    const timeoutId = setTimeout(checkOverflow, 100);

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(containerRef.current!);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is user-controlled
  }, deps);

  return (
    <DataTableOverflowContext.Provider value={isOverflowing}>
      <div
        ref={containerRef}
        className={cn(
          "rounded-md",
          "border",
          "relative",
          "overflow-auto",
          className,
        )}
      >
        {children}
      </div>
    </DataTableOverflowContext.Provider>
  );
}

DataTableOverflowWrapper.displayName = "DataTableOverflowWrapper";
