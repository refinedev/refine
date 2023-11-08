import React from "react";
import clsx from "clsx";
import { ShowcaseIndicator } from "./showcase-indicator";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import dedent from "dedent";
import { motion } from "framer-motion";

type HighlightProps = {
    render: string;
    code: string;
    x: string | number;
    y: string | number;
    width: string | number;
    height: string | number;
    codeClassName?: string;
    codePosition: "top" | "bottom" | "left" | "right";
};

type Props = {
    className?: string;
    render: string;
    highlights?: Array<HighlightProps>;
};

const HighlightItem = React.memo(function HighlightBase({
    render,
    code,
    x,
    y,
    width,
    height,
    codeClassName,
    codePosition,
}: HighlightProps) {
    return (
        <div
            className={clsx(
                "absolute",
                "group/highlight",
                "pointer-events-none",
                "hover:z-[5]",
            )}
            style={{
                left: x,
                top: y,
                width,
                height,
            }}
        >
            <img
                style={{
                    position: "absolute",
                    width,
                    height,
                    left: 0,
                    top: 0,
                }}
                width={width}
                height={height}
                src={render}
                className={clsx(
                    "z-[2]",
                    "group-hover/highlight:drop-shadow-lg",
                    "pointer-events-auto",
                    "transition-[filter] ease-in-out duration-200",
                )}
            />
            <ShowcaseIndicator
                key={`${x}-${y}`}
                x={Number(0) - 16}
                y={Number(0) - 16}
                className={clsx(
                    "z-[2]",
                    "duration-200 ease-in-out transition-opacity",
                    "opacity-100",
                    "group-hover/highlight:opacity-0",
                )}
            />
            <div
                className={clsx(
                    "z-[6]",
                    "absolute",
                    "pointer-events-none",
                    "group-hover/highlight:pointer-events-auto",
                    "opacity-0 group-hover/highlight:opacity-100",
                    "scale-0 group-hover/highlight:scale-100",
                    "duration-200 ease-in-out transition-[transform,opacity]",
                    {
                        "origin-top-left":
                            codePosition === "bottom" ||
                            codePosition === "right",
                        "origin-bottom-left": codePosition === "top",
                        "origin-top-right": codePosition === "left",
                    },
                    codeClassName,
                )}
                style={{
                    ...(codePosition === "bottom"
                        ? {
                              left: 0,
                              top: Number(height),
                              paddingTop: 20,
                          }
                        : {}),
                    ...(codePosition === "top"
                        ? {
                              left: 0,
                              bottom: height,
                              paddingBottom: 20,
                          }
                        : {}),
                    ...(codePosition === "left"
                        ? {
                              right: width,
                              top: 0,
                              paddingRight: 20,
                          }
                        : {}),
                    ...(codePosition === "right"
                        ? {
                              left: width,
                              top: 0,
                              paddingLeft: 20,
                          }
                        : {}),
                }}
            >
                <div
                    className={clsx(
                        "bg-gray-900",
                        "py-4 px-3",
                        "rounded-xl",
                        "text-gray-0",
                        "whitespace-nowrap",
                        "break-keep",
                        "text-xs leading-5",
                        "tracking-tight",
                        "font-mono",
                    )}
                >
                    <Highlight
                        {...defaultProps}
                        theme={theme}
                        code={dedent(`${code ?? ""}`).trim()}
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
                                        {line.map((token, key) => {
                                            const content =
                                                `${token.content}`.replace(
                                                    "___",
                                                    "&nbsp;&nbsp;&nbsp;&nbsp;",
                                                );

                                            const {
                                                children: _children,
                                                ...tokenProps
                                            } = getTokenProps({
                                                token,
                                            });

                                            return (
                                                <span
                                                    {...tokenProps}
                                                    key={`${token.content}-${key}`}
                                                    className="whitespace-pre"
                                                    dangerouslySetInnerHTML={{
                                                        __html: content,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </>
                        )}
                    </Highlight>
                </div>
            </div>
        </div>
    );
});

export const ShowcaseWrapper = React.memo(
    function ShowcaseWrapperBase({ className, render, highlights }: Props) {
        const [mounted, setMounted] = React.useState(false);

        React.useEffect(() => {
            const t = setTimeout(() => {
                setMounted(true);
            }, 500);

            return () => {
                clearTimeout(t);
            };
        }, []);

        return (
            <motion.div
                className={clsx(className)}
                initial={{
                    opacity: 0,
                    y: "-100%",
                    // z: 0,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    // z: 0,
                }}
                transition={{
                    duration: 0.2,
                    type: "spring",
                    damping: 10,
                    stiffness: 50,
                }}
                exit={{
                    opacity: 0,
                    y: "100%",
                    // z: 0,
                }}
            >
                <svg
                    width={1168}
                    height={736}
                    viewBox="0 0 1168 736"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={clsx(
                        "relative",
                        "w-full",
                        "h-auto",
                        "pointer-events-none",
                    )}
                >
                    <image
                        x={0}
                        y={0}
                        width={1168}
                        height={736}
                        href={render}
                    />
                    {mounted && (
                        <motion.foreignObject
                            x={0}
                            y={0}
                            width={1168}
                            height={736}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            className="relative group/all pointer-events-none hidden landing-md:block"
                        >
                            <div
                                className={clsx(
                                    "absolute",
                                    "left-0",
                                    "top-0",
                                    "pointer-events-none",
                                    "opacity-0",
                                    "duration-150",
                                    "ease-in-out",
                                    "transition-opacity",
                                    "group-hover/all:opacity-100",
                                    "group-hover/all:z-[3]",
                                    "bg-gray-0",
                                    "bg-opacity-20",
                                    "backdrop-blur-sm",
                                    "w-full",
                                    "h-full",
                                )}
                            ></div>
                            {highlights.map((h) => (
                                <HighlightItem key={`${h.x}-${h.y}`} {...h} />
                            ))}
                        </motion.foreignObject>
                    )}
                </svg>
            </motion.div>
        );
    },
    (prev, next) =>
        prev.render === next.render && prev.className === next.className,
);
