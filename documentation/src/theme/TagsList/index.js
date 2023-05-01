import React from "react";
import Tag from "@theme/Tag";
import Link from "@docusaurus/Link";

import tagStyles from "../Tag/styles.module.css";

export default function TagsList({ tags, activeTag, collapsable = true }) {
    const [collapsed, setCollapsed] = React.useState(true);

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
                    height: collapsable && collapsed ? "34px" : "auto",
                    overflow: "hidden",
                }}
            >
                {tags.map((tag) => (
                    <li
                        style={{
                            display: "inline-flex",
                            margin: "0 1rem 1rem 0",
                        }}
                        key={tag.permalink}
                    >
                        <Tag
                            isActive={activeTag?.label === tag.label}
                            {...tag}
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
