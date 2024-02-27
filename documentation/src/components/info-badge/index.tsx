import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { BadgeTooltip } from "../badge-tooltip";

type Props = {
  id: string;
  icon: React.ReactNode;
  color: "orange" | "green" | "purple";
  text?: string;
  description: React.ReactNode;
};

export const InfoBadge = ({ id, icon, color, text, description }: Props) => {
  const classes = clsx(
    color === "orange" &&
      clsx(
        "bg-refine-react-light-orange-bg dark:bg-refine-react-dark-orange",
        "dark:bg-opacity-[0.15]",
        "text-refine-react-light-orange dark:text-refine-react-dark-orange",
      ),
    color === "green" &&
      clsx(
        "bg-refine-react-light-green-bg dark:bg-refine-react-dark-green",
        "dark:bg-opacity-[0.15]",
        "text-refine-react-light-green dark:text-refine-react-dark-green",
      ),
    color === "purple" &&
      clsx(
        "bg-refine-react-light-purple-bg dark:bg-refine-react-dark-purple",
        "dark:bg-opacity-[0.15]",
        "text-refine-react-light-purple dark:text-refine-react-dark-purple",
      ),
  );

  return (
    <BadgeTooltip content={description}>
      <Link
        to={`/docs/${id}`}
        className={clsx(
          "-mt-px",
          // "mr-1.5",
          "rounded-[10px]",
          "inline-flex",
          "items-center",
          "justify-center",
          "text-sm",
          "no-underline",
          "gap-1.5",
          "[&>svg]:hover:scale-110",
          "[&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out",
          classes,
        )}
      >
        {icon}
        {text && <span className="text-xs leading-[0.875rem]">{text}</span>}
      </Link>
    </BadgeTooltip>
  );
};
