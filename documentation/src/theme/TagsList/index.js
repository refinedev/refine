import React from "react";
import Tag from "@theme/Tag";

export default function TagsList({ tags, activeTag }) {
    return (
        <ul style={{ margin: 0, padding: 0 }}>
            {tags.map((tag) => (
                <li
                    style={{
                        display: "inline-flex",
                        margin: "1rem 1rem 0 0",
                    }}
                    key={tag.permalink}
                >
                    <Tag isActive={activeTag?.label === tag.label} {...tag} />
                </li>
            ))}
        </ul>
    );
}
