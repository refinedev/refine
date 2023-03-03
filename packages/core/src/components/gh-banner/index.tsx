import React, { useLayoutEffect } from "react";
import { CSSRules } from "./styles";

export const GitHubBanner = () => {
    useLayoutEffect(() => {
        CSSRules.forEach((rule) =>
            document.styleSheets[0].insertRule(
                rule,
                document.styleSheets.length,
            ),
        );
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
