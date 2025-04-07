import clsx from "clsx";
import React from "react";

export const JoinWaitlist = ({ className }: { className?: string }) => {
  return (
    <a
      href="https://form.typeform.com/to/htzq03hP"
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "block",
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
        "mx-auto",
        className,
      )}
    >
      Join the waitlist
    </a>
  );
};
