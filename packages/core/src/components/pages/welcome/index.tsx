import React, { useState } from "react";

import { useMediaQuery } from "@definitions/helpers";

type CardInfo = {
    title: string;
    description: string;
    link: string;
    icon: React.ReactNode;
};

const CARDS: CardInfo[] = [
    {
        title: "Documentation",
        description:
            "Learn about the technical details of using refine in your projects.",
        link: "https://refine.dev/",
        icon: (
            <svg
                width="14"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1H3a1 1 0 0 1 0-2h10a1 1 0 1 0 0-2H2Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
    {
        title: "Tutorial",
        description:
            "Learn how to use refine by building a fully-functioning CRUD app, from scratch to full launch.",
        link: "https://refine.dev/docs/tutorial/introduction/index/",
        icon: (
            <svg
                width="16"
                height="14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 4.573c0-.475.163-.948.53-1.25a4.57 4.57 0 0 1 .854-.553L5.956.485a4.571 4.571 0 0 1 4.088 0l4.572 2.285c.308.154.594.34.853.553.306.251.47.62.517 1.01.01.055.014.112.014.169v6.5a1 1 0 0 1-2 0V6.684l-3.956 1.978a4.571 4.571 0 0 1-4.088 0L1.384 6.376a4.57 4.57 0 0 1-.853-.553C.163 5.522 0 5.05 0 4.573Z"
                    fill="#fff"
                />
                <path
                    d="M5.061 13.305 3 12.274V9.42l2.061 1.031a6.571 6.571 0 0 0 5.878 0L13 9.421v2.853l-2.061 1.03a6.571 6.571 0 0 1-5.878 0Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
    {
        title: "Examples",
        description:
            "A collection of reference applications you can use as a starting point.",
        link: "https://refine.dev/examples",
        icon: (
            <svg
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4H0V2Zm3 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    fill="#fff"
                />
                <path
                    d="M0 14V8h16v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
    {
        title: "Community",
        description:
            "Join our Discord community and keep up with the latest news.",
        link: "https://discord.gg/refine",
        icon: (
            <svg
                width="16"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.553 1.005A13.334 13.334 0 0 0 10.253 0c-.156.276-.298.56-.423.85a12.42 12.42 0 0 0-3.664 0A8.975 8.975 0 0 0 5.744 0 13.43 13.43 0 0 0 2.44 1.007C.351 4.066-.215 7.05.068 9.99A13.36 13.36 0 0 0 4.116 12c.328-.436.618-.9.867-1.384a8.647 8.647 0 0 1-1.365-.645c.115-.082.227-.167.335-.249a9.594 9.594 0 0 0 8.094 0c.11.089.222.173.335.25-.436.254-.894.47-1.368.646.249.484.539.946.867 1.382a13.3 13.3 0 0 0 4.051-2.01c.332-3.41-.568-6.365-2.379-8.985Zm-8.21 7.176c-.79 0-1.442-.709-1.442-1.58 0-.872.63-1.587 1.439-1.587s1.456.715 1.442 1.586c-.014.872-.636 1.58-1.44 1.58Zm5.315 0c-.79 0-1.44-.709-1.44-1.58 0-.872.63-1.587 1.44-1.587.81 0 1.452.715 1.438 1.586-.014.872-.634 1.58-1.438 1.58Z"
                    fill="#fff"
                />
            </svg>
        ),
    },
];

/**
 * It is a page that welcomes you after the configuration is completed.
 */
export const WelcomePage: React.FC = () => {
    const isTablet = useMediaQuery("(max-width: 1010px)");
    const isMobile = useMediaQuery("(max-width: 650px)");

    const getGridTemplateColumns = () => {
        if (isMobile) {
            return "1, 280px";
        } else if (isTablet) {
            return "2, 280px";
        } else {
            return "4, 208px";
        }
    };

    const getHeaderFontSize = () => {
        if (isMobile) {
            return "32px";
        } else if (isTablet) {
            return "40px";
        } else {
            return "48px";
        }
    };

    const getSubHeaderFontSize = () => {
        if (isMobile) {
            return "16px";
        } else if (isTablet) {
            return "20px";
        } else {
            return "24px";
        }
    };

    return (
        <div
            style={{
                backgroundImage:
                    "url(https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/welcome-page.webp)",
                backgroundPosition: "center top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                backgroundColor: "#0D0D12",
                fontFamily: "Arial",
                color: "#FFFFFF",
            }}
        >
            <div style={{ height: "89px" }}></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src="https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/welcome-logo.webp"
                    width="198"
                    height="54"
                />
            </div>
            <div
                style={{
                    height: isTablet ? "270px" : "22vw",
                    minHeight: isTablet ? "270px" : "313px",
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: getHeaderFontSize(),
                        fontWeight: 700,
                        margin: "0px",
                    }}
                >
                    Welcome Aboard!
                </h1>
                <h4
                    style={{
                        fontSize: getSubHeaderFontSize(),
                        fontWeight: 400,
                        margin: "0px",
                    }}
                >
                    Your configuration is completed.
                </h4>
            </div>
            <div style={{ height: "64px" }}></div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${getGridTemplateColumns()})`,
                    justifyContent: "center",
                    gap: "48px",
                    paddingRight: "16px",
                    paddingLeft: "16px",
                    maxWidth: "976px",
                    margin: "auto",
                }}
            >
                {CARDS.map((card) => (
                    <Card key={`welcome-page-${card.title}`} card={card} />
                ))}
            </div>
            <div style={{ height: "64px" }}></div>
        </div>
    );
};

type CardProps = {
    card: CardInfo;
};

const Card: React.FC<CardProps> = ({ card }) => {
    const { title, description, icon, link } = card;

    const [isHover, setIsHover] = useState(false);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <a
                    onPointerEnter={() => setIsHover(true)}
                    onPointerLeave={() => setIsHover(false)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        textDecoration: "none",
                    }}
                    href={link}
                >
                    {icon}
                    <span
                        style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            marginLeft: "13px",
                            marginRight: "14px",
                        }}
                    >
                        {title}
                    </span>
                    <svg
                        style={{
                            transition:
                                "transform 0.5s ease-in-out, opacity 0.2s ease-in-out",
                            ...(isHover && {
                                transform: "translateX(4px)",
                                opacity: 1,
                            }),
                        }}
                        width="12"
                        height="8"
                        fill="none"
                        opacity="0.5"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.293.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L8.586 5H1a1 1 0 0 1 0-2h7.586L7.293 1.707a1 1 0 0 1 0-1.414Z"
                            fill="#fff"
                        />
                    </svg>
                </a>
            </div>
            <span
                style={{
                    fontSize: "12px",
                    opacity: 0.5,
                    lineHeight: "16px",
                }}
            >
                {description}
            </span>
        </div>
    );
};
