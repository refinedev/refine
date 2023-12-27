import clsx from "clsx";
import React from "react";

import type {
    CodeEditorProps,
    SandpackFiles,
    SandpackInternal,
    SandpackInternalOptions,
    SandpackPredefinedTemplate,
    TemplateFiles,
} from "@codesandbox/sandpack-react";

import { nightOwl, aquaBlue } from "@codesandbox/sandpack-themes";

import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackFileExplorer,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider,
} from "@codesandbox/sandpack-react";

import { useColorMode } from "@docusaurus/theme-common";

import { BugReportButton } from "./bug-report-button";
import { BugReportModal } from "./bug-report-modal";
import { DragHandle } from "./drag-handle";
import { useResizable } from "./use-resizable";

type Props = React.ComponentProps<SandpackInternal> & {
    startRoute?: string;
    showOpenInCodeSandbox?: boolean;
    showNavigator?: boolean;
    showLineNumbers?: boolean;
    initialPercentage?: number;
    dependencies?: React.ComponentProps<SandpackInternal>["customSetup"]["dependencies"];
    height?: number;
    previewOnly?: boolean;
    layout?: "row" | "col" | "col-reverse";
    className?: string;
    wrapperClassName?: string;
    showFiles?: boolean;
    showReadOnly?: boolean;
    showConsole?: boolean;
    hidePreview?: boolean;
};

export const Sandpack = (props: Props) => {
    if (props?.template === "nextjs") {
        return <SandpackNextJS {...props} />;
    }

    return <SandpackBase {...props} />;
};
/**
 * We're using a custom sandpack component and customized some of its features and props.
 *
 * Set `dependencies` to add dependencies.
 *
 * Set `height` property to set the height of the editor. Default is 420.
 *
 * Set `previewOnly` to true to hide the editor.
 *
 * Set `layout` to "col" or "col-reverse" to enforce column layout.
 *
 * Set `initialPercentage` to set the initial percentage of the editor width.
 *
 * Set `startRoute` to set the initial route of the preview.
 */
