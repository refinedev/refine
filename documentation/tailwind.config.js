const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: "#__docusaurus",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                discord: "#5865F2",
                twitter: "#00AAEC",
            },
            fontFamily: {
                montserrat: ["Montserrat", ...defaultTheme.fontFamily.serif],
                inter: ["Inter", ...defaultTheme.fontFamily.serif],
            },
            boxShadow: {
                githubFloatingCta: "4px 8px 16px rgba(42, 42, 66, 0.25)",
                modal: "4px 8px 16px rgba(42, 42, 66, 0.25)",
                tile: "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                integrationTile: "3px 4px 8px 0 rgba(42, 42, 66, 0.25)",
                tagTile: "3px -2px 8px 0 rgba(42, 42, 66, 0.25)",
                startTiles: "4px 8px 16px rgba(42, 42, 66, 0.25)",
                menuItem: "2px 4px 8px rgba(36, 36, 54, 0.2)",
            },
            screens: {
                short: { raw: "(max-height: 650px) and (min-width: 1024px)" },
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        plugin(function ({ addVariant }) {
            addVariant("is-firefox", "@supports (-moz-appearance:none)");
        }),
    ],
    corePlugins: {
        preflight: false,
    },
};
