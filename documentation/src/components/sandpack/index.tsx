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
      "sp-bridge-frame": "!hidden",
      "sp-layout": "!rounded-lg !border-gray-300 dark:!border-gray-700",
      "sp-editor": "!gap-0 border-r !border-r-gray-300 dark:!border-r-gray-700",
      "sp-tabs":
        "!border-b-gray-300 dark:!border-b-gray-700 !bg-gray-0 dark:!bg-gray-800",
      "sp-tabs-scrollable-container": "!min-h-[32px]",
      "sp-input": "!text-gray-800 dark:!text-gray-100",
      "sp-cm": clsx(
        "p-0 bg-transparent",
        "[&>.cm-editor]:!bg-refine-react-light-code",
        "[&>.cm-editor]:dark:!bg-refine-react-dark-code",
        "[&_.cm-activeLine]:!bg-gray-100 [&_.cm-activeLine]:dark:!bg-gray-800",
      ),
      "sp-icon-standalone":
        "!bg-gray-300 dark:!bg-gray-700 !text-gray-400 dark:!text-gray-500",
      "sp-file-explorer": "border-r !border-r-gray-300 dark:!border-r-gray-700",
      "sp-console": clsx(
        "not-prose",
        "!border-t-0 !border !border-solid !border-t-none",
        "!border-gray-300 dark:!border-gray-700",
        "!rounded-bl-lg !rounded-br-lg",
        "!bg-refine-react-light-code",
        "dark:!bg-refine-react-dark-code",
      ),
      "sp-console-header": clsx(
        "!bg-gray-0 dark:!bg-gray-800",
        "border-b border-solid !border-b-gray-300 dark:!border-b-gray-700",
        "!h-[32px] !min-h-[32px]",
      ),
      "sp-console-header-actions": clsx("h-full", "!gap-0"),
      "sp-console-header-button": clsx(
        "!bg-transparent",
        "!border !border-solid !border-b-0 !border-x-gray-300 dark:!border-x-gray-700",
        "!border-t-2 !border-t-transparent [&[data-active='true']]:!border-t-refine-react-light-link dark:[&[data-active='true']]:!border-t-refine-react-dark-link",
        "h-full",
        "!text-gray-800 dark:!text-gray-100",
        "!rounded-none",
        "-ml-px",
      ),
      "sp-console-list": clsx(
        "!bg-refine-react-light-code",
        "dark:!bg-refine-react-dark-code",
        "[&>code]:!bg-transparent",
      ),
      "sp-tab-button": clsx(
        "!h-8",
        "!px-2 !pb-2 !pt-1.5",
        "!text-gray-800 dark:!text-gray-100",
        "!border !border-solid !border-b-0 !border-x-gray-300 dark:!border-x-gray-700",
        "-ml-px first:ml-0",
        "!border-t-2 !border-t-transparent [&[data-active='true']]:!border-t-refine-react-light-link dark:[&[data-active='true']]:!border-t-refine-react-dark-link",
      ),
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
            files={files as TemplateFiles<SandpackPredefinedTemplate>}
            options={{
              ...providerOptions,
              classes: {
                ...providerOptions.classes,
                "sp-layout": clsx(
                  providerOptions.classes?.["sp-layout"],
                  showConsole && "!rounded-bl-none !rounded-br-none",
                ),
              },
            }}
            template={template}
            theme={
              colorMode === "light"
                ? {
                    ...aquaBlue,
                    colors: {
                      ...aquaBlue.colors,
                      accent: "#1D1E30",
                      surface1: "transparent",
                      surface2: "transparent",
                      surface3: "transparent",
                    },
                  }
                : {
                    ...nightOwl,
                    colors: {
                      ...nightOwl.colors,
                      surface1: "transparent",
                      surface2: "transparent",
                      surface3: "transparent",
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
              {showHandle ? (
                <DragHandle
                  onMouseDown={onHandleMouseDown}
                  horizontalSize={horizontalSize}
                />
              ) : null}
              {hidePreview ? null : (
                <>
                  <SandpackPreview
                    showOpenInCodeSandbox={showOpenInCodeSandbox}
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
                    showNavigator={showNavigator ?? options.showNavigator}
                    showRefreshButton={options.showRefreshButton}
                    style={{
                      display: hidePreview ? "none" : "flex",
                      ...(layout?.includes("col")
                        ? {
                            flex: "initial",
                            width: "100%",
                          }
                        : {
                            flexGrow: 100 - horizontalSize,
                            flexShrink: 100 - horizontalSize,
                            flexBasis: 0,
                            width: previewOnly
                              ? "100%"
                              : `${100 - horizontalSize}%`,
                          }),
                      gap: 0,
                      height: options.editorHeight ?? height, // use the original editor height
                    }}
                  >
                    <div className="sp-custom-loading">
                      <img
                        src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/spinner.gif"
                        className={clsx("w-12", "h-12", "rounded-full")}
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
            {showConsole ? (
              <SandpackConsole
                style={{
                  height: 200,
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
        <div className={clsx(showConsole ? "block" : "hidden", "h-[200px]")} />
      </div>
      <section className="hidden max-w-0 max-h-0">
        <h6>Code Example</h6>
        <p>{`Dependencies: ${Object.keys(dependencies ?? {}).map(
          (k) => `${k}@${dependencies[k]}`,
        )}`}</p>
        <div>{"Code Files"}</div>
        {Object.keys(files ?? {}).map((f) => (
          <div key={f}>
            <div>{`File: ${f}`}</div>
            <pre>
              {`Content: ${"code" in files[f] ? files[f].code : files[f]}`}
            </pre>
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
          "@refinedev/core": "latest",
          "@refinedev/simple-rest": "latest",
          "@refinedev/nextjs-router": "latest",
          "@types/react": "^18.0.0",
          "@types/node": "^16.0.0",
          typescript: "^4.7.4",
          ...props.dependencies,
        },
        files: {
          ...(props.files as any),
        },
      }
    : { hidePreview: true, showConsole: false };

  return (
    <SandpackBase
      {...extraProps}
      {...props}
      template={isDevelop ? "nextjs" : "react-ts"}
    />
  );
};
