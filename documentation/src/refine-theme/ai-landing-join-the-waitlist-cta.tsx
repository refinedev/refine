import clsx from "clsx";
import React from "react";

export const JoinWaitlist = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("not-prose", "flex", "mx-auto", className)}>
      <a
        href="https://s.refine.dev/ai-join"
        target="_blank"
        rel="noopener"
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "appearance-none",
          "outline-none",
          "border-none",
          "no-underline",
          "cursor-pointer",
          "dark:bg-refine-green-alt bg-refine-indigo",
          "dark:text-gray-900 text-white",
          "rounded-full",
          "w-max",
          "min-h-12",
          "px-7",
          "font-semibold",
          "text-base",
        )}
      >
        Start for free
      </a>
    </div>
  );
};
