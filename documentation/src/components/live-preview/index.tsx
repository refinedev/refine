import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";
import { useInView } from "../../hooks/use-in-view";
import { Conditional } from "../conditional";
import { splitCode } from "../../utils/split-code";
import { useLivePreviewContext } from "../live-preview-context";

/**
 * Live Preview Frame
 */
const LivePreviewFrameBase = ({
    query,
    code,
}: {
    code: string;
    query?: string;
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
                            }${query ? `${query}` : ""}`,
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
    return prev.code === next.code && prev.query === next.query;
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
                className={clsx(styles.playgroundEditorWrapper)}
                style={{
                    maxHeight: visible ? "4500px" : "0px",
                    padding: visible ? undefined : "0px",
                    transition: "0.3s max-height ease-in-out",
                    overflow: "hidden",
                }}
            >
                <CodeBlock language="tsx" style={{ borderRadius: 0 }}>
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
    const { shared } = useLivePreviewContext();
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
                        <Conditional if={inView} maxWait={3000}>
                            {() => {
                                return (
                                    <LivePreviewFrame
                                        code={`
${shared ?? ""}
${code}
                                        `}
                                        query={`${
                                            disableScroll
                                                ? "&disableScroll=true"
                                                : ""
                                        }${tailwind ? "&tailwind=true" : ""}`}
                                    />
                                );
                            }}
                        </Conditional>
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
