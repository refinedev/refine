import clsx from "clsx";
import React from "react";

type AiLandingStepInfoProps = {
  className?: string;
  title?: string;
  description?: string;
  step?: string;
};

export const AiLandingStepInfo = ({
  className,
  title,
  description,
  step,
}: AiLandingStepInfoProps) => {
  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "landing-sm:flex-row",
        "gap-4",
        "landing-sm:gap-6",
        "pl-4 landing-sm:pl-10",
        "w-full",
        "landing-lg:w-[548px]",
        "landing-sm:min-h-[220px]",
        "landing-lg:min-h-max",
        "flex-shrink-0",
        className,
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-center relative",
          "w-max h-max",
        )}
      >
        <Badge />
        <div
          className={clsx(
            "absolute",
            "font-semibold",
            "text-xl",
            "dark:text-refine-green-alt text-refine-indigo",
          )}
        >
          {step}
        </div>
      </div>

      <div className={clsx("landing-sm:mt-6")}>
        <div
          className={clsx(
            "text-2xl font-semibold",
            "dark:text-white text-gray-900",
          )}
        >
          {title}
        </div>
        <div
          className={clsx(
            "dark:text-zinc-300 text-gray-600",
            "max-w-[444px]",
            "mt-5",
          )}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

const Badge = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      className={clsx(
        "dark:text-refine-green-alt text-refine-indigo",
        "w-14 h-14",
        "landing-sm:w-20 landing-sm:h-20",
      )}
    >
      <path
        fill="currentColor"
        fillOpacity={0.05}
        fillRule="evenodd"
        d="M45.963 1.408a13.333 13.333 0 0 0-11.926 0L7.37 14.74A13.333 13.333 0 0 0 0 26.667v26.666c0 5.05 2.853 9.668 7.37 11.926l26.667 13.333a13.333 13.333 0 0 0 11.926 0L72.629 65.26A13.333 13.333 0 0 0 80 53.333V26.667c0-5.05-2.853-9.668-7.37-11.926L45.962 1.408Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#ai-landing-step-info-badge-a)"
        fillOpacity={0.25}
        fillRule="evenodd"
        d="M45.963 1.408a13.333 13.333 0 0 0-11.926 0L7.37 14.74A13.333 13.333 0 0 0 0 26.667v26.666c0 5.05 2.853 9.668 7.37 11.926l26.667 13.333a13.333 13.333 0 0 0 11.926 0L72.629 65.26A13.333 13.333 0 0 0 80 53.333V26.667c0-5.05-2.853-9.668-7.37-11.926L45.962 1.408Z"
        clipRule="evenodd"
      />
      <defs>
        <radialGradient
          id="ai-landing-step-info-badge-a"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 80 -80 0 40 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" stopOpacity={0.5} />
          <stop offset={1} stopColor="currentColor" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};
