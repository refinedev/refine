import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import {
    isActiveSidebarItem,
    isSamePath,
    useDocsSidebar,
} from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import React from "react";
import { HEADER_HEIGHT } from "./doc-header";
import { ChevronDownIcon } from "./icons/chevron-down";
import { DashIcon } from "./icons/dash";
import { NewBadgeShiny } from "./icons/new-badge-shiny";

const SIDEBAR_WIDTH = 260;

const componentRegexp = /<([A-Z][a-z]+)\s?\/>/gi;

type Variant = "desktop" | "mobile";

type SidebarCategoryItem = {
    collapsible: boolean;
    collapsed: boolean;
    type: "category";
    href?: string;
    label: string;
    items: SidebarItem[];
    className?: string;
    customProps?: Record<string, unknown>;
};

type SidebarLinkItem = {
    type: "link";
    label: string;
    href: string;
    docId: string;
    className?: string;
    customProps?: Record<string, unknown>;
};

type SidebarHtmlItem = {
    type: "html";
    content: string;
    value: string;
    className?: string;
    customProps?: Record<string, unknown>;
};

type SidebarItem = SidebarCategoryItem | SidebarLinkItem | SidebarHtmlItem;

type SidebarType = {
    name: string;
    items: SidebarItem[];
};

const SidebarCategory = ({
    item,
    path,
    line,
    variant,
    onLinkClick,
    deferred,
}: {
    item: SidebarCategoryItem;
    path: string;
    line?: boolean;
    variant: Variant;
    onLinkClick?: () => void;
    deferred?: boolean;
}) => {
    const isHeader = item.className?.includes("category-as-header");
    const isActive = isActiveSidebarItem(item, path);

    const isSame = isSamePath(item.href, path);

    const { collapsible } = item;

    const defaultCollapsed = isHeader || isActive ? false : item.collapsed;

    const [collapsed, setCollapsed] = React.useState(
        collapsible === false ? false : defaultCollapsed,
    );

    const [settled, setSettled] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSettled(true);
        }, 210);

        return () => {
            clearTimeout(timeout);
        };
    }, [collapsed]);

    const toggle = () => {
        if (collapsible !== false) {
            setCollapsed(!collapsed);
            setSettled(false);
        }
    };

    const Comp = !isHeader && item.href && !isSame ? Link : "button";

    return (
        <div
            className={clsx(
                !line && "pl-0",
                // SPACING
                line && "pl-2",
                line && "ml-[12px]",
                "relative",
                // line && "border-l border-l-gray-200 dark:border-l-gray-600",
            )}
        >
            <Comp
                type="button"
                onClick={isHeader ? () => 0 : toggle}
                {...(Comp === "button"
                    ? {}
                    : {
                          isNavLink: true,
                      })}
                href={item.href}
                className={clsx(
                    // isHeader && item.label !== "Getting Started" && "mt-6",
                    isHeader && "cursor-default",
                    "w-full",
                    "min-h-[28px]",
                    "border-0",
                    "appearance-none",
                    "focus:outline-none",
                    !isHeader && "text-gray-600 dark:text-gray-300",
                    isHeader && "text-gray-500 dark:text-gray-400",
                    !isHeader && "hover:text-gray-600 dark:hover:text-gray-300",
                    isHeader ? "uppercase" : "",
                    "font-normal",
                    "flex items-center",
                    isHeader ? "pt-2 pb-4" : "py-2",
                    "pr-2",
                    isHeader && "pl-2",
                    !isHeader && "pl-0.5",
                    isHeader ? "text-xs tracking-[2px]" : "text-sm",
                    "relative",
                    !isHeader && "group",
                    "transition-colors duration-200 ease-in-out",
                    !isHeader && "no-underline",
                )}
            >
                {!isHeader && (
                    <ChevronDownIcon
                        className={clsx(
                            "opacity-70",
                            isActive
                                ? "text-gray-500 dark:text-gray-400"
                                : "text-gray-500 dark:text-gray-400",
                            "h-5 w-5",
                            "flex-shrink-0",
                            "z-[1]",
                            "transition-transform duration-200 ease-in-out",
                            "group-hover:text-gray-600 dark:group-hover:text-gray-300",
                            {
                                "-rotate-90 transform": collapsed,
                            },
                        )}
                    />
                )}
                <span className="z-[1]">{item.label}</span>
                <div
                    className={clsx(
                        "absolute",
                        "rounded-[18px]",
                        "transition-opacity",
                        "duration-200 ease-in-out",
                        "top-0",
                        {
                            "group-hover:bg-gray-100 dark:group-hover:bg-gray-700":
                                !isActive && !isSame,
                            "bg-refine-blue-2-light dark:bg-refine-blue-2 dark:bg-opacity-10":
                                isActive && isSame,
                            "right-0": variant === "desktop",
                            "-right-2": variant === "mobile",
                        },
                        "h-full",
                    )}
                    style={{
                        width:
                            variant === "desktop"
                                ? `calc(${SIDEBAR_WIDTH}px - 32px)`
                                : `calc(480px - 16px)`,
                    }}
                />
            </Comp>
            {line && (
                <div className="z-[1] absolute left-0 top-1/2 -translate-y-1/2 border-l border-l-gray-300 dark:border-l-gray-600 h-full w-px" />
            )}
            <div
                className={clsx(
                    collapsed && "max-h-0 opacity-0",
                    collapsed && "overflow-hidden",
                    !collapsed && "opacity-100",
                    !collapsed && !settled && "max-h-screen",
                    !collapsed && settled && "max-h-max",
                )}
            >
                {
                    // if category is collapsed, don't render items for performance reasons
                    (deferred ? !collapsed : true) &&
                        renderItems({
                            items: item?.items ?? [],
                            path: path,
                            line: !isHeader,
                            fromHeader: isHeader,
                            variant,
                            onLinkClick,
                            deferred,
                        })
                }
            </div>
        </div>
    );
};

