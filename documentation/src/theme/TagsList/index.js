import React from "react";
import Tag from "@theme/Tag";
import { titleCase } from "title-case";
import clsx from "clsx";

const ChevronDownIcon = () => (
    <svg
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L4 3.08579L6.29289 0.792893C6.68342 0.402369 7.31658 0.402369 7.70711 0.792893C8.09763 1.18342 8.09763 1.81658 7.70711 2.20711L4.70711 5.20711C4.31658 5.59763 3.68342 5.59763 3.29289 5.20711L0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893Z"
            fill="currentColor"
        />
    </svg>
);

const mapLabel = (label) => {
    // remove `-`
    label = label.replace(/-/g, " ");

    // replace
    const replace = [
        ["typescript", "TypeScript"],
        ["javascript", "JavaScript"],
        ["chakra ui", "Chakra UI"],
        ["material ui", "Material UI"],
        ["nextjs", "Next.js"],
        ["nestjs", "NestJS"],
        ["css", "CSS"],
    ];

    replace.forEach((element) => {
        label = label.replace(element[0], element[1]);
    });

    // title case
    return titleCase(label);
};

export default function TagsList({ tags }) {
    const [collapsed, setCollapsed] = React.useState(true);
    const priorityTags = [
        "refine",
        "react",
        "nextjs",
        "typescript",
        "tutorial",
        "material-ui",
        "ant-design",
        "docker",
        "comparison",
    ];

    const sortedTags = tags.sort((a, b) => {
        let aIndex = priorityTags.indexOf(a.label);
        let bIndex = priorityTags.indexOf(b.label);

        if (aIndex === -1) {
            return bIndex === -1 ? 0 : 1;
        } else {
            return bIndex === -1 ? -1 : aIndex - bIndex;
        }
    });

    return (
        <div
            className={clsx(
                "flex",
                "justify-between",
                "items-start",
                "bg-gray-50 dark:bg-gray-800",
                "p-2 rounded-xl",
            )}
        >
            <ul
                className={clsx(
                    "overflow-hidden",
                    "flex-1",
                    "m-0",
                    "p-0",
                    collapsed && "h-[40px]",
                )}
            >
                {sortedTags.map((tag) => (
                    <li className={clsx("inline-flex")} key={tag.permalink}>
                        <Tag {...tag} label={mapLabel(tag.label)} />
                    </li>
                ))}
            </ul>
            <label
                onClick={() => setCollapsed(!collapsed)}
                className={clsx(
                    "flex",
                    "items-center",
                    "gap-1",
                    "cursor-pointer",
                    "flex-shrink",
                    "no-underline hover:no-underline",
                    "text-xs",
                    "bg-gray-100 dark:bg-gray-600",
                    "text-gray-600 dark:text-gray-400",
                    "rounded",
                    "py-1",
                    "px-2",
                    "mt-2 mr-2",
                )}
            >
                Show More <ChevronDownIcon />
            </label>
        </div>
    );
}
