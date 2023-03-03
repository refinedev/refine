import React, { useEffect } from "react";
import { CSSRules } from "./styles";

export const GitHubBanner = () => {
    useEffect(() => {
        const styleTag = document.createElement("style");
        document.head.appendChild(styleTag);
        CSSRules.forEach((rule) => styleTag.sheet?.insertRule(rule, 0));
    });

    return (
        <div className="banner">
            <a
                className="gh-link"
                href="https://github.com/refinedev/refine"
                target="_blank"
                rel="noreferrer"
            >
                <div className="content">
                    <span className="wizard">🧙‍♂️</span>
                    <span className="text">
                        Refine grants your wishes! Please give us a ⭐️ on
                        GitHub to keep the magic going.
                    </span>
                </div>
            </a>
        </div>
    );
};