const SandpackBase = ({
    startRoute,
    showNavigator,
    showLineNumbers,
    showOpenInCodeSandbox,
    initialPercentage = 50,
    dependencies,
    showReadOnly,
    options = {
        showTabs: true,
        initMode: "lazy",
        classes: {
            "sp-cm": "p-0 bg-transparent",
        },
    },
    template = "react-ts",
    customSetup,
    files,
    previewOnly,
    layout,
    height = 420,
    wrapperClassName,
    className,
    showFiles = false,
    showConsole = false,
    hidePreview = false,
    ...props
}: Props) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const { colorMode } = useColorMode();
    options ??= {};
    options.resizablePanels ??= true;
    options.editorWidthPercentage ??= initialPercentage ?? 50;

    const codeEditorOptions: CodeEditorProps = {
        showTabs: options.showTabs,
        showLineNumbers: options.showLineNumbers,
        showInlineErrors: options.showInlineErrors,
        wrapContent: options.wrapContent,
        closableTabs: options.closableTabs,
        initMode: options.initMode,
        extensions: options.codeEditor?.extensions,
        extensionsKeymap: options.codeEditor?.extensionsKeymap,
        readOnly: options.readOnly,
        showReadOnly: showReadOnly ?? options.showReadOnly,
        additionalLanguages: options.codeEditor?.additionalLanguages,
    };

    const providerOptions: SandpackInternalOptions<
        SandpackFiles,
        SandpackPredefinedTemplate
    > = {
        /**
         * TS-why: Type 'string | number | symbol' is not assignable to type 'string'
         */
        activeFile: options.activeFile as unknown as string,
        visibleFiles: options.visibleFiles as unknown as string[],
        recompileMode: options.recompileMode,
        recompileDelay: options.recompileDelay,
        autorun: options.autorun,
        autoReload: options.autoReload,
        bundlerURL: options.bundlerURL,
        startRoute: options.startRoute,
        skipEval: options.skipEval,
        fileResolver: options.fileResolver,
        initMode: options.initMode,
        initModeObserverOptions: options.initModeObserverOptions,
        externalResources: options.externalResources,
        logLevel: options.logLevel,
        classes: options.classes,
    };

    const [bugReportModalVisible, setBugReportModalVisible] =
        React.useState(false);

    const { onHandleMouseDown, horizontalSize } = useResizable({
        initialSize: options.editorWidthPercentage,
    });

    const showHandle = !previewOnly && !layout?.includes("col");

    return (
        <>
            <div className={clsx("pb-6", wrapperClassName)}>
                <div
                    className={clsx(
                        "absolute",
                        "left-0",
                        "right-0",
                        "w-full",
                        "px-2",
                        "md:px-4",
                        "xl:px-6",
                        "max-w-screen-xl",
                        "mx-auto",
                        className,
                    )}
                >
                    <SandpackProvider
                        key={`${template}-${colorMode}-${mounted}`}
                        customSetup={{ dependencies, ...customSetup }}
                        files={
                            files as TemplateFiles<SandpackPredefinedTemplate>
                        }
                        options={providerOptions}
                        template={template}
                        theme={
                            colorMode === "light"
                                ? {
                                      ...aquaBlue,
                                      colors: {
                                          ...aquaBlue.colors,
                                          accent: "#1D1E30",
                                          surface1: "#F4F8FB",
                                          surface2: "rgb(222, 229, 237)",
                                          surface3: "rgb(222, 229, 237)",
                                      },
                                  }
                                : {
                                      ...nightOwl,
                                      colors: {
                                          ...nightOwl.colors,
                                          surface1: "#1D1E30",
                                          surface2: "#303450",
                                          surface3: "#303450",
                                      },
                                  }
                        }
                        className={clsx(
                            "not-prose sandpack-container",
                            "max-w-screen-xl",
                            "animate-reveal",
                        )}
                        {...props}
                    >
                        <SandpackLayout
                            className={clsx(
                                layout === "col" && "!flex-col",
                                layout === "col-reverse" && "!flex-col-reverse",
                            )}
                        >
                            {showFiles && (
                                <SandpackFileExplorer
                                    autoHiddenFiles
                                    style={{
                                        height: options.editorHeight ?? height,
                                    }}
                                />
                            )}
                            {!previewOnly && (
                                <SandpackCodeEditor
                                    {...codeEditorOptions}
                                    // showTabs={!showFiles}
                                    showLineNumbers={showLineNumbers}
                                    closableTabs={showFiles}
                                    initMode="lazy"
                                    style={{
                                        height: options.editorHeight ?? height,
                                        ...(layout?.includes("col")
                                            ? { flex: "initial" }
                                            : {
                                                  flexGrow: horizontalSize,
                                                  flexShrink: horizontalSize,
                                                  flexBasis: 0,
                                              }),
                                        overflow: "hidden",
                                    }}
                                />
                            )}
                            {showConsole ? (
                                <SandpackConsole
                                    style={{
                                        height: options.editorHeight ?? height,
                                        ...(layout?.includes("col")
                                            ? { flex: "initial" }
                                            : {
                                                  flexGrow: horizontalSize,
                                                  flexShrink: horizontalSize,
                                                  flexBasis: 0,
                                              }),
                                        overflow: "hidden",
                                    }}
                                />
                            ) : null}
                            {showHandle ? (
                                <DragHandle
                                    onMouseDown={onHandleMouseDown}
                                    horizontalSize={horizontalSize}
                                />
                            ) : null}
                            {hidePreview ? null : (
                                <>
                                    <SandpackPreview
                                        showOpenInCodeSandbox={
                                            showOpenInCodeSandbox
                                        }
                                        // actionsChildren={
                                        //     <BugReportButton
                                        //         onClick={() =>
                                        //             setBugReportModalVisible(
                                        //                 true,
                                        //             )
                                        //         }
                                        //     />
                                        // }
                                        startRoute={startRoute}
                                        showNavigator={
                                            showNavigator ??
                                            options.showNavigator
                                        }
                                        showRefreshButton={
                                            options.showRefreshButton
                                        }
                                        style={{
                                            display: hidePreview
                                                ? "none"
                                                : "flex",
                                            ...(layout?.includes("col")
                                                ? {
                                                      flex: "initial",
                                                      width: "100%",
                                                  }
                                                : {
                                                      flexGrow:
                                                          100 - horizontalSize,
                                                      flexShrink:
                                                          100 - horizontalSize,
                                                      flexBasis: 0,
                                                      width: previewOnly
                                                          ? "100%"
                                                          : 100 -
                                                            horizontalSize +
                                                            "%",
                                                  }),
                                            gap: 0,
                                            height:
                                                options.editorHeight ?? height, // use the original editor height
                                        }}
                                    >
                                        <div className="sp-custom-loading">
                                            <img
                                                src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/spinner.gif"
                                                className={clsx(
                                                    "w-12",
                                                    "h-12",
                                                    "rounded-full",
                                                )}
                                            />
                                        </div>
                                    </SandpackPreview>
                                    {/* <BugReportModal
                                        visible={bugReportModalVisible}
                                        onClose={() =>
                                            setBugReportModalVisible(false)
                                        }
                                    /> */}
                                </>
                            )}
                        </SandpackLayout>
                    </SandpackProvider>
                </div>
                <div
                    className={clsx("")}
                    style={{
                        height: Number(options.editorHeight ?? height) + 2,
                    }}
                />
                <div
                    className={clsx(
                        layout?.includes("col") ? "block" : "block md:hidden",
                    )}
                    style={{
                        height: Number(options.editorHeight ?? height) + 2,
                    }}
                />
            </div>
            <section className="hidden max-w-0 max-h-0">
                <p>{`Dependencies: ${Object.keys(dependencies ?? {}).map(
                    (k) => `${k}@${dependencies[k]}`,
                )}`}</p>
                <h3>{`Code Files`}</h3>
                {Object.keys(files ?? {}).map((f) => (
                    <div key={f}>
                        <div>{`File: ${f}`}</div>
                        <div>
                            {`Content: ${
                                "code" in files[f] ? files[f].code : files[f]
                            }`}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

const SandpackNextJS = (props: Props) => {
    const isDevelop = process.env.NODE_ENV === "development";

    const extraProps = isDevelop
        ? {
              hidePreview: false,
              showConsole: true,
              showNavigator: true,
              dependencies: {
                  ...props.dependencies,
                  "@refinedev/core": "latest",
                  "@refinedev/simple-rest": "latest",
                  "@refinedev/nextjs-router": "latest",
                  "@types/react": "^18.0.0",
                  "@types/node": "^16.0.0",
                  typescript: "^4.7.4",
              },
              files: {
                  "/pages/index.tsx": {
                      code: NextJSPagesIndexTsxCode,
                      hidden: true,
                  },
                  ...(props.files as any),
              },
          }
        : { hidePreview: true };

    return (
        <SandpackBase
            {...props}
            {...extraProps}
            template={isDevelop ? "nextjs" : "react-ts"}
        />
    );
};

const NextJSPagesIndexTsxCode = /* tsx */ `
import { NavigateToResource } from "@refinedev/nextjs-router";

const Home = () => {
    return <NavigateToResource resource="products" />;
};

export default Home;
`.trim();
