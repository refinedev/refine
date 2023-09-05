import React from "react";
import clsx from "clsx";

import { OverviewIcon } from "./icons/overview";
import { MonitorIcon } from "./icons/monitor";
import { ResourceViewerIcon } from "./icons/resource-viewer";
import { PackageOverviewIcon } from "./icons/package-overview";
import { OptionsIcon } from "./icons/options";
import { PlaygroundIcon } from "./icons/playground";
import { InferencerPreviewIcon } from "./icons/inferencer-preview";
import { SnippetsIcon } from "./icons/snippets";
import { ChatbotIcon } from "./icons/chatbot";
import { TicketIcon } from "./icons/ticket";
import { SettingsIcon } from "./icons/settings";

import { NavLink, useLocation } from "react-router-dom";
import { HiddenItemsBgIcon } from "./icons/hidden-items-bg";

const ActiveItemBackground = ({ active }: { active?: boolean }) => {
    return (
        <div
            className={clsx(
                "re-absolute",
                "re-left-0",
                "re-top-0",
                "re-h-full",
                "re-w-full",
                active ? "re-scale-100" : "re-scale-0",
                "re-transition-all",
                "re-duration-300",
                "re-ease-[cubic-bezier(.25,.75,.5,1.25)]",
            )}
            style={{
                background:
                    "url(data:image/png;base64,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)",
                backgroundSize: "40px 40px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};

const SidebarItem = ({
    item: { icon, path, soon, label: itemLabel },
    index,
    separator,
    active,
    hideLabel,
}: {
    item: (typeof items)[number];
    separator?: boolean;
    index: number;
    active?: boolean;
    hideLabel?: boolean;
}) => {
    const timeoutRef = React.useRef<number | null>(null);
    const [hover, setHover] = React.useState(false);
    const Icon = icon ?? React.Fragment;

    const Element = soon ? "div" : NavLink;

    // const label = soon ? `${itemLabel} (Coming Soon)` : itemLabel;
    const label = itemLabel;

    return (
        <React.Fragment key={index}>
            <Element
                to={path ?? "/"}
                onMouseEnter={() => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = window.setTimeout(() => {
                        setHover(true);
                    }, 150);
                }}
                onMouseLeave={() => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    timeoutRef.current = window.setTimeout(() => {
                        setHover(false);
                    }, 150);
                }}
                className={clsx(
                    "re-relative",
                    "re-flex-shrink-0",
                    "re-w-12",
                    "re-h-12",
                    active ? "re-text-alt-cyan" : "re-text-gray-500",
                    !active && "hover:re-text-alt-cyan",
                    "re-transition-colors",
                    "re-duration-200",
                    "re-ease-in-out",
                    "re-flex",
                    "re-justify-center",
                    "re-gap-4",
                    "re-items-center",
                    "re-group",
                )}
            >
                <ActiveItemBackground active={active} />
                <Icon className={clsx("re-z-[1]", soon && "re-opacity-50")} />
                {soon && (
                    <div
                        className={clsx(
                            "re-absolute",
                            "re-h-[11px]",
                            "re-bottom-[-2px]",
                            "re-right-[-2px]",
                            "re-text-[7px]",
                            "re-leading-[7px]",
                            "re-z-[2]",
                            "re",
                            "re-text-center",
                            "re-font-semibold",
                            "re-text-alt-cyan",
                            "re-bg-alt-cyan",
                            "re-bg-opacity-10",
                            "re-border",
                            "re-border-opacity-20",
                            "re-border-alt-cyan",
                            "re-py-px",
                            "re-px-1",
                            "re-rounded-lg",
                        )}
                    >
                        SOON
                    </div>
                )}
                {!hideLabel && (
                    <div
                        className={clsx(
                            "re-transition-transform",
                            !hover && "re-scale-y-0 re--translate-x-6",
                            hover && "re-scale-y-100 re-translate-x-0",
                            "re-absolute",
                            "re-left-[52px]",
                            "re-top-0",
                            "re-h-full",
                            "re-flex",
                            "re-items-center",
                            "re-justify-center",
                            "re-text-sm",
                            "re-break-keep",
                            "re-whitespace-nowrap",
                            "re-z-[2]",
                        )}
                    >
                        <div
                            className={clsx(
                                "re-px-2",
                                "re-py-1",
                                "re-border",
                                "re-border-gray-600",
                                "re-bg-gray-700",
                                "re-shadow-md",
                                "re-rounded",
                                "re-text-gray-0",
                            )}
                        >
                            {label}
                        </div>
                    </div>
                )}
            </Element>
            {separator && (
                <div
                    className={clsx(
                        "re-w-full",
                        "re-h-0",
                        "re--mt-1",
                        "re--mb-[5px]",
                        "re-border-b",
                        "re-border-b-gray-600",
                    )}
                />
            )}
        </React.Fragment>
    );
};

const SidebarHiddenItemsItem = ({
    index,
    hiddenItems,
    active,
}: {
    item: (typeof items)[number];
    hiddenItems: typeof items;
    separator?: boolean;
    index: number;
    active?: boolean;
}) => {
    const timeoutRef = React.useRef<number | null>(null);
    const [hover, setHover] = React.useState(false);

    return (
        <React.Fragment key={index}>
            <div
                onMouseEnter={() => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    timeoutRef.current = window.setTimeout(() => {
                        setHover(true);
                    }, 150);
                }}
                onMouseLeave={() => {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    timeoutRef.current = window.setTimeout(() => {
                        setHover(false);
                    }, 150);
                }}
                className={clsx(
                    "re-cursor-pointer",
                    "re-relative",
                    "re-flex-shrink-0",
                    "re-w-12",
                    "re-h-12",
                    active ? "re-text-alt-cyan" : "re-text-gray-500",
                    !active && "hover:re-text-alt-cyan",
                    "re-transition-colors",
                    "re-duration-200",
                    "re-ease-in-out",
                    "re-flex",
                    "re-justify-center",
                    "re-items-center",
                    "re-group",
                )}
            >
                <HiddenItemsBgIcon className="re-z-[1] re-text-gray-700" />
                <span
                    className={clsx(
                        "re-absolute",
                        "re-left-0",
                        "re-right-0",
                        "re-flex",
                        "re-items-center",
                        "re-justify-center",
                        "re-z-[1]",
                        "re-text-gray-300",
                        "re-text-sm",
                    )}
                >
                    +{hiddenItems.length}
                </span>
                <div
                    className={clsx(
                        "re-transition-transform",
                        !hover && "re-scale-x-0 re--translate-x-6",
                        hover && "re-scale-x-100 re-translate-x-0",
                        "re-absolute",
                        "re-left-[52px]",
                        "re-bottom-0",
                        "re-flex",
                        "re-items-center",
                        "re-justify-center",
                        "re-text-sm",
                        "re-break-keep",
                        "re-whitespace-nowrap",
                    )}
                >
                    <div
                        className={clsx(
                            "re-px-3",
                            "re-pt-0",
                            "re-pb-1",
                            "re-border",
                            "re-border-gray-600",
                            "re-bg-gray-900",
                            "re-shadow-md",
                            "re-flex",
                            "re-items-center",
                            "re-gap-2",
                            "re-rounded",
                        )}
                    >
                        {hiddenItems.map((item, index) => {
                            return (
                                <SidebarItem
                                    item={item}
                                    key={index}
                                    index={index}
                                    active={false}
                                    hideLabel
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

type SidebarItemType = {
    icon?: React.ComponentType<React.ComponentProps<"svg">>;
    label: string;
    path?: string;
    section?: string;
    soon?: boolean;
};

const items: SidebarItemType[] = [
    {
        icon: OverviewIcon,
        label: "Overview",
        path: "/",
        section: "first",
    },
    {
        icon: MonitorIcon,
        label: "Monitor",
        path: "/monitor",
        section: "first",
    },
    {
        icon: ResourceViewerIcon,
        label: "Resource Viewer",
        path: "/resource-viewer",
        section: "first",
        soon: true,
    },
    {
        icon: PackageOverviewIcon,
        label: "Package Overview",
        path: "/package-overview",
        section: "first",
        soon: true,
    },
    {
        icon: OptionsIcon,
        label: "Options",
        path: "/options",
        section: "first",
        soon: true,
    },
    {
        icon: PlaygroundIcon,
        label: "Playground",
        path: "/playground",
        section: "second",
        soon: true,
    },
    {
        icon: InferencerPreviewIcon,
        label: "Inferencer Preview",
        path: "/inferencer-preview",
        section: "second",
        soon: true,
    },
    {
        icon: SnippetsIcon,
        label: "Snippets",
        path: "/snippets",
        section: "second",
        soon: true,
    },
    {
        icon: ChatbotIcon,
        label: "Chatbot",
        path: "/chatbot",
        section: "third",
        soon: true,
    },
    {
        icon: TicketIcon,
        label: "Ticket",
        path: "/ticket",
        section: "third",
        soon: true,
    },
    {
        icon: SettingsIcon,
        label: "Settings",
        path: "/settings",
        section: "fourth",
        soon: true,
    },
];

const ITEM_HEIGHT = 48;
const ITEM_GAP = 8;

export const Sidebar = () => {
    const itemContainerRef = React.useRef<HTMLDivElement>(null);
    const { pathname } = useLocation();

    const [itemsToRender, setItemsToRender] = React.useState<typeof items>([]);
    const [hiddenItems, setHiddenItems] = React.useState<typeof items>([]);

    React.useEffect(() => {
        const handleResize = () => {
            if (!itemContainerRef.current) {
                setItemsToRender([]);
                return;
            }

            const { clientHeight } = itemContainerRef.current;

            const itemCount = Math.floor(
                clientHeight / (ITEM_HEIGHT + ITEM_GAP),
            );

            const realItemCount =
                itemCount === items.length ? itemCount : itemCount - 1;

            const remainingItemElement = {
                label: "__hidden_elements__",
            };

            setItemsToRender([
                ...items.slice(0, realItemCount),
                ...(realItemCount < items.length ? [remainingItemElement] : []),
            ]);
            setHiddenItems(items.slice(realItemCount));
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav
            className={clsx(
                "re-flex-shrink-0",
                "re-min-h-full",
                "re-bg-gray-900",
                "re-border-r",
                "re-border-r-gray-700",
                "re-px-2",
                "re-pt-2",
                "re-flex",
            )}
        >
            <div
                ref={itemContainerRef}
                className={clsx(
                    "re-flex",
                    "re-flex-1",
                    "re-flex-col",
                    "re-gap-2",
                    "re-w-12",
                    "re-flex-shrink-0",
                )}
            >
                {itemsToRender.map((item, index, array) => {
                    const nextItemSection = array[index + 1]?.section;
                    if (item.label === "__hidden_elements__") {
                        return (
                            <SidebarHiddenItemsItem
                                key={index}
                                item={item}
                                hiddenItems={hiddenItems}
                                index={index}
                            />
                        );
                    }
                    return (
                        <SidebarItem
                            key={index}
                            item={item}
                            index={index}
                            active={pathname === item.path}
                            separator={Boolean(
                                nextItemSection &&
                                    nextItemSection !== item.section,
                            )}
                        />
                    );
                })}
            </div>
        </nav>
    );
};
