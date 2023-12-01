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
                position: "fixed",
                zIndex: 10,
                inset: 0,
                overflow: "auto",
                width: "100dvw",
                height: "100dvh",
            }}
        >
        <div
            style={{
                overflow: "hidden",
                position: "relative",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                background: isMobile
                    ? "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(88.89% 50% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%), radial-gradient(88.89% 50% at 50% 0%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%), #1D1E30"
                    : isTablet
                    ? "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(66.67% 50% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%), radial-gradient(66.67% 50% at 50% 0%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%), #1D1E30"
                    : "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(35.56% 50% at 50% 100%, rgba(38, 217, 127, 0.12) 0%, rgba(38, 217, 127, 0) 100%), radial-gradient(35.56% 50% at 50% 0%, rgba(71, 235, 235, 0.18) 0%, rgba(71, 235, 235, 0) 100%), #1D1E30",
                    minHeight: "100%",
                    minWidth: "100%",
                fontFamily: "Arial",
                color: "#FFFFFF",
            }}
        >
            <div
                style={{
                    zIndex: 2,
                    position: "absolute",
                    width: isMobile ? "400px" : "800px",
                    height: "552px",
                    opacity: "0.5",
                    background:
                        "url(https://refine.ams3.cdn.digitaloceanspaces.com/assets/welcome-page-hexagon.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            />
            <div style={{ height: isMobile ? "40px" : "80px" }}></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <RefineLogoIcon
                    width={isMobile ? 100 : 200}
                    height={isMobile ? 30 : 60}
                />
            </div>
            <div
                style={{
                    height: isMobile ? "120px" : isTablet ? "270px" : "28vw",
                    minHeight: isMobile
                        ? "120px"
                        : isTablet
                        ? "270px"
                        : "270px",
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
            </div>
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

export const RefineLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={80}
        height={24}
        viewBox="0 0 80 24"
        fill="none"
        style={{
            filter: "drop-shadow(0px 1.75px 3.75px rgba(0, 0, 0, 0.59)) drop-shadow(0px 6.75px 6.75px rgba(0, 0, 0, 0.51)) drop-shadow(0px 15.25px 9px rgba(0, 0, 0, 0.30)) drop-shadow(0px 27px 10.75px rgba(0, 0, 0, 0.09)) drop-shadow(0px 42.25px 11.75px rgba(0, 0, 0, 0.01))",
        }}
        {...props}
    >
        <path
            fill="currentColor"
            d="M57.863 17.974V8.996h2.403v8.978h-2.403ZM59.07 7.838a1.28 1.28 0 0 1-.92-.368 1.214 1.214 0 0 1-.377-.894c0-.343.126-.637.378-.883a1.27 1.27 0 0 1 .92-.374c.357 0 .661.125.913.374.256.246.384.54.384.883 0 .347-.128.645-.384.894a1.262 1.262 0 0 1-.914.368ZM64.594 17.974v-5.19c.004-.386.074-.716.209-.989.139-.276.33-.487.575-.63.248-.145.534-.217.858-.217.481 0 .86.156 1.134.467.274.308.41.737.406 1.287v5.272h2.403v-5.717c0-.697-.124-1.297-.372-1.8a2.745 2.745 0 0 0-1.044-1.17c-.448-.272-.972-.408-1.574-.408-.643 0-1.19.154-1.641.462a2.49 2.49 0 0 0-.965 1.239h-.102V8.996h-2.29v8.978h2.403Z"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M73.721 17.588c.643.374 1.41.561 2.302.561.714 0 1.344-.113 1.89-.339.549-.23.996-.55 1.342-.958a3.19 3.19 0 0 0 .694-1.45l-2.222-.152a1.53 1.53 0 0 1-.362.573 1.513 1.513 0 0 1-.57.35 2.201 2.201 0 0 1-.733.117c-.402 0-.75-.087-1.043-.263a1.77 1.77 0 0 1-.683-.748c-.158-.323-.237-.707-.237-1.151v-.006H80v-.684c0-.764-.103-1.43-.31-2-.207-.572-.497-1.047-.869-1.425a3.527 3.527 0 0 0-1.298-.848 4.38 4.38 0 0 0-1.596-.286c-.85 0-1.59.195-2.223.584a3.923 3.923 0 0 0-1.46 1.631c-.347.698-.52 1.508-.52 2.432 0 .947.173 1.767.52 2.46.345.69.838 1.224 1.477 1.602Zm.38-5.01c.015-.322.095-.616.24-.882a1.8 1.8 0 0 1 1.625-.959c.35 0 .657.08.92.24.267.156.476.372.626.649.15.277.226.594.226.953H74.1Z"
            clipRule="evenodd"
        />
        <path
            fill="currentColor"
            d="M56.395 10.866v-1.87h-1.727v-.602c0-.304.07-.54.209-.708.14-.171.386-.257.739-.257.143 0 .282.014.417.041.14.027.256.057.35.088l.429-1.87c-.15-.047-.38-.1-.688-.158a5.372 5.372 0 0 0-1.01-.088c-.545 0-1.032.107-1.461.321a2.39 2.39 0 0 0-1.016.965c-.244.429-.366.968-.366 1.619v.649h-1.224v1.87h1.224v7.108h2.397v-7.108h1.727Z"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M46.19 18.15c-.892 0-1.659-.188-2.302-.562a3.788 3.788 0 0 1-1.478-1.602c-.346-.693-.519-1.514-.519-2.46 0-.924.173-1.734.52-2.432a3.923 3.923 0 0 1 1.46-1.63c.632-.39 1.373-.585 2.223-.585a4.38 4.38 0 0 1 1.596.286c.497.187.93.47 1.298.848.372.378.662.853.869 1.426.207.569.31 1.235.31 1.999v.684h-5.9v.006c0 .444.078.828.236 1.151.162.324.39.573.683.748.293.176.64.263 1.043.263.267 0 .512-.039.734-.116.222-.078.411-.195.57-.351a1.53 1.53 0 0 0 .36-.573l2.223.152a3.19 3.19 0 0 1-.694 1.45c-.346.409-.793.728-1.342.958-.546.226-1.176.34-1.89.34Zm-1.922-5.571h3.637c0-.359-.075-.676-.226-.953a1.647 1.647 0 0 0-.626-.649c-.263-.16-.57-.24-.92-.24a1.8 1.8 0 0 0-1.624.96c-.146.265-.226.56-.24.882ZM32 6.003v11.97h2.443V13.73h1.783l2.188 4.244h2.697l-2.451-4.65.104-.05a3.259 3.259 0 0 0 1.439-1.309c.33-.573.496-1.257.496-2.052 0-.79-.164-1.478-.49-2.063a3.293 3.293 0 0 0-1.417-1.362c-.617-.323-1.361-.485-2.234-.485H32Zm4.101 5.693h-1.658V8.072h1.647c.47 0 .86.072 1.168.217.312.14.543.346.694.62.154.272.23.607.23 1.004 0 .394-.076.723-.23.988-.15.265-.38.464-.689.597-.308.132-.695.198-1.162.198ZM13.789.422a4 4 0 0 0-3.578 0l-8 4A4 4 0 0 0 0 8v8a4 4 0 0 0 2.211 3.578l8 4a4 4 0 0 0 3.578 0l8-4A4 4 0 0 0 24 16V8a4 4 0 0 0-2.211-3.578l-8-4ZM8 8a4 4 0 1 1 8 0v8a4 4 0 0 1-8 0V8Z"
            clipRule="evenodd"
        />
        <path fill="currentColor" d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
);
