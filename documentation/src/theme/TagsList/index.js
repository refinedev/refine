import React from "react";
import Tag from "@theme/Tag";
import Link from "@docusaurus/Link";
import { titleCase } from "title-case";

import tagStyles from "../Tag/styles.module.css";

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

export default function TagsList({ tags, activeTag, collapsable = true }) {
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
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
            }}
        >
            <ul
                style={{
                    margin: 0,
                    padding: 0,
                    height: collapsable && collapsed ? "35px" : "auto",
                    overflow: "hidden",
                }}
            >
                {sortedTags.map((tag) => (
                    <li
                        style={{
                            display: "inline-flex",
                            margin: "0 1rem 1rem 0",
                        }}
                        key={tag.permalink}
                    >
                        <Tag
                            isActive={activeTag?.permalink === tag.permalink}
                            {...tag}
                            label={mapLabel(tag.label)}
                        />
                    </li>
                ))}
            </ul>
            {collapsable && (
                <Link
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        setCollapsed(!collapsed);
                    }}
                    className={tagStyles.tag}
                >
                    More
                </Link>
            )}
        </div>
    );
}
