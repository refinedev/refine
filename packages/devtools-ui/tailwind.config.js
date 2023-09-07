const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{ts,tsx}"],
    prefix: "re-",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                gray: {
                    0: "#ffffff",
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
                    1000: "#0A0A15",
                },
                brand: {
                    blue: "#0080FF",
                },
                alt: {
                    blue: "#6EB3F7",
                    cyan: "#47EBEB",
                    green: "#26D97F",
                    red: "#FF4C4D",
                    yellow: "#FFBF00",
                },
            },
        },
    },
    plugins: [],
};
