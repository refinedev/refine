import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { BadgeTooltip } from "../badge-tooltip";

type Props = {
    id: string;
    icon: React.ReactNode;
    color:
        | "orange"
        | "yellow"
        | "blue"
        | "cyan"
        | "green"
        | "indigo"
        | "purple"
        | "pink"
        | "black";
    text?: string;
    description: React.ReactNode;
};

export const InfoBadge = ({ id, icon, color, text, description }: Props) => {
    const classes = clsx(
        color === "orange" &&
            "bg-refine-orange hover:ring-refine-orange text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
        color === "yellow" &&
            "bg-refine-yellow hover:ring-refine-yellow text-gray-900 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-900",
        color === "blue" &&
            "bg-refine-blue hover:ring-refine-blue text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
        color === "cyan" &&
            "bg-refine-cyan hover:ring-refine-cyan text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
        color === "green" &&
            "bg-refine-green hover:ring-refine-green text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
        color === "indigo" &&
            "bg-refine-indigo hover:ring-refine-indigo text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
        color === "purple" &&
            "bg-refine-purple hover:ring-refine-purple text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
        color === "pink" &&
            "bg-refine-pink hover:ring-refine-pink text-gray-900 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-900",
        color === "black" &&
            "bg-gray-1000 hover:ring-refine-gray-1000 text-gray-0 dark:text-gray-0 hover:text-gray-0 dark:hover:text-gray-0",
    );

    return (
        <BadgeTooltip content={description}>
            <Link
                to={`/docs/${id}`}
                className={clsx(
                    "mr-1",
                    "rounded",
                    "py-1.5",
                    "px-1.5",
                    "inline-flex",
                    "items-center",
                    "justify-center",
                    "text-sm",
                    "no-underline",
                    "gap-1.5",
                    "hover:ring",
                    "hover:ring-opacity-30",
                    classes,
                )}
            >
                {icon}
                {text && (
                    <span className="text-xs leading-[0.875rem]">{text}</span>
                )}
            </Link>
        </BadgeTooltip>
    );
};
