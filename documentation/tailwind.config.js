const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class", '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            zIndex: {
                modal: 100,
            },
            colors: {
                discord: "#5865F2",
                twitter: "#00AAEC",
                refine: {
                    red: "#FF4C4D",
                    orange: "#FF9933",
                    yellow: "#FFBF00",
                    green: "#1FAD66",
                    cyan: "#0FBDBD",
                    blue: "#0080FF",
                    indigo: "#3333FF",
                    purple: "#8000FF",
                    pink: "#ED5EC9",
                    bg: "#0A0A29",
                    kdb: "#DBDBF0",
                    "bg-alt": "#262640",
                    link: "#6EB3F7",
                    "landing-tile-icon-border": "#4D4DB2",
                    "landing-playground-border": "#4D4DB2",
                    "landing-tile-image-border": "#272762",
                    "landing-stats-fallback-bg": "#242442",
                    "landing-footer-bg": "#0F0F3D",
                    "landing-footer-border": "#2E2E78",
                },
                gray: {
                    0: "#FFFFFF",
                    50: "#F4F8FB",
                    100: "#EDF2F7",
                    200: "#DEE5ED",
                    300: "#CFD7E2",
                    400: "#A3ADC2",
                    500: "#6C7793",
                    600: "#474E6B",
                    700: "#303450",
                    800: "#1D1E30",
                    900: "#14141F",
                    1000: "#000000",
                },
            },
            fontFamily: {
                sans: ["Outfit", ...defaultTheme.fontFamily.sans],
                mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
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
            backgroundImage: {
                "landing-stars": [
                    "linear-gradient(180deg, rgba(10,10,41,0.6) 0%, rgba(10, 10, 41, 0.4) 100%)",
                    "url(/assets/landing-stars.webp)",
                ],
                "landing-text-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%)",
                "landing-sliding-highlight-bg":
                    "linear-gradient(180deg, #3FDCF7 0%, rgba(63, 220, 247, 0.6) 100%)",
                "landing-rainbow":
                    "conic-gradient(from 180deg at 50% 50%, #3FDCF7 0deg, #1890FF 51.43deg, #6813CB 102.86deg, #FF003D 154.29deg, #FF8A00 205.71deg, #FFD600 257.14deg, #67BE23 308.57deg, #3FDCF7 360deg)",
                "landing-ghost":
                    "conic-gradient(from 90deg at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 10%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0.25) 80%, rgba(255, 255, 255, 0.25) 100%)",
                "landing-hero-video-bg": "url('/assets/hero-video-bg.webp')",
                "landing-hero-bottom-bg": "url('/assets/hero-bottom-bg.svg')",
                "landing-hero-mobile-animation-bg":
                    "url('/assets/hero-mobile-animation.svg')",
                "landing-video-bottom-mobile-bg":
                    "url('/assets/hero-video-bottom-mobile.svg')",
                "landing-video-bottom-line":
                    "url('/assets/landing-video-bottom-line.svg')",
                "landing-video-bottom-line-glow":
                    "url('/assets/landing-video-bottom-line-glow.svg')",
                "landing-linear-spectrum":
                    "linear-gradient(90deg, #FFFE00 0%, #FF9933 12.5%, #FF4C4D 25%, #ED5EC9 37.5%, #8000FF 50%, #3333FF 62.5%, #0080FF 75%, #47EBEB 87.5%, #26D97F 100%)",
                "landing-planar-grid": "url('/assets/landing-planar-grid.svg')",
                "landing-planar-grid-reversed":
                    "url('/assets/landing-planar-grid-reversed.svg')",
                "landing-planar-grid-mobile":
                    "url('/assets/landing-planar-grid-mobile.svg')",
                "landing-planar-grid-reversed-mobile":
                    "url('/assets/landing-planar-grid-reversed-mobile.svg')",
                "landing-tile-image-bg":
                    "radial-gradient(50.33% 83.06% at -0.33% 100%, rgba(77, 77, 179, 0.5) 0%, rgba(77, 77, 179, 0) 100%)",
                "landing-tile-tile-bg":
                    "radial-gradient(232% 232% at 100% 100%, rgba(77, 77, 179, 0) 0%, rgba(77, 77, 179, 0.05) 33.33%, rgba(77, 77, 179, 0.1) 66.67%, rgba(77, 77, 179, 0.2) 100%)",
                "landing-tile-border-bg":
                    "radial-gradient(100% 100% at 0% 0%, #4D4DB3 0%, rgba(77, 77, 179, 0.05) 50%, rgba(77, 77, 179, 0.5) 100%)",
                "landing-tile-grid-bg": "url('/assets/landing-tile-grid.svg')",
                "landing-tile-grid-mobile-bg":
                    "url('/assets/landing-tile-grid-mobile.svg')",
                "landing-stats-bg": [
                    "radial-gradient(59.21% 56.25% at 0% 0%, #17174F 0%, rgba(23, 23, 79, 0) 100%)",
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.33) 0%, rgba(0, 0, 0, 0.165) 100%)",
                ],
                "landing-stats-border-bg":
                    "conic-gradient(from -90deg at 50% 50%, rgba(77, 77, 179, 0) 0deg, #4D4DB3 39.37deg, rgba(77, 77, 179, 0) 86.25deg, rgba(77, 77, 179, 0) 198.75deg, #4D4DB3 232.5deg, rgba(77, 77, 179, 0) 275.62deg, rgba(77, 77, 179, 0) 360deg)",
                "landing-playground-bg": [
                    "linear-gradient(90deg, rgba(23, 23, 79, 0) 0%, #17174F 100%)",
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.165) 0%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 0.165) 100%)",
                ],
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                beat: "2s ease-in-out 1.5s infinite normal forwards running landing-hero-beat",
            },
            keyframes: {
                "landing-hero-beat": {
                    "0%": {
                        opacity: 0.4,
                    },
                    "5%": {
                        opacity: 0.4,
                    },
                    "50%": {
                        opacity: 1,
                    },
                    "95%": {
                        opacity: 0.4,
                    },
                    "100%": {
                        opacity: 0.4,
                    },
                },
            },
        },
        screens: {
            ...defaultTheme.screens,
            "content-sm": "480px",
            "content-md": "656px",
            "content-2xl": "864px",
            "header-sm": "640px",
            "header-md": "1200px",
            "landing-xs": "360px",
            "landing-sm": "480px",
            "landing-md": "640px",
            "landing-content": "944px",
            "landing-lg": "960px",
            "landing-xl": "1200px",
            "landing-2xl": "1440px",
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/typography"),
    ],
    corePlugins: {
        // preflight: false,
    },
};
