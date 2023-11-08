import clsx from "clsx";
import React, { FC, memo } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwlDark from "prism-react-renderer/themes/nightOwl";
import nightOwlLight from "prism-react-renderer/themes/nightOwlLight";
import { LandingSectionCtaButton } from "./landing-section-cta-button";
type Props = {
    className?: string;
};

export const LandingPureReactCode: FC<Props> = ({ className }) => {
    return (
        <div className={clsx(className)}>
            <div
                className={clsx(
                    "not-prose",
                    "flex-shrink-0",
                    "p-2 landing-sm:p-4",
                    "rounded-3xl",
                    "dark:bg-landing-noise",
                    "dark:bg-gray-800 bg-gray-50",
                )}
            >
                <div
                    className={clsx(
                        "relative",
                        "flex",
                        "flex-col",
                        "rounded-lg",
                        "dark:bg-landing-component-dark bg-landing-component",
                    )}
                >
                    <BrowserOnly>{() => <CodeSlide />}</BrowserOnly>
                    <ReactLogo />
                </div>
                <div
                    className={clsx(
                        "not-prose",
                        "mt-4 landing-sm:mt-6 landing-lg:mt-10",
                        "px-4 landing-sm:px-6",
                    )}
                >
                    <h6
                        className={clsx(
                            "p-0",
                            "font-semibold",
                            "text-base landing-sm:text-2xl",
                            "dark:text-gray-300 text-gray-900",
                        )}
                    >
                        100% Pure React code
                    </h6>
                    <div
                        className={clsx(
                            "not-prose",
                            "flex",
                            "items-center",
                            "justify-between",
                            "flex-wrap",
                            "gap-4 landing-sm:gap-8",
                            "mb-4 landing-sm:mb-6",
                        )}
                    >
                        <p
                            className={clsx(
                                "p-0",
                                "mt-2 landing-sm:mt-4",
                                "text-base",
                                "dark:text-gray-400 text-gray-600",
                            )}
                        >
                            Don’t get locked-in to proprietary, black-box
                            solutions. With refine you have always 100% control
                            over your project.
                        </p>
                        <LandingSectionCtaButton to="https://github.com/refinedev/refine">
                            refine on GitHub
                        </LandingSectionCtaButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReactLogo = () => {
    const { colorMode } = useColorMode();

    return (
        <div
            className={clsx(
                "w-[48px] h-[48px]",
                "absolute",
                "bottom-[16px]",
                "right-[16px]",
                "rounded-lg",
                "z-0",
            )}
        >
            <video
                key={colorMode}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full"
            >
                <source
                    src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/react-${colorMode}.mov`}
                    type="video/mov"
                />
                <source
                    src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/react-${colorMode}.webm`}
                    type="video/webm"
                />
            </video>
        </div>
    );
};

const CodeSlide = () => {
    return (
        <div className={clsx("rounded-lg", "dark:bg-gray-900 bg-gray-0")}>
            <div
                className={clsx(
                    "text-[10px] leading-[16px]",
                    "h-[240px] landing-md:h-[293px]",
                    "font-jetBrains-mono",
                    "select-none",
                    "overflow-hidden",
                    "relative",
                    "z-[1px]",
                    "dark:text-[#d6deeb] text-gray-900",
                    "dark:landing-react-code-mask-dark landing-react-code-mask",
                )}
            >
                <div
                    className={clsx(
                        "will-change-transform animate-code-scroll p-2",
                    )}
                >
                    <HighlightCode />
                    <div className={clsx("h-8")} />
                    <HighlightCode />
                </div>
            </div>
        </div>
    );
};

const HighlightCode = memo(function HighlightCodeBase() {
    const { colorMode } = useColorMode();
    const isDarkTheme = colorMode === "dark";

    const theme = isDarkTheme ? nightOwlDark : nightOwlLight;

    return (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={`${code ?? ""}`.trim()}
            language="tsx"
        >
            {({ tokens, getLineProps, getTokenProps }) => (
                <>
                    {tokens.map((line, i) => (
                        <div
                            {...getLineProps({
                                line,
                            })}
                            key={`${code}-${i}`}
                        >
                            <span
                                className={
                                    "dark:text-gray-600 text-gray-500 pl-4 pr-2"
                                }
                            >
                                {i + 1}
                            </span>
                            {line.map((token, key) => {
                                const { children: _children, ...tokenProps } =
                                    getTokenProps({
                                        token,
                                    });

                                return (
                                    <span
                                        {...tokenProps}
                                        key={`${token.content}-${key}`}
                                        className="whitespace-pre"
                                        dangerouslySetInnerHTML={{
                                            __html: token.content,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </>
            )}
        </Highlight>
    );
});

const code = `
import React from "react";

import { useGo, useList } from "@refinedev/core";

export const List: React.FC = () => {
    const { data, isLoading } = useList();

    const go = useGo();

    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {data?.data?.map((product) => (
                <li key={product.id}>
                    <span>{product.name}</span>
                    <button
                        onClick={() => {
                            go({
                                to: {
                                    resource: "products",
                                    action: "show",
                                    id: product.id,
                                },
                            });
                        }}
                    >
                        show
                    </button>
                </li>
            ))}
        </ul>
    );
};


`;
