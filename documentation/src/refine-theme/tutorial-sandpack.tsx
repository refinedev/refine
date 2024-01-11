import React from "react";
import { TutorialDocumentLayout } from "./tutorial-document-layout";
import clsx from "clsx";

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
    SandpackFileExplorer,
    SandpackPreview,
    SandpackProvider,
} from "@codesandbox/sandpack-react";

import { useColorMode } from "@docusaurus/theme-common";

type SandpackProps = React.ComponentProps<SandpackInternal> & {
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
    parentResizing?: boolean;
};

type Props = React.PropsWithChildren<SandpackProps>;

const maxPercentage = 70;

export const TutorialSandpack = ({ children, ...sandpackProps }: Props) => {
    const [viewPercentage, setViewPercentage] = React.useState(45);
    const [resizing, setResizing] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [mobileVisiblePanel, setMobileVisiblePanel] = React.useState<
        "editor" | "tutorial"
    >("tutorial");

    React.useEffect(() => {
        const handleMouseUp = () => {
            setResizing(false);
        };

        if (resizing !== null) {
            window.addEventListener("mouseup", handleMouseUp);

            return () => {
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }

        return;
    }, [resizing]);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (resizing) {
                const containerRect =
                    containerRef.current?.getBoundingClientRect();

                if (!containerRect) return;

                const newViewPercentage = Math.min(
                    maxPercentage,
                    Math.max(
                        100 - maxPercentage,
                        ((e.clientX - containerRect.left) /
                            containerRect.width) *
                            100,
                    ),
                );

                setViewPercentage(newViewPercentage);
            }
        };

        if (resizing !== null) {
            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }

        return;
    }, [resizing]);

    React.useEffect(() => {
        const currentCursor = document.body.style.cursor;

        if (resizing) {
            document.body.style.cursor = "col-resize";
        } else {
            document.body.style.cursor = "auto";
        }

        return () => {
            document.body.style.cursor = currentCursor;
        };
    }, [resizing]);

    const codeEditorOptions: CodeEditorProps = {
        showTabs: sandpackProps?.options?.showTabs,
        showLineNumbers: sandpackProps?.options?.showLineNumbers,
        showInlineErrors: sandpackProps?.options?.showInlineErrors,
        wrapContent: sandpackProps?.options?.wrapContent,
        closableTabs: sandpackProps?.options?.closableTabs,
        initMode: sandpackProps?.options?.initMode,
        extensions: sandpackProps?.options?.codeEditor?.extensions,
        extensionsKeymap: sandpackProps?.options?.codeEditor?.extensionsKeymap,
        readOnly: sandpackProps?.options?.readOnly,
        showReadOnly:
            sandpackProps.showReadOnly ?? sandpackProps?.options?.showReadOnly,
        additionalLanguages:
            sandpackProps?.options?.codeEditor?.additionalLanguages,
    };

    return (
        <TutorialSandpackBase parentResizing={resizing} {...sandpackProps}>
            <div
                className={clsx(
                    "h-[calc(100dvh-120px-57px)]",
                    "tutorial-sm:h-[calc(100dvh-64px-57px)]",
                    "flex-1",
                    "flex",
                    "!w-full",
                    "items-stretch",
                    "justify-start",
                    "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
                )}
                ref={containerRef}
            >
                <div
                    className={clsx(
                        "overflow-hidden",
                        "border-r",
                        "border-r-gray-300 dark:border-r-gray-700",
                        "bg-gray-0 dark:bg-gray-800",
                        mobileVisiblePanel === "editor" &&
                            "max-w-0 tutorial-md:max-w-none",
                        mobileVisiblePanel === "tutorial" &&
                            "min-w-full tutorial-md:min-w-0",
                    )}
                    style={{
                        width: `calc(${viewPercentage}% - (0.625rem / 2))`,
                    }}
                >
                    <div
                        className={clsx(
                            "w-full",
                            "max-h-full",
                            "h-full",
                            "overflow-scroll",
                            "px-4 tutorial-sm:px-6",
                            "pb-6",
                        )}
                    >
                        <TutorialDocumentLayout>
                            <div>{children}</div>
                        </TutorialDocumentLayout>
                    </div>
                </div>
                <button
                    type="button"
                    className={clsx(
                        "hidden tutorial-md:flex",
                        "w-2",
                        "appearance-none",
                        "outline-none",
                        "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
                        "border-0",
                        "cursor-col-resize",
                        "items-center justify-center",
                    )}
                    onMouseDown={(event) => {
                        setResizing(true);
                        event.preventDefault();
                    }}
                >
                    <ResizeHandleIcon
                        className={clsx(
                            "w-1",
                            "text-gray-400",

                            "dark:text-gray-700",
                        )}
                    />
                </button>
                <div
                    className={clsx(
                        "overflow-hidden",
                        mobileVisiblePanel === "tutorial" &&
                            "max-w-0 tutorial-md:max-w-none",
                        mobileVisiblePanel === "editor" &&
                            "min-w-full tutorial-md:min-w-0",
                    )}
                    style={{
                        width: `calc(${
                            100 - viewPercentage
                        }% - (0.625rem / 2))`,
                    }}
                >
                    <SandpackRightSide
                        sandpackProps={sandpackProps}
                        startRoute={sandpackProps.startRoute}
                        parentResizing={resizing}
                        codeEditorOptions={codeEditorOptions}
                    />
                </div>
            </div>
            <div
                className={clsx(
                    "flex tutorial-md:hidden",
                    "p-2",
                    "w-full",
                    "border-t",
                    "border-t-gray-300 dark:border-t-gray-700",
                    "justify-center",
                )}
            >
                <div
                    className={clsx(
                        "rounded-[40px]",
                        "p-1",
                        "gap-1",
                        "flex",
                        "items-center",
                        "justify-center",
                        "bg-gray-100 dark:bg-gray-700",
                        "text-sm",
                    )}
                >
                    <button
                        type="button"
                        onClick={() => setMobileVisiblePanel("tutorial")}
                        className={clsx(
                            "appearance-none",
                            "outline-none",
                            "border-none",
                            "w-[166px]",
                            "p-1.5",
                            "rounded-[32px]",
                            "text-center",
                            mobileVisiblePanel !== "tutorial" &&
                                "text-gray-500 dark:text-gray-400",
                            mobileVisiblePanel === "tutorial" && [
                                "text-gray-800 dark:text-gray-100",
                                "bg-gray-0 dark:bg-gray-600",
                                "shadow-[0px_1px_0px_0px_#E3E4E5] dark:shadow-[0px_-1px_0px_0px_#667084]",
                            ],
                            "transition-colors",
                            "ease-in-out",
                            "duration-200",
                        )}
                    >
                        Tutorial
                    </button>
                    <button
                        type="button"
                        onClick={() => setMobileVisiblePanel("editor")}
                        className={clsx(
                            "appearance-none",
                            "outline-none",
                            "border-none",
                            "w-[166px]",
                            "p-1.5",
                            "rounded-[32px]",
                            "text-center",
                            mobileVisiblePanel !== "editor" &&
                                "text-gray-500 dark:text-gray-400",
                            mobileVisiblePanel === "editor" && [
                                "text-gray-800 dark:text-gray-100",
                                "bg-gray-0 dark:bg-gray-600",
                                "shadow-[0px_1px_0px_0px_#E3E4E5] dark:shadow-[0px_-1px_0px_0px_#667084]",
                            ],
                            "transition-colors",
                            "ease-in-out",
                            "duration-200",
                        )}
                    >
                        Editor
                    </button>
                </div>
            </div>
        </TutorialSandpackBase>
    );
};

