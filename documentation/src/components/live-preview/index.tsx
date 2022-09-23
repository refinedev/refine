import React from "react";
import clsx from "clsx";
// @ts-expect-error Docusaurus components has an issue with TypeScript
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";
import { compressToEncodedURIComponent } from "lz-string";
import { useInView } from "../../hooks/use-in-view";

/**
 * This function will split code by the visible-block-start and visible-block-end comments and returns the visible block and join function.
 * @param {string} code code to be splitted by `// visible-block-start` and `// visible-block-end`
 */
const splitCode = (code?: string) => {
    const beginningComment = "// visible-block-start";
    const endingComment = "// visible-block-end";

    let beginning = code.indexOf(beginningComment);
    beginning = beginning > 0 ? beginning + beginningComment.length : 0;

    let ending = code.indexOf(endingComment);
    ending = ending > 0 ? ending : code.length;

    const aboveHidden = code.slice(0, beginning);
    const visible = code.slice(beginning, ending).trimEnd().trimStart();
    const belowHidden = code.slice(ending);

    return {
        visible,
        join: (code: string) => `${aboveHidden}\n${code}\n${belowHidden}`,
    };
};

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
    const code = String(children).replace(/\n$/, "");
    const { visible } = splitCode(code);
    const ref = React.useRef(null);

    const inView = useInView(ref);

    const previewUrl = `http://localhost:3001/preview/${compressToEncodedURIComponent(
        code,
    )}`;

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
                        {inView && (
                            <iframe
                                src={previewUrl}
                                width="100%"
                                height="100%"
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
                        )}
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
