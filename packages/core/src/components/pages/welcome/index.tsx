import React from "react";

/**
 * It is a page that welcomes you after the configuration is completed.
 */
export const WelcomePage: React.FC = () => {
    return (
        <>
            <h1>Welcome on board</h1>
            <p>Your configuration is completed.</p>
            <div style={{ display: "flex", gap: 8 }}>
                <a href="https://refine.dev" target="_blank" rel="noreferrer">
                    <button>Documentation</button>
                </a>
                <a
                    href="https://refine.dev/examples"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button>Examples</button>
                </a>
                <a
                    href="https://discord.gg/refine"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button>Community</button>
                </a>
            </div>
        </>
    );
};