const TutorialSandpackBase = ({
    children,
    initialPercentage = 50,
    dependencies,
    options = {
        showTabs: true,
        initMode: "lazy",
        classes: {
            "sp-file-explorer":
                "!h-full !w-[200px] border-r border-r-gray-300 dark:border-r-gray-700",
            "sp-layout": "!rounded-lg !border-gray-300 dark:!border-gray-700",
            "sp-close-button": "!visible",
            "sp-editor":
                "!h-full !gap-0 border-r !border-r-gray-300 dark:!border-r-gray-700",
            "sp-stack": "!h-full",
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

    return (
        <SandpackProvider
            key={`${template}-${colorMode}-${mounted}`}
            customSetup={{ dependencies, ...customSetup }}
            files={files as TemplateFiles<SandpackPredefinedTemplate>}
            options={providerOptions}
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
            className="!w-full"
            {...props}
        >
            {children}
        </SandpackProvider>
    );
};

const SandpackRightSide = ({
    codeEditorOptions,
    startRoute,
    parentResizing,
    sandpackProps,
}: {
    parentResizing: boolean;
    startRoute: string;
    codeEditorOptions: CodeEditorProps;
    sandpackProps: SandpackProps;
}) => {
    const [viewPercentage, setViewPercentage] = React.useState(50);
    const [resizing, setResizing] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const { previewOnly, hidePreview, showFiles = true } = sandpackProps ?? {};

    React.useEffect(() => {
        const handleMouseUp = () => {
            setResizing(false);
        };

        if (resizing !== null) {
            window.addEventListener("mouseup", handleMouseUp);

            return () => {
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }

        return;
    }, [resizing]);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (resizing) {
                const containerRect =
                    containerRef.current?.getBoundingClientRect();

                if (!containerRect) return;

                const newViewPercentage = Math.min(
                    maxPercentage,
                    Math.max(
                        100 - maxPercentage,
                        ((e.clientY - containerRect.top) /
                            containerRect.height) *
                            100,
                    ),
                );

                setViewPercentage(newViewPercentage);
            }
        };

        if (resizing !== null) {
            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }

        return;
    }, [resizing]);

    React.useEffect(() => {
        const currentCursor = document.body.style.cursor;

        if (resizing) {
            document.body.style.cursor = "row-resize";
        } else {
            document.body.style.cursor = "auto";
        }

        return () => {
            document.body.style.cursor = currentCursor;
        };
    }, [resizing]);

    return (
        <div className={clsx("w-full", "h-full", "flex", "flex-col")}>
            <div
                className={clsx(
                    "not-prose",
                    "w-full",
                    "animate-reveal",
                    "!h-full",
                    "!overflow-hidden",
                )}
            >
                <div
                    ref={containerRef}
                    className={clsx(
                        "flex",
                        "flex-col",
                        "h-full",
                        "!py-2",
                        "!pr-2",
                        "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
                    )}
                >
                    {previewOnly ? null : (
                        <div
                            className={clsx(
                                "bg-gray-0 dark:bg-gray-800",
                                "overflow-hidden",
                                "rounded-[4px]",
                                "border border-gray-300 dark:border-gray-700",
                                "flex",
                            )}
                            style={{
                                height: hidePreview
                                    ? "100%"
                                    : `calc(${viewPercentage}% - (0.625rem / 2))`,
                            }}
                        >
                            {showFiles ? (
                                <SandpackFileExplorer autoHiddenFiles={false} />
                            ) : null}
                            <SandpackCodeEditor
                                {...codeEditorOptions}
                                showTabs={true}
                                showLineNumbers={true}
                                closableTabs={true}
                                initMode="lazy"
                                style={{}}
                            />
                        </div>
                    )}
                    {hidePreview || previewOnly ? null : (
                        <button
                            type="button"
                            className={clsx(
                                "h-2.5",
                                "w-full",
                                "appearance-none",
                                "outline-none",
                                "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
                                "border-0",
                                "cursor-row-resize",
                                "flex items-center justify-center",
                            )}
                            onMouseDown={(event) => {
                                setResizing(true);
                                event.preventDefault();
                            }}
                        >
                            <ResizeHandleIcon
                                className={clsx(
                                    "w-1",
                                    "rotate-90",
                                    "text-gray-400",
                                    "dark:text-gray-700",
                                )}
                            />
                        </button>
                    )}
                    {hidePreview ? null : (
                        <div
                            className={clsx(
                                "overflow-hidden",
                                "bg-gray-0 dark:bg-gray-800",
                                "rounded-[4px]",
                                "border border-gray-300 dark:border-gray-700",
                                (resizing || parentResizing) &&
                                    "pointer-events-none",
                            )}
                            style={{
                                height: previewOnly
                                    ? "100%"
                                    : `calc(${
                                          100 - viewPercentage
                                      }% - (0.625rem / 2))`,
                            }}
                        >
                            <SandpackPreview
                                showOpenInCodeSandbox={false}
                                startRoute={startRoute}
                                // showNavigator={true}
                                showRefreshButton={true}
                                style={{
                                    display: "flex",
                                    flex: "initial",
                                    width: "100%",
                                    gap: 0,
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ResizeHandleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={4}
        height={21}
        viewBox="0 0 4 21"
        fill="none"
        {...props}
    >
        <g fill="currentColor" strokeWidth={0}>
            <path d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM2 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </g>
    </svg>
);
