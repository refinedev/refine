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
    const [visible, setVisible] = React.useState(!hidden);

    return (
        <>
            <div className={clsx(styles.playgroundHeader)}>
                <button
                    className={clsx(styles.headerButton)}
                    onClick={() => setVisible((p) => !p)}
                >
                    {visible ? "Hide" : "Show"} Code
                </button>
            </div>
            <div
                className={clsx(
                    styles.playgroundEditorWrapper,
                    "playground-code",
                    visible && "playground-code-visible",
                )}
                style={{
                    maxHeight: visible ? "4500px" : "0px",
                    padding: visible ? undefined : "0px",
                    transition: "0.3s all ease-in-out",
                    overflow: "hidden",
                }}
            >
                <CodeBlock
                    language="tsx"
                    style={{
                        borderRadius: 0,
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
        <div className={styles.playgroundContainer}>
            <>
                <BrowserWindow url={url}>
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
