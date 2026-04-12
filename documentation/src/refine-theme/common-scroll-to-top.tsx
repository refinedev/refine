import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowUpIcon } from "./icons/arrow-up";

const SCROLL_THRESHOLD = 300;

export const CommonScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={clsx(
        "fixed bottom-8 right-8 z-50",
        "flex items-center justify-center",
        "w-10 h-10 rounded-full",
        "bg-zinc-800 dark:bg-white text-zinc-300 dark:text-gray-700",
        "border-zinc-700 dark:border-gray-200",
        "shadow-lg",
        "hover:brightness-110 active:brightness-90",
        "focus:outline-none",
        "transition-[opacity,transform] duration-300 ease-in-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <ArrowUpIcon />
    </button>
  );
};
