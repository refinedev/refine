import React from "react";
import clsx from "clsx";
import { transform } from "sucrase";
import CodeBlock from "@theme/CodeBlock";
import {
    LiveProvider,
    LiveContext,
    LiveProviderProps,
    LiveError,
    LivePreview,
} from "react-live";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { usePrismTheme } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";
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
 * Get language from className
 */
const getLanguageFromClassName = (className?: string) => {
    const match = className?.match(/language-(\w+)/);
    return match ? match[1] : "";
};

/**
 * Preview with header
 */
function PreviewBase({ url, maxHeight }: { url?: string; maxHeight?: string }) {
    return (
        <>
            <BrowserWindow url={url}>
                <div
                    className={clsx(
                        styles.playgroundPreview,
                        "live-editor-wrapper",
                    )}
                    style={maxHeight ? { maxHeight } : {}}
                >
                    <BrowserOnly fallback={null}>
                        {() => (
                            <>
                                <LivePreview />
                                <LiveError />
                            </>
                        )}
                    </BrowserOnly>
                </div>
            </BrowserWindow>
        </>
    );
}

const Preview = React.memo(
    PreviewBase,
    (prev, next) => prev.maxHeight === next.maxHeight && prev.url === next.url,
);

/**
 * Editor with header
 */
function Editor({ hidden }: { hidden: boolean }) {
    const { code } = React.useContext(LiveContext);
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
                    maxHeight: visible ? "3000px" : "0px",
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

type PlaygroundProps = LiveProviderProps & {
    children?: string;
    className?: string;
    noInline?: boolean;
    hideCode?: boolean;
    previewMaxHeight?: string;
    url?: string;
};

/**
 * Live codeblock component
 */
export default function Playground({
    children,
    className,
    previewMaxHeight,
    noInline = true,
    hideCode = false,
    url = "http://localhost:3000",
    ref: _ref,
    ...props
}: PlaygroundProps): JSX.Element {
    const prismTheme = usePrismTheme();
    const code = String(children).replace(/\n$/, "");
    const { visible } = splitCode(code);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, "50px");

    const [running, setRunning] = React.useState(false);

    React.useEffect(() => {
        if (inView && !running) {
            setRunning(true);
        } else if (!inView && running) {
            setRunning(false);
        }
    }, [inView]);

    return (
        <div className={styles.playgroundContainer} ref={containerRef}>
            {running ? (
                <LiveProvider
                    code={visible}
                    disabled
                    noInline={noInline}
                    transformCode={() => {
                        try {
                            return transform(code, {
                                transforms: ["typescript", "jsx"],
                                production: true,
                            }).code;
                        } catch (err) {
                            return undefined;
                        }
                    }}
                    theme={prismTheme}
                    className={className}
                    language={getLanguageFromClassName(className) as never}
                    {...props}
                >
                    <>
                        <Preview url={url} maxHeight={previewMaxHeight} />
                        <Editor hidden={hideCode} />
                    </>
                </LiveProvider>
            ) : (
                <BrowserWindow url="http://localhost:3000">
                    <div className={clsx(styles.placeholderWrapper)}>
                        <p className={clsx(styles.placeholderTitle)}>
                            Live Preview
                        </p>
                        <button
                            className={clsx(styles.placeholderButton)}
                            onClick={() => setRunning(true)}
                        >
                            Activate
                        </button>
                    </div>
                </BrowserWindow>
            )}
        </div>
    );
}
