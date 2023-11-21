import { usePrismTheme, useThemeConfig } from "@docusaurus/theme-common";
import {
    containsLineNumbers,
    parseCodeBlockTitle,
    parseLanguage,
    parseLines,
    useCodeWordWrap,
} from "@docusaurus/theme-common/internal";
import Line from "@theme/CodeBlock/Line";
import clsx from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import React from "react";
import { CommonCodeBlockContainer } from "./common-codeblock-container";
import { CommonCopyButton } from "./common-copy-button";
import { CommonWordWrapButton } from "./common-wordwrap-button";

const CodeBlockTitle = ({
    children,
    icon,
}: {
    children?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={clsx(
                "py-3",
                "px-4",
                "text-[13px]",
                "leading-5",
                "text-gray-600",
                "dark:text-gray-300",

                "border-b",
                "dark:border-b-gray-700",
                "font-mono",
                "flex items-center",
                "gap-2",
            )}
        >
            {icon && (
                <div
                    className={clsx(
                        "-mt-1",
                        "-ml-2",
                        "-mb-1",
                        "w-8 h-8",
                        "rounded",
                        // "bg-gray-800 bg-opacity-50",
                        "flex items-center justify-center",
                    )}
                >
                    {icon}
                </div>
            )}
            {children}
        </div>
    );
};

export const CodeBlockString = ({
    children,
    className: blockClassName = "",
    metastring,
    title: titleProp,
    showLineNumbers: showLineNumbersProp,
    language: languageProp,
    icon,
    style,
}) => {
    const {
        prism: { defaultLanguage, magicComments },
    } = useThemeConfig();
    const language =
        languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage;
    const prismTheme = usePrismTheme();
    const wordWrap = useCodeWordWrap();
    // We still parse the metastring in case we want to support more syntax in the
    // future. Note that MDX doesn't strip quotes when parsing metastring:
    // "title=\"xyz\"" => title: "\"xyz\""
    const title = parseCodeBlockTitle(metastring) || titleProp;

    const { lineClassNames, code } = parseLines(children, {
        metastring,
        language,
        magicComments,
    });

    const showLineNumbers =
        showLineNumbersProp ?? containsLineNumbers(metastring);

    return (
        <CommonCodeBlockContainer
            as="div"
            className={clsx(
                language && `language-${language}`,
                "rounded-md",
                // "bg-gray-700",
                "bg-gray-50",
                "dark:bg-gray-800",
                "border",
                "dark:border-gray-700",
                "mb-6",
                "relative",
            )}
            style={style}
        >
            {title && <CodeBlockTitle icon={icon}>{title}</CodeBlockTitle>}
            <div className={clsx("relative", "pt-3", "pb-0", "not-prose")}>
                <Highlight
                    {...defaultProps}
                    theme={prismTheme}
                    code={code}
                    language={language ?? "text"}
                >
                    {({ className, tokens, getLineProps, getTokenProps }) => (
                        <pre
                            tabIndex={0}
                            ref={wordWrap.codeBlockRef}
                            className={clsx(
                                className,
                                "bg-transparent",
                                "!mt-0",
                                "!mb-0",
                                "m-0",
                                "px-0",
                                "pt-0",
                                "font-mono",
                                "pb-3",
                            )}
                        >
                            <code
                                className={clsx(
                                    "bg-transparent",
                                    "inline-block",
                                    "min-w-full",
                                )}
                            >
                                {tokens.map((line, i) => (
                                    <Line
                                        key={i}
                                        line={line}
                                        getLineProps={getLineProps}
                                        getTokenProps={getTokenProps}
                                        classNames={clsx(
                                            lineClassNames[i],
                                            "px-4",
                                            "text-xs sm:text-sm 2xl:text-sm",
                                        )}
                                        showLineNumbers={showLineNumbers}
                                    />
                                ))}
                            </code>
                        </pre>
                    )}
                </Highlight>
            </div>
            <div
                className={clsx(
                    "absolute",
                    "right-3",
                    title ? "top-1.5" : "top-[9px]",
                    "flex items-center gap-2",
                )}
            >
                {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
                    <CommonWordWrapButton
                        onClick={wordWrap.toggle}
                        isEnabled={wordWrap.isEnabled}
                    />
                )}
                <CommonCopyButton className={clsx()} code={code} />
            </div>
        </CommonCodeBlockContainer>
    );
};
