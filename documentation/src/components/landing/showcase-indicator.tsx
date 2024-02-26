import React from "react";
import clsx from "clsx";

type Props = {
  x: string | number;
  y: string | number;
  className?: string;
};

export const ShowcaseIndicator = React.memo(function ShowcaseIndicatorBase({
  x,
  y,
  className,
}: Props) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: Number(x) + 10,
        top: Number(y) + 10,
        width: 16,
        height: 16,
      }}
    >
      <div
        className={clsx(
          "absolute",
          "w-4",
          "h-4",
          "flex",
          "items-center",
          "justify-center",
          "pointer-events-none",
        )}
      >
        <div
          className={clsx(
            "absolute",
            "w-3",
            "h-3",
            "rounded-full",
            "left-1/2",
            "top-1/2",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "bg-landing-hero-xray-dot-center-bg-light",
            "dark:bg-landing-hero-xray-dot-center-bg",
            "pointer-events-auto",
          )}
        />
        {[0, 400, 800].map((d) => (
          <div
            key={d}
            className={clsx(
              "w-4",
              "h-4",
              "absolute",
              "left-0",
              "top-0",
              "right-0",
              "bottom-0",
              "flex",
              "items-center",
              "justify-center",
            )}
          >
            <div
              className={clsx(
                "opacity-0",
                "animate-dot-waves",
                "w-4",
                "h-4",
                "rounded-full",
                "border-2",
                "border-refine-blue",
                "dark:border-refine-cyan",
              )}
              style={{
                animationDelay: `${d}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
