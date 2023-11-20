export const CSSRules = [
    `
    .bg-top-announcement {
        border-bottom: 1px solid rgba(71, 235, 235, 0.15);
        background: radial-gradient(
                218.19% 111.8% at 0% 0%,
                rgba(71, 235, 235, 0.1) 0%,
                rgba(71, 235, 235, 0.2) 100%
            ),
            #14141f;
    }
    `,
    `
    .top-announcement-mask {
        mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTS41IDB2Mi43MTdsNC41IDIuNyA0LjUtMi43VjBoMXYyLjcxN2w0LjUgMi43IDQuNS0yLjdWMGguNXYzLjU4M2wtNC41IDIuN3Y0LjQzNGw0LjUgMi43VjE2aC0uNXYtMS43MTdsLTQuNS0yLjctNC41IDIuN1YxNmgtMXYtMS43MTdsLTQuNS0yLjctNC41IDIuN1YxNkgwdi0yLjU4M2w0LjUtMi43VjYuMjgzTDAgMy41ODNWMGguNVptNSA2LjI4MyA0LjUtMi43IDQuNSAyLjd2NC40MzRsLTQuNSAyLjctNC41LTIuN1Y2LjI4M1oiIGZpbGw9IiNmZmYiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDIwdjE2SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+);
        -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTS41IDB2Mi43MTdsNC41IDIuNyA0LjUtMi43VjBoMXYyLjcxN2w0LjUgMi43IDQuNS0yLjdWMGguNXYzLjU4M2wtNC41IDIuN3Y0LjQzNGw0LjUgMi43VjE2aC0uNXYtMS43MTdsLTQuNS0yLjctNC41IDIuN1YxNmgtMXYtMS43MTdsLTQuNS0yLjctNC41IDIuN1YxNkgwdi0yLjU4M2w0LjUtMi43VjYuMjgzTDAgMy41ODNWMGguNVptNSA2LjI4MyA0LjUtMi43IDQuNSAyLjd2NC40MzRsLTQuNSAyLjctNC41LTIuN1Y2LjI4M1oiIGZpbGw9IiNmZmYiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDIwdjE2SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+);
        mask-repeat: repeat;
        -webkit-mask-repeat: repeat;
        background: rgba(71, 235, 235, 0.25);
    }
    `,
    `
    .banner {
        display: flex;
        @media (max-width: 1000px) {
            display: none;
        }
    }`,
    `
    .gh-link, .gh-link:hover, .gh-link:active, .gh-link:visited, .gh-link:focus {
        text-decoration: none;
        z-index: 9;
    }
    `,
    `
    @keyframes top-announcement-glow {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
    `,
];
