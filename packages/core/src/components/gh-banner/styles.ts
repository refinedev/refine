export const CSSRules = [
    `
    .banner::before,
    .banner::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    `,
    `
    .banner::before {
        background-image: linear-gradient(
            270deg,
            rgba(255, 76, 77, 0.35) 0%,
            rgba(255, 153, 51, 0.35) 12.5%,
            rgba(255, 191, 0, 0.35) 25%,
            rgba(38, 217, 127, 0.35) 37.5%,
            rgba(71, 235, 235, 0.35) 50%,
            rgba(0, 128, 255, 0.35) 62.5%,
            rgba(51, 51, 255, 0.35) 75%,
            rgba(128, 0, 255, 0.35) 87.5%,
            rgba(237, 94, 201, 0.35) 100%
        );
        background-position: 0 0;
        background-size: 200% 100%;
        background-repeat: repeat-x;
        animation: bgpos 4s linear infinite;
      }
    `,
    `
    .banner::after {
        background: linear-gradient(
          180deg,
          rgba(13, 13, 13, 0.85) 0%,
          rgba(13, 13, 13, 0) 100%
        );
    }
    `,
    `
    @keyframes bgpos {
        0% {
            background-position: 0 0;
        }

        100% {
            background-position: -200% 0;
        }
    }
    `,
    `
    .gh-link, .gh-link:hover, .gh-link:active, .gh-link:visited, .gh-link:focus {
        text-decoration: none;
        z-index: 9;
    }
    `,
];
