import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { type FC, type SVGProps } from "react";

type Props = {
  className?: string;
  linkClassName?: string;
  variant?: "plain" | "default";
  utmMedium?: string;
};

export const EnterpriseGetInTouchButton: FC<Props> = ({
  variant = "default",
  ...props
}) => {
  let href = "https://s.refine.dev/enterprise";
  href += props.utmMedium ? `?utm_medium=${props.utmMedium}` : "";

  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "justify-start",
        "gap-4",
        "landing-lg:gap-6",
        props.className,
      )}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "self-start",
          "rounded-full",
          variant === "default" && [
            "!text-gray-0 dark:!text-gray-900",
            "bg-enterprise-cta-button-bg-light dark:bg-enterprise-cta-button-bg-dark",
          ],
          variant === "plain" && [
            "dark:bg-gray-900 bg-gray-0",
            "!text-gray-900 dark:!text-gray-0",
          ],
          "transition-[filter]",
          "duration-150",
          "ease-in-out",
          "hover:brightness-110",
          "py-3",
          "pl-7 pr-8",
          "landing-md:px-8",
          "landing-lg:pl-7 landing-lg:pr-8",
          "flex",
          "items-center",
          "justify-center",
          "gap-2",
          "hover:!no-underline",
          props.linkClassName,
        )}
      >
        <GetInTouchIcon />
        <span
          className={clsx(
            "text-base",
            "font-semibold",
            variant === "default" && "text-gray-0 dark:text-gray-900",
            variant === "plain" && "dark:text-gray-0 text-gray-900",
          )}
        >
          Contact us
        </span>
      </Link>
    </div>
  );
};

const GetInTouchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
    className={clsx(props.className)}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.604 1.004a2.58 2.58 0 0 0-2.864.588A2.65 2.65 0 0 0 .217 4.48l1.519 3.517-1.52 3.524a2.65 2.65 0 0 0 .525 2.888 2.58 2.58 0 0 0 2.863.587l10.8-4.571A2.63 2.63 0 0 0 16 8a2.63 2.63 0 0 0-1.596-2.425l-10.8-4.571Zm-1.713 1.7a.98.98 0 0 1 1.09-.227l10.8 4.572c.37.156.619.528.619.951 0 .423-.25.795-.62.951l-10.8 4.572a.98.98 0 0 1-1.089-.226l-.558.54.558-.54a1.05 1.05 0 0 1-.205-1.142L3.132 8.8H6a.8.8 0 0 0 0-1.6H3.134L1.686 3.846a1.05 1.05 0 0 1 .205-1.142Z"
      clipRule="evenodd"
    />
  </svg>
);