const DevtoolsItem = ({
    item,
    onClick,
}: {
    item: SidebarLinkItem;
    onClick?: () => void;
}) => {
    return (
        <Link
            href={item.href}
            isNavLink
            onClick={onClick}
            className={clsx(
                "flex-shrink-0",
                "relative",
                "min-h-[28px]",
                "rounded-[18px]",
                "bg-refine-blue dark:bg-refine-cyan bg-opacity-10 dark:bg-opacity-10",
                "text-refine-blue dark:text-refine-cyan-alt",
                "pl-6 pr-3 py-2",
                "text-sm font-normal",
                "flex items-start justify-start",
                "group",
                "transition-colors duration-200 ease-in-out",
                "no-underline",
                item.className,
            )}
        >
            <div className={"flex items-center flex-1"}>
                <span className="z-[1] flex-shrink-0">{item.label}</span>
                <NewBadgeShiny className="flex-shrink-0 ml-auto" />
            </div>
        </Link>
    );
};

const SidebarLink = ({
    item,
    path,
    dashed,
    line,
    variant,
    onClick,
}: {
    item: SidebarLinkItem;
    path: string;
    dashed?: boolean;
    line?: boolean;
    variant: Variant;
    onClick?: () => void;
    code?: boolean;
}) => {
    const once = React.useRef(false);
    const ref = React.useRef<HTMLAnchorElement>(null);
    const isActive = isActiveSidebarItem(item, path);
    const isSame = isSamePath(item.href, path);
    const isShiny = item.className?.includes("sidebar-item-shiny") || false;

    React.useEffect(() => {
        if (isActive && !once.current) {
            const sidebarParent = document.querySelector(
                "#refine-docs-sidebar",
            );
            if (sidebarParent && ref.current) {
                sidebarParent.scrollTop =
                    ref.current?.offsetTop -
                    sidebarParent.clientHeight / 2 +
                    ref.current?.clientHeight / 2;
            }
        }
        once.current = true;
    }, [isActive]);

    if (isShiny) {
        return <DevtoolsItem item={item} onClick={onClick} />;
    }

    const isComponentLabel = componentRegexp.test(item.label);

    return (
        <Link
            ref={ref}
            href={item.href}
            isNavLink
            onClick={onClick}
            className={clsx(
                "relative",
                "min-h-[28px]",
                !isActive && "text-gray-600 dark:text-gray-300",
                !isActive && "hover:text-gray-600 dark:hover:text-gray-300",
                isActive &&
                    "text-refine-react-light-link dark:text-refine-react-dark-link",
                "px-4 py-2",
                "text-sm font-normal",
                "flex items-start justify-start",
                dashed && !line && "pl-0.5",
                // SPACING
                line && dashed && "pl-2",
                line && "ml-[12px]",
                "group",
                "transition-colors duration-200 ease-in-out",
                "no-underline",
                item.className,
            )}
        >
            {dashed && (
                <DashIcon
                    className={clsx(
                        "z-[1] h-5 w-5 flex-shrink-0",
                        "text-gray-300 dark:text-gray-600",
                        isActive &&
                            "text-refine-react-light-link dark:text-refine-react-dark-link text-opacity-50 dark:text-opacity-50",
                    )}
                />
            )}
            <div
                className={clsx(
                    "flex items-center",
                    isComponentLabel && "break-all",
                )}
            >
                <span className="z-[1]">{item.label}</span>
            </div>
            <div
                className={clsx(
                    "absolute",
                    "rounded-[18px]",
                    "transition-opacity",
                    "duration-200 ease-in-out",
                    {
                        "group-hover:bg-gray-100 dark:group-hover:bg-gray-700":
                            !isActive && !isSame,
                        "bg-refine-blue-2-light dark:bg-refine-blue-2 dark:bg-opacity-10":
                            isActive && isSame,
                        "right-0": variant === "desktop",
                        // "-right-2": variant === "mobile",
                    },
                    "top-0",
                    "h-full",
                )}
                style={{
                    width:
                        variant === "desktop"
                            ? `calc(${SIDEBAR_WIDTH}px - 32px)`
                            : `100%`,
                }}
            />
            {line && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 border-l border-l-gray-300 dark:border-l-gray-600 h-full w-px" />
            )}
        </Link>
    );
};

