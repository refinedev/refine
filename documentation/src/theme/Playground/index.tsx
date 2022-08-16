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
import { importReplacer, packageResolve } from "../ReactLiveScope";

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
function PreviewBase() {
    return (
        <>
            <BrowserOnly fallback={null}>
                {() => (
                    <>
                        <LivePreview />
                        <LiveError />
                    </>
                )}
            </BrowserOnly>
        </>
    );
}

const Preview = React.memo(PreviewBase, () => true);

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

/**
 * Placeholder
 */
const Placeholder = ({
    height,
    onClick,
}: {
    height?: string | number;
    onClick: () => void;
}) => {
    return (
        <div
            className={clsx(styles.placeholderWrapper)}
            style={height ? { height } : {}}
        >
            <p className={clsx(styles.placeholderTitle)}>Live Preview</p>
            <button
                className={clsx(styles.placeholderButton)}
                onClick={onClick}
            >
                Activate
            </button>
        </div>
    );
};

type PlaygroundProps = LiveProviderProps & {
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
export default function Playground({
    children,
    className,
    disableScroll,
    previewHeight,
    noInline = true,
    hideCode = false,
    ref: _ref,
    scope,
    url = "http://localhost:3000",
    ...props
}: PlaygroundProps): JSX.Element {
    const prismTheme = usePrismTheme();
    const code = String(children).replace(/\n$/, "");
    const { visible } = splitCode(code);
    const [modules, setModules] = React.useState<Record<string, unknown>>({});

    React.useEffect(() => {
        (async () => {
            const _modules = await packageResolve(code);
            setModules(_modules);
        })();
    }, [code]);

    return (
        <div className={styles.playgroundContainer}>
            <LiveProvider
                code={visible}
                disabled
                noInline={noInline}
                transformCode={() => {
                    try {
                        return transform(importReplacer(code), {
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
                scope={{ ...scope, ...modules }}
            >
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
                            }}
                        >
                            {Object.keys(modules).length > 0 ? (
                                <Preview />
                            ) : null}
                        </div>
                    </BrowserWindow>
                    <Editor hidden={hideCode} />
                </>
            </LiveProvider>
        </div>
    );
}
