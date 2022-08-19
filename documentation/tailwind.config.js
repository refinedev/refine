const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: "#__docusaurus",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
