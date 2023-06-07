import React from "react";
import clsx from "clsx";
import { useThemeConfig, usePrismTheme } from "@docusaurus/theme-common";
import {
    parseCodeBlockTitle,
    parseLanguage,
    parseLines,
    containsLineNumbers,
    useCodeWordWrap,
} from "@docusaurus/theme-common/internal";
import Highlight, { defaultProps } from "prism-react-renderer";
import Line from "@theme/CodeBlock/Line";
import { CommonCodeBlockContainer } from "./common-codeblock-container";
import { CommonWordWrapButton } from "./common-wordwrap-button";
import { CommonCopyButton } from "./common-copy-button";

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
                "text-sm",
                "leading-6",
                "text-gray-300",
                "border-b",
                "border-b-gray-900",
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
                        "bg-gray-800 bg-opacity-50",
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
                "rounded-lg",
                "bg-gray-700",
                "mb-6",
            )}
        >
            {title && <CodeBlockTitle icon={icon}>{title}</CodeBlockTitle>}
            <div className={clsx("relative", "py-4")}>
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
                                "m-0",
                                "p-0",
                                "font-mono",
                                "thin-scrollbar",
                            )}
                        >
                            <code className={clsx("bg-transparent")}>
                                {tokens.map((line, i) => (
                                    <>
                                        <Line
                                            key={i}
                                            line={line}
                                            getLineProps={getLineProps}
                                            getTokenProps={getTokenProps}
                                            classNames={clsx(
                                                lineClassNames[i],
                                                lineClassNames[i]?.includes(
                                                    "theme-code-block-highlighted-line",
                                                ) &&
                                                    "bg-gray-600 bg-opacity-50",
                                                "px-4",
                                                "text-xs sm:text-sm 2xl:text-base",
                                            )}
                                            showLineNumbers={showLineNumbers}
                                        />
                                    </>
                                ))}
                            </code>
                        </pre>
                    )}
                </Highlight>
                <div
                    className={clsx(
                        "absolute",
                        "right-3",
                        "top-3",
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
            </div>
        </CommonCodeBlockContainer>
    );
};
