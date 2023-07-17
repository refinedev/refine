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
                    "link-dark": "#6EB3F7",
                    "link-light": "#0080FF",
                    "landing-tile-icon-border": "#4D4DB2",
                    "landing-playground-border": "#4D4DB2",
                    "landing-tile-image-border": "#272762",
                    "landing-stats-fallback-bg": "#242442",
                    "landing-footer-bg": "#0F0F3D",
                    "landing-footer-border": "#2E2E78",
                    "walkthrough-button-bg": "#4D4DB2",
                    "walkthrough-button-alt-bg": "#474E6B",
                    "pricing-table-alt-dark": "#181927",
                    "pricing-table-alt": "#F4F8FB",
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
                "refine-week": {
                    supabase: {
                        "cover-shadow": "rgba(62, 207, 142, 0.25)",
                        "day-indicator-start": "#1FAD66",
                        "day-indicator-stop": "#3ECF8E",
                    },
                    strapi: {
                        "cover-shadow": "rgba(73, 69, 255, 0.25)",
                        "day-indicator-start": "#4945FF",
                        "day-indicator-stop": "#4D88FF",
                    },
                },
            },
            fontFamily: {
                sans: ["Outfit", ...defaultTheme.fontFamily.sans],
                mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
                montserrat: ["Montserrat", ...defaultTheme.fontFamily.serif],
                inter: ["Inter", ...defaultTheme.fontFamily.serif],
            },
            boxShadow: {
                modal: "4px 8px 16px rgba(42, 42, 66, 0.25)",
                tile: "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
                integrationTile: "3px 4px 8px 0 rgba(42, 42, 66, 0.25)",
                tagTile: "3px -2px 8px 0 rgba(42, 42, 66, 0.25)",
                startTiles: "4px 8px 16px rgba(42, 42, 66, 0.25)",
                menuItem: "2px 4px 8px rgba(36, 36, 54, 0.2)",
            },
            backgroundColor: {
                "landing-header-bg": "rgba(10, 10, 41, 0.70)",
                "landing-header-border": "rgba(48, 52, 80, 0.70)",
                "common-header-bg-dark": "rgba(29, 30, 48, 0.70)",
                "common-header-bg-light": "rgba(244, 248, 251, 0.85)",
            },
            backdropBlur: {
                "header-blur": "12px",
            },
            backgroundImage: {
                "walkthrough-button-shadow":
                    "conic-gradient(from 231deg at 50% 50%, #A3A3F5 0%, #4D4DB2 6%, #4D4DB2 44%, #A3A3F5 50%, #4D4DB2 56%, #4D4DB2 94%, #A3A3F5 100%)",
                "walkthrough-button-alt-shadow":
                    "conic-gradient(from 231deg at 50% 50%, #A3A3F5 0%, #474E6B 6%, #474E6B 44%, #A3A3F5 50%, #474E6B 56%, #474E6B 94%, #A3A3F5 100%)",
                "selected-tab-light":
                    "linear-gradient(180deg, rgba(110, 179, 247, 0) 50%, rgba(0, 128, 255, 0.25) 100%)",
                "selected-tab-dark":
                    "linear-gradient(180deg, rgba(110, 179, 247, 0) 50%, rgba(0, 128, 255, 0.25) 100%)",
                "landing-stars": [
                    "linear-gradient(180deg, rgba(10,10,41,0.6) 0%, rgba(10, 10, 41, 0.4) 100%)",
                    "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-stars.webp)",
                    "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
                ],
                "landing-text-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%)",
                "landing-text-bg-alt":
                    "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 80%, rgba(255,255,255,0.4) 100%)",
                "landing-sliding-highlight-bg":
                    "linear-gradient(180deg, #3FDCF7 0%, rgba(63, 220, 247, 0.6) 100%)",
                "landing-rainbow":
                    "conic-gradient(from 180deg at 50% 50%, #3FDCF7 0deg, #1890FF 51.43deg, #6813CB 102.86deg, #FF003D 154.29deg, #FF8A00 205.71deg, #FFD600 257.14deg, #67BE23 308.57deg, #3FDCF7 360deg)",
                "landing-ghost":
                    "conic-gradient(from 90deg at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 10%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0.25) 80%, rgba(255, 255, 255, 0.25) 100%)",
                "landing-hero-video-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-video-bg.webp')",
                "landing-hero-bottom-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-bottom-bg.svg')",
                "landing-hero-mobile-animation-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-mobile-animation.svg')",
                "landing-video-bottom-mobile-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-video-bottom-mobile.svg')",
                "landing-video-bottom-line":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-video-bottom-line.svg')",
                "landing-video-bottom-line-glow":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-video-bottom-line-glow.svg')",
                "landing-linear-spectrum":
                    "linear-gradient(90deg, #FFFE00 0%, #FF9933 12.5%, #FF4C4D 25%, #ED5EC9 37.5%, #8000FF 50%, #3333FF 62.5%, #0080FF 75%, #47EBEB 87.5%, #26D97F 100%)",
                "landing-planar-grid":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid.svg')",
                "landing-planar-grid-reversed":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid-reversed.svg')",
                "landing-planar-grid-mobile":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid-mobile.svg')",
                "landing-planar-grid-reversed-mobile":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid-reversed-mobile.svg')",
                "landing-tile-image-bg":
                    "radial-gradient(50.33% 83.06% at -0.33% 100%, rgba(77, 77, 179, 0.5) 0%, rgba(77, 77, 179, 0) 100%)",
                "landing-tile-tile-bg":
                    "radial-gradient(232% 232% at 100% 100%, rgba(77, 77, 179, 0) 0%, rgba(77, 77, 179, 0.05) 33.33%, rgba(77, 77, 179, 0.1) 66.67%, rgba(77, 77, 179, 0.2) 100%)",
                "landing-tile-border-bg":
                    "radial-gradient(100% 100% at 0% 0%, #4D4DB3 0%, rgba(77, 77, 179, 0.05) 50%, rgba(77, 77, 179, 0.5) 100%)",
                "landing-tile-grid-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-tile-grid.svg')",
                "landing-tile-grid-mobile-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-tile-grid-mobile.svg')",
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
                "landing-playground-slide-left-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-playground-slide-left.svg')",
                "landing-playground-slide-right-bg":
                    "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-playground-slide-right.svg')",
                "hackathon-button-bg":
                    "linear-gradient(90deg, rgba(255, 76, 166, 0.3) 0%, rgba(128, 0, 255, 0.3) 50%, rgba(0, 128, 255, 0.3) 100%);",
                "refine-week-supabase-timeline-item-bg":
                    "linear-gradient(360deg, rgba(62, 207, 142, 0) 0%, rgba(62, 207, 142, 0.25) 50%, rgba(62, 207, 142, 0) 100%)",
                "refine-week-supabase-timeline-item-bg-lg":
                    "linear-gradient(256deg, rgba(62, 207, 142, 0.25) 0%, rgba(62, 207, 142, 0) 60%)",
                "refine-week-strapi-timeline-item-bg":
                    "linear-gradient(360deg, rgba(73, 69, 255, 0) 0%, rgba(73, 69, 255, 0.25) 50%, rgba(73, 69, 255, 0) 100%)",
                "refine-week-strapi-timeline-item-bg-lg":
                    "linear-gradient(256deg, rgba(73, 69, 255, 0.25) 0%, rgba(73, 69, 255, 0) 60%)",
                "pricing-text-bg-red":
                    "linear-gradient(90deg, #FF4C4D 30.89%, #FF9933 48.82%)",
                "pricing-text-bg-green":
                    "linear-gradient(90deg, #0FBDBD 40.72%, #26D97F 51.09%)",
                "pricing-text-bg-enterprise":
                    "linear-gradient(90deg, #FF9933 37.5%, #FF4C4D 73.48%)",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                beat: "2s ease-in-out 1.5s infinite normal forwards running landing-hero-beat",
                "playground-slide-down":
                    "playground-slide-down 45s linear infinite",
                "playground-slide-down-mobile":
                    "playground-slide-down-mobile 45s linear infinite",
                "playground-slide-up":
                    "playground-slide-up 45s linear infinite",
                "playground-slide-up-mobile":
                    "playground-slide-up-mobile 45s linear infinite",
                "hackathon-button-bg":
                    "hackathon-button-bg 2s ease-in-out infinite alternate",
                "walkthrough-bounce":
                    "walkthrough-bounce 3s ease-in-out infinite",
            },
            keyframes: {
                "walkthrough-bounce": {
                    "0%": {
                        transform: "translateY(8%)",
                    },
                    "50%": {
                        transform: "none",
                    },
                    "100%": {
                        transform: "translateY(8%)",
                    },
                },
                "hackathon-button-bg": {
                    "0%": {
                        backgroundPosition: "0% 0%",
                    },
                    "100%": {
                        backgroundPosition: "100% 0%",
                    },
                },
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
                "playground-slide-down-mobile": {
                    "0%": {
                        transform: "translateY(0px)",
                    },
                    "99.99%": {
                        transform: "translateY(-1655px)",
                    },
                    "100%": {
                        transform: "translateY(0px)",
                    },
                },
                "playground-slide-down": {
                    "0%": {
                        transform: "translateY(0px)",
                    },
                    "99.99%": {
                        transform: "translateY(-3329px)",
                    },
                    "100%": {
                        transform: "translateY(0px)",
                    },
                },
                "playground-slide-up-mobile": {
                    "0%": {
                        transform: "translateY(-1655px)",
                    },
                    "99.99%": {
                        transform: "translateY(0px)",
                    },
                    "100%": {
                        transform: "translateY(-1655px)",
                    },
                },
                "playground-slide-up": {
                    "0%": {
                        transform: "translateY(-3328px)",
                    },
                    "99.99%": {
                        transform: "translateY(0px)",
                    },
                    "100%": {
                        transform: "translateY(-3328px)",
                    },
                },
            },
        },
        screens: {
            ...defaultTheme.screens,
            "content-sm": "480px",
            "content-md": "656px",
            "content-2xl": "864px",
            "content-4xl": "1536px",
            "header-sm": "640px",
            "header-md": "1200px",
            "landing-xs": "360px",
            "landing-sm": "480px",
            "landing-md": "640px",
            "landing-content": "944px",
            "landing-lg": "960px",
            "landing-xl": "1200px",
            "landing-2xl": "1440px",
            "landing-footer": "1264px",
            "pricing-content-sm": "640px",
            "pricing-content": "960px",
            "blog-sm": "688px",
            "blog-md": "1000px",
            "blog-lg": "1280px",
            "blog-max": "1408px",
            "blog-xl": "1440px",
            "blog-2xl": "1584px",
            walkthrough: "976px",
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
