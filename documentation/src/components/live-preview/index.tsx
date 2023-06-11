import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import base64url from "base64url";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import CodeBlock from "@theme/CodeBlock";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import { useDocsVersion } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";
import { useInView } from "../../hooks/use-in-view";
import { Conditional } from "../conditional";
import { splitCode } from "../../utils/split-code";
import { useLivePreviewContext } from "../live-preview-context";
import Buffer from "buffer";
import { ArrowUpIcon } from "@site/src/refine-theme/icons/arrow-up";

global.Buffer = global.Buffer || Buffer.Buffer;

/**
 * Live Preview Frame
 */
const LivePreviewFrameBase = ({
    query,
    code,
    css,
}: {
    code: string;
    query?: string;
    css?: string;
}) => {
    const {
        siteConfig: { customFields },
    } = useDocusaurusContext();

    const [url, setUrl] = React.useState<string | undefined>(undefined);

    const compressCode = React.useCallback(
        async (uncompressed: string) => {
            if (typeof window !== "undefined" && window.Worker) {
                const worker = new Worker(
                    `${location.protocol}//${location.host}/workers/lz-worker.js`,
                );
                worker.onmessage = function ({
                    data,
                }: MessageEvent<{ compressed: string | null }>) {
                    if (data.compressed) {
                        setUrl(
                            `${customFields.LIVE_PREVIEW_URL}?code=${
                                data.compressed
                            }${css ? `&css=${base64url.encode(css)}` : ""}${
                                query ? `${query}` : ""
                            }`,
                        );
                    }
                    worker.terminate();
                };
                worker.postMessage({ code: uncompressed });
            }
        },
        [query],
    );

    React.useEffect(() => {
        compressCode(code);
    }, [code, compressCode]);

    if (url) {
        return (
            <iframe
                loading="lazy"
                src={url}
                width="100%"
                height="100%"
                style={{
                    borderRadius: "3px",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
        );
    }

    return null;
};

const LivePreviewFrame = React.memo(LivePreviewFrameBase, (prev, next) => {
    return (
        prev.code === next.code &&
        prev.query === next.query &&
        prev.css === next.css
    );
});

/**
 * Editor with header
 */
function Editor({ hidden, code }: { hidden: boolean; code: string }) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [visible, setVisible] = React.useState(!hidden);
    const [settled, setSettled] = React.useState(!hidden);

    const onToggle = () => {
        if (!visible) {
            setSettled(false);
            setVisible((p) => !p);

            setTimeout(() => {
                setSettled(true);
            }, 300);
        } else {
            setSettled(false);
            setTimeout(() => {
                setVisible((p) => !p);
                setTimeout(() => {
                    setSettled(true);
                }, 300);
            }, 100);
        }
    };

    return (
        <>
            <button
                type="button"
                className={clsx(
                    "w-full",
                    "focus:outline-none",
                    "appearance-none",
                    "p-2",
                    "border-b",
                    "border-b-gray-200 dark:border-b-gray-900",
                    "flex items-center gap-2",
                    "bg-gray-100 dark:bg-gray-700",
                    !visible && "rounded-bl-lg",
                    !visible && "rounded-br-lg",
                    "transition-all ease-in-out duration-200",
                    !visible && "delay-200",
                    "group",
                )}
                onClick={onToggle}
            >
                <div
                    className={clsx(
                        "w-8 h-8",
                        "rounded",
                        "bg-gray-0 dark:bg-gray-800",
                        "dark:bg-opacity-50",
                        "flex items-center justify-center",
                    )}
                >
                    <ArrowUpIcon
                        className={clsx(
                            "transition-transform duration-200 ease-in-out",
                            "text-gray-500",
                            !visible && "rotate-180",
                            "w-3 h-3",
                            "group-hover:w-4 group-hover:h-4",
                            "transition-all duration-200 ease-in-out",
                        )}
                    />
                </div>
                <span
                    className={clsx(
                        "text-sm leading-6",
                        "h-6",
                        "text-gray-700 dark:text-gray-400",
                        "uppercase",
                        "font-semibold",
                        "block",
                        "overflow-hidden",
                    )}
                >
                    <span
                        className={clsx(
                            "block",
                            visible && "opacity-0",
                            "transition-opacity duration-200 ease-in-out",
                        )}
                    >
                        Show Code
                    </span>
                    <span
                        className={clsx(
                            "block",
                            "transition-transform duration-200 ease-in-out",
                            "bg-gray-100 dark:bg-gray-700",
                            visible && "-translate-y-6",
                        )}
                    >
                        Hide Code
                    </span>
                </span>
            </button>
            <div
                className={clsx(
                    "bg-gray-700",
                    "rounded-bl-lg",
                    "rounded-br-lg",
                )}
                style={{
                    maxHeight: visible ? (settled ? "unset" : "100vh") : "0px",
                    transition: "0.3s all ease-in-out",
                    overflow: "hidden",
                }}
                ref={ref}
            >
                <CodeBlock
                    language="tsx"
                    style={{
                        borderRadius: 0,
                        marginBottom: 0,
                    }}
                >
                    {code}
                </CodeBlock>
            </div>
        </>
    );
}

type PlaygroundProps = {
    children?: string;
    className?: string;
    disableScroll?: boolean;
    noInline?: boolean;
    hideCode?: boolean;
    previewHeight?: string;
    url?: string;
    previewOnly?: boolean;
    tailwind?: boolean;
};

/**
 * Live codeblock component
 */
const LivePreviewBase = ({
    children,
    disableScroll,
    previewHeight,
    hideCode = false,
    url = "http://localhost:3000",
    previewOnly = false,
    tailwind = false,
}: PlaygroundProps): JSX.Element => {
    const code = String(children);
    const { shared, sharedCss } = useLivePreviewContext();
    const { visible } = splitCode(
        `
    ${shared ?? ""}
    ${code}
    `.replace(/\n$/, ""),
    );
    const ref = React.useRef(null);

    const inView = useInView(ref);

    const {
        siteConfig: { customFields },
    } = useDocusaurusContext();

    const { isLast } = useDocsVersion();

    return (
        <div className={clsx("overflow-hidden", "mb-6")}>
            <>
                <BrowserWindow url={url} hasBottom={!previewOnly}>
                    <div
                        className={clsx(
                            styles.playgroundPreview,
                            "live-editor-wrapper",
                        )}
                        style={{
                            maxHeight: previewHeight,
                            minHeight: previewHeight,
                            overflow: disableScroll ? "hidden" : undefined,
                            position: "relative",
                        }}
                        ref={ref}
                    >
                        {isLast ? (
                            <Conditional if={inView} maxWait={3000}>
                                {() => {
                                    return (
                                        <LivePreviewFrame
                                            code={`
${shared ?? ""}
${code}
                                        `}
                                            css={sharedCss}
                                            query={`${
                                                disableScroll
                                                    ? "&disableScroll=true"
                                                    : ""
                                            }${
                                                tailwind ? "&tailwind=true" : ""
                                            }`}
                                        />
                                    );
                                }}
                            </Conditional>
                        ) : (
                            <div
                                style={{
                                    height: "100%",
                                    minHeight: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.25rem",
                                }}
                            >
                                <span>
                                    Live previews only work with the latest
                                    documentation.
                                </span>
                            </div>
                        )}
                    </div>
                </BrowserWindow>
                {!previewOnly && <Editor hidden={hideCode} code={visible} />}
            </>
        </div>
    );
};

export const LivePreview = React.memo(LivePreviewBase, (prev, next) => {
    return String(prev.children) === String(next.children);
});