const SidebarHtml = ({
    item,
    line,
}: {
    item: SidebarHtmlItem;
    path: string;
    line?: boolean;
    variant: Variant;
    dashed?: boolean;
    code?: boolean;
}) => {
    return (
        <div
            className={clsx(
                "relative",
                "text-xs",
                "flex items-start justify-start",
                "px-0.5 py-1",
                // SPACING
                line && "pl-2",
                line && "ml-[12px]",
                "group",
                "transition-colors duration-200 ease-in-out",
                "no-underline",
                "text-gray-500 dark:text-gray-400",
                "after:content-['']",
                "after:w-[calc(100%)]",
                "after:h-px",
                "after:bg-gray-300",
                "dark:after:bg-gray-600",
                "after:absolute",
                "after:left-0",
                "after:top-1/2",
                "after:-translate-y-1/2",
            )}
        >
            {line && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 border-l border-l-gray-300 dark:border-l-gray-600 h-full w-px" />
            )}
            <span
                className={clsx(
                    "z-[1]",
                    "-ml-1",
                    "px-1",
                    "bg-gray-0",
                    "dark:bg-gray-900",
                )}
                dangerouslySetInnerHTML={{ __html: item.value }}
            />
        </div>
    );
};

type RenderItemConfig = {
    items: SidebarItem[];
    path: string;
    root?: boolean;
    line?: boolean;
    fromHeader?: boolean;
    variant: Variant;
    onLinkClick?: () => void;
    deferred?: boolean;
    level?: number;
};

const renderItems = ({
    items = [],
    path,

    root,
    line,
    variant,
    onLinkClick,
    deferred,
}: RenderItemConfig) => {
    const hasCategory = items?.some((item) => item.type === "category");
    const isDashed = !root && hasCategory;

    return (
        items?.map((item, index) => {
            switch (item.type) {
                case "category":
                    return (
                        <SidebarCategory
                            key={`${item.label}:${item.href}:${item.type}`}
                            item={item}
                            path={path}
                            line={!!line}
                            variant={variant}
                            onLinkClick={onLinkClick}
                            deferred={deferred}
                        />
                    );
                case "html":
                    return (
                        <SidebarHtml
                            key={`${item.type}:${item.value}`}
                            item={item}
                            path={path}
                            line={!!line}
                            variant={variant}
                        />
                    );
                case "link":
                    return (
                        <SidebarLink
                            key={`${item.label}:${item.href}:${item.type}`}
                            item={item}
                            path={path}
                            dashed={isDashed}
                            line={!!line}
                            variant={variant}
                            onClick={onLinkClick}
                        />
                    );
                default:
                    return null;
            }
        }) ?? []
    );
};

export const DocSidebar = () => {
    const sidebar = useDocsSidebar() as SidebarType;
    const { pathname } = useLocation();

    return (
        <div
            id="refine-docs-sidebar"
            className={clsx(
                "hidden lg:block",
                "sticky",
                "left-0",
                "overflow-auto",
                "w-full",
                // "scrollbar-slim",
            )}
            style={{
                maxWidth: `${SIDEBAR_WIDTH}px`,
                top: `${HEADER_HEIGHT}px`,
                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
        >
            <div
                className={clsx(
                    "px-4",
                    "py-4",
                    "border-r border-r-gray-300 dark:border-r-gray-700",
                    "flex flex-col gap-6",
                )}
            >
                {renderItems({
                    items: sidebar?.items,
                    path: pathname,
                    root: true,
                    variant: "desktop",
                })}
            </div>
        </div>
    );
};

type UseSidebarItemsProps = {
    variant: Variant;
    onLinkClick?: () => void;
    deferred?: boolean;
};

export const useSidebarItems = ({
    variant,
    onLinkClick,
    deferred,
}: UseSidebarItemsProps) => {
    const sidebar = useDocsSidebar() as SidebarType;
    const { pathname } = useLocation();

    return {
        items: renderItems({
            items: sidebar?.items,
            path: pathname,
            root: true,
            variant,
            onLinkClick,
            deferred,
        }),
    };
};
