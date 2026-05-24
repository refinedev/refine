import React from "react";
import clsx from "clsx";
import { ArrowUpIcon } from "./icons/arrow-up";

const SCROLL_THRESHOLD_PX = 360;

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={clsx(
        "fixed bottom-6 right-6 z-40",
        "flex h-11 w-11 items-center justify-center",
        "rounded-full border border-zinc-200/80",
        "bg-gradient-to-br from-zinc-50 via-white to-zinc-100",
        "text-zinc-900 shadow-[0_10px_24px_rgba(0,0,0,0.18)]",
        "backdrop-blur",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.22)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40",
        "dark:border-zinc-700",
        "dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800",
        "dark:text-zinc-100 dark:focus-visible:ring-zinc-100/40",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  );
};
