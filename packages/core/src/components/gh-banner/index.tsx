import React, { useEffect } from "react";
import { CSSRules } from "./styles";

export const GitHubBanner = () => {
    useEffect(() => {
        const styleTag = document.createElement("style");
        document.head.appendChild(styleTag);
        CSSRules.forEach((rule) =>
            styleTag.sheet?.insertRule(rule, styleTag.sheet.cssRules.length),
        );
    }, []);

    return (
        <div
            className="banner"
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: "8px 16px",
                backgroundColor: "#0d0d0d",
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
        >
            <a
                className="gh-link"
                href="https://s.refine.dev/github-support"
                target="_blank"
                rel="noreferrer"
            >
                <div
                    className="content"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        color: "#fff",
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                    }}
                >
                    <span
                        className="wizard"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "32px",
                            height: "32px",
                            fontSize: "32px",
                            lineHeight: "32px",
                        }}
                    >
                        🧙‍♂️
                    </span>
                    <span
                        className="text"
                        style={{
                            padding: "4px 0",
                            fontSize: "16px",
                            lineHeight: "24px",
                            textShadow: "0px 0px 4px rgba(255, 255, 255, 0.5)",
                        }}
                    >
                        refine grants your wishes! Please give us a ⭐️ on
                        GitHub to keep the magic going.
                    </span>
                </div>
            </a>
        </div>
    );
};
