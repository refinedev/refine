import React from "react";
import clsx from "clsx";
import { transform } from "sucrase";
import useIsBrowser from "@docusaurus/useIsBrowser";
import {
    LiveProvider,
    LiveProviderProps,
    LiveEditor,
    LiveError,
    LivePreview,
} from "react-live";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { usePrismTheme } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import BrowserWindow from "../../components/browser-window";

/**
 * This function will split code by the visible-block-start and visible-block-end comments and returns the visible block and join function.
 * @param {string} code code to be splitted by `// visible-block-start` and `// visible-block-end`
 */
const splitCode = (code?: string) => {
    const beginningComment = "// visible-block-start";
    const endingComment = "// visible-block-end";

    let beginning = code.indexOf(beginningComment);
    beginning = beginning > 0 ? beginning + beginningComment.length : beginning;

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
function Preview({ url, maxHeight }: { url?: string; maxHeight?: string }) {
    return (
        <>
            <BrowserWindow url={url}>
                <div
                    className={styles.playgroundPreview}
                    style={maxHeight ? { maxHeight } : {}}
                >
                    <BrowserOnly fallback={null}>
                        {() => (
                            <>
                                {/* @ts-expect-error Type inconsistency between the plugin and the current setup */}
                                <LivePreview />
                                {/* @ts-expect-error Type inconsistency between the plugin and the current setup */}
                                <LiveError />
                            </>
                        )}
                    </BrowserOnly>
                </div>
            </BrowserWindow>
        </>
    );
}

/**
 * Editor with current prism theme
 */
function ThemedLiveEditor() {
    const isBrowser = useIsBrowser();

    return (
        // @ts-expect-error Type inconsistency between the plugin and the current setup
        <LiveEditor
            // We force remount the editor on hydration,
            // otherwise dark prism theme is not applied
            key={String(isBrowser)}
            className={styles.playgroundEditor}
        />
    );
}

/**
 * Editor with header
 */
function Editor({ hide }: { hide?: boolean }) {
    const [visible, setVisible] = React.useState(!hide);

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
                style={{
                    maxHeight: visible ? "3000px" : "0px",
                    transition: "0.3s max-height ease-in-out",
                }}
            >
                <ThemedLiveEditor />
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
    ...props
}: PlaygroundProps): JSX.Element {
    const prismTheme = usePrismTheme();
    const code = String(children).replace(/\n$/, "");
    const { visible } = splitCode(code);

    return (
        <div className={styles.playgroundContainer}>
            {/* @ts-expect-error: type incompatibility with refs */}
            <LiveProvider
                code={visible}
                disabled
                noInline={noInline}
                transformCode={() => {
                    try {
                        return transform(code, {
                            transforms: ["typescript", "jsx"],
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
                    <Editor hide={hideCode} />
                </>
            </LiveProvider>
        </div>
    );
}
