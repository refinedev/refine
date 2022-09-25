import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";
import { compressToEncodedURIComponent } from "lz-string";
import { useInView } from "../../hooks/use-in-view";
import { Conditional } from "../conditional";
import { splitCode } from "../../utils/split-code";

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
}: PlaygroundProps): JSX.Element => {
    const code = String(children);
    const { visible } = splitCode(code.replace(/\n$/, ""));
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
                        <Conditional if={inView}>
                            {() => {
                                const previewUrl = `${
                                    customFields.LIVE_PREVIEW_URL
                                }?code=${compressToEncodedURIComponent(code)}${
                                    disableScroll ? "&disableScroll=true" : ""
                                }`;
                                return (
                                    <iframe
                                        src={previewUrl}
                                        width="100%"
                                        height="100%"
                                        // scroll={disableScroll ? "no" : "yes"}
                                        scrolling={disableScroll ? "no" : "yes"}
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            width: "100%",
                                            height: "100%",
                                            overflow: disableScroll
                                                ? "hidden"
                                                : undefined,
                                        }}
                                    />
                                );
                            }}
                        </Conditional>
                    </div>
                </BrowserWindow>
                <Editor hidden={hideCode} code={visible} />
            </>
        </div>
    );
};

export const LivePreview = React.memo(LivePreviewBase, (prev, next) => {
    return String(prev.children) === String(next.children);
});
