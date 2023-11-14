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


    const texts = ["⭐️ Be a part of our journey. Star Refine on GitHub! ⭐️", "⭐️ Join our community. Star Refine on GitHub! ⭐️", "⭐️ Let's elevate Refine together. Star us on GitHub! ⭐️", "⭐️ Enhance Refine's reach. Give us a star on GitHub! ⭐️"];

    return (
        <div
            className="banner"
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: "8px 16px",
                backgroundColor: "#0d0d0d",
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
        >
            {/* sider offset for center alignment */}
            <div
                style={{
                    width: "200px",
                }}
            />
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
                        className="text"
                        style={{
                            padding: "4px 0",
                            fontSize: "16px",
                            lineHeight: "24px",
                            textShadow: "0px 0px 4px rgba(255, 255, 255, 0.5)",
                        }}
                    >
                        {texts[Math.floor(Math.random() * texts.length)]}
                    </span>
                </div>
            </a>
        </div>
    );
};
