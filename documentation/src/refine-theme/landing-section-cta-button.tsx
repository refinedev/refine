import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { type FC, type PropsWithChildren, type SVGProps } from "react";

type Props = {
  className?: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

export const LandingSectionCtaButton: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  to,
  onClick,
  icon,
}) => {
  return (
    <Link
      to={to}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={clsx(
        className,
        "select-none",
        "group/cta-button",
        "relative",
        "no-underline",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "py-2 pr-2 pl-4",
        "landing-sm:py-3 landing-sm:pr-4 landing-sm:pl-6",
        "text-xs landing-sm:text-base",
        "font-semibold",
        "dark:text-refine-cyan-alt text-refine-blue",
        "dark:bg-refine-cyan-alt/10 bg-refine-blue/10",
        "overflow-hidden",
      )}
    >
      {children}
      {icon || <DefaultIcon />}
      <div
        className={clsx(
          "select-none",
          "rounded-3xl",
          "absolute",
          "left-0",
          "top-0",
          "w-full",
          "h-full",
          "scale-[2]",
          "origin-center",
          "transition-[opacity,transform]",
          "duration-300",
          "ease-in-out",
          "opacity-0",
          "group-hover/cta-button:opacity-100",
          "group-hover/cta-button:scale-100",
          "pointer-events-none",
          "bg-landing-copy-command-hover-bg-light dark:bg-landing-copy-command-hover-bg-dark",
        )}
      />
    </Link>
  );
};

export const LandingSectionCtaButtonAlt: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  to,
  onClick,
  icon,
}) => {
  return (
    <Link
      to={to}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={clsx(
        className,
        "select-none",
        "landing-sm:max-w-[293px]",
        "mx-auto",
        "group/cta-button",
        "relative",
        "no-underline",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "py-3 pr-4 pl-6",
        "text-base",
        "font-semibold",
        "dark:text-refine-cyan-alt text-refine-blue",
        "dark:bg-refine-cyan-alt/10 bg-refine-blue/10",
        "overflow-hidden",
      )}
    >
      {children}
      {icon || <DefaultIcon />}
      <div
        className={clsx(
          "select-none",
          "rounded-3xl",
          "absolute",
          "left-0",
          "top-0",
          "w-full",
          "h-full",
          "scale-[2]",
          "origin-center",
          "transition-[opacity,transform]",
          "duration-300",
          "ease-in-out",
          "opacity-0",
          "group-hover/cta-button:opacity-100",
          "group-hover/cta-button:scale-100",
          "pointer-events-none",
          "bg-landing-copy-command-hover-bg-light dark:bg-landing-copy-command-hover-bg-dark",
        )}
      />
    </Link>
  );
};

const DefaultIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.646 14.146a.5.5 0 0 0 .708.708l2.5-2.5a.5.5 0 0 0 0-.708l-2.5-2.5a.5.5 0 0 0-.708.708L12.793 12l-2.147 2.146Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 1a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"
      clipRule="evenodd"
    />
  </svg>
);
