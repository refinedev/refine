import React from "react";
import { useDocsSidebar } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";
import {
    isActiveSidebarItem,
    // findFirstCategoryLink,
    // useDocSidebarItemsExpandedState,
    isSamePath,
} from "@docusaurus/theme-common/internal";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { DashIcon } from "./icons/dash";
import { ChevronDownIcon } from "./icons/chevron-down";
import { HEADER_HEIGHT } from "./doc-header";

type Variant = "desktop" | "mobile";

type SidebarCategoryItem = {
    collapsible: boolean;
    collapsed: boolean;
    type: "category";
    href?: string;
    label: string;
    items: SidebarItem[];
    className?: string;
};

type SidebarLinkItem = {
    type: "link";
    label: string;
    href: string;
    docId: string;
};

type SidebarHtmlItem = {
    type: "html";
    content: string;
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
}: {
    item: SidebarCategoryItem;
    path: string;
    line?: boolean;
    variant: Variant;
    onLinkClick?: () => void;
}) => {
    const isHeader = item.className === "category-as-header";
    const isActive = isActiveSidebarItem(item, path);

    const isSame = isSamePath(item.href, path);

    const [collapsed, setCollapsed] = React.useState(!(isHeader || isActive));

    const [settled, setSettled] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setSettled(true);
        }, 210);
    }, [collapsed]);

    const toggle = () => {
        setCollapsed(!collapsed);
        setSettled(false);
    };

    const Comp = !isHeader && item.href && !isSame ? Link : "button";

    return (
        <div
            className={clsx(
                !line && "pl-0",
                line && "pl-5",
                line && "ml-[11px]",
                line && "border-l-2 dark:border-l-gray-700 border-l-gray-100",
            )}
        >
            <Comp
                type="button"
                onClick={isHeader ? () => 0 : toggle}
                isNavLink
                href={item.href}
                className={clsx(
                    isHeader && "cursor-default",
                    "w-full",
                    "min-h-[40px]",
                    "border-0",
                    "appearance-none",
                    "focus:outline-none",
                    isActive && !isHeader
                        ? "dark:text-gray-0"
                        : "dark:text-gray-400",
                    isHeader ? "uppercase" : "",
                    "font-normal",
                    "flex items-center",
                    "py-2",
                    "pr-2",
                    isHeader
                        ? "text-xs leading-4 tracking-widest"
                        : "text-sm leading-6",
                    "relative",
                    !isHeader && "group",
                    "transition-colors duration-200 ease-in-out",
                    !isHeader && "hover:dark:text-gray-0",
                    !isHeader && "no-underline",
                )}
            >
                <div
                    className={clsx(
                        "absolute",
                        "opacity-0",
                        "rounded-lg",
                        "group-hover:opacity-50",
                        "bg-gray-50 dark:bg-gray-700 bg-opacity-50",
                        "transition-opacity",
                        "duration-200 ease-in-out",
                        "top-0",
                        {
                            "right-0": variant === "desktop",
                            "-right-2": variant === "mobile",
                            "w-[calc(280px-24px)]": variant === "desktop",
                            "w-[calc(480px-16px)]": variant === "mobile",
                        },
                        "h-full",
                    )}
                />
                {!isHeader && (
                    <ChevronDownIcon
                        className={clsx(
                            "w-6 h-6",
                            "flex-shrink-0",
                            "z-[1]",
                            "transition-transform duration-200 ease-in-out",
                            {
                                "transform -rotate-90": collapsed,
                            },
                        )}
                    />
                )}
                <span className="z-[1]">{item.label}</span>
                <div
                    className={clsx(
                        "absolute",
                        !isHeader && isActive && isSame
                            ? "opacity-100"
                            : "opacity-0",
                        "rounded-lg",
                        !isHeader &&
                            !isActive &&
                            !isSame &&
                            "group-hover:opacity-50",
                        "bg-gray-50 dark:bg-gray-700 bg-opacity-50",
                        "transition-opacity",
                        "duration-200 ease-in-out",
                        "top-0",
                        {
                            "right-0": variant === "desktop",
                            "-right-2": variant === "mobile",
                            "w-[calc(280px-24px)]": variant === "desktop",
                            "w-[calc(480px-16px)]": variant === "mobile",
                        },
                        "h-full",
                    )}
                />
            </Comp>
            <div
                className={clsx(
                    collapsed && "max-h-0 opacity-0",
                    collapsed && "overflow-hidden",
                    !collapsed && "max-h-[2000px] opacity-100",
                    !collapsed && !settled && "max-h-screen",
                    !collapsed && settled && "max-h-[2500px]",
                )}
            >
                {!collapsed &&
                    renderItems({
                        items: item?.items ?? [],
                        path: path,
                        line: !isHeader,
                        fromHeader: isHeader,
                        variant,
                        onLinkClick,
                    })}
            </div>
        </div>
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
}) => {
    const ref = React.useRef<HTMLAnchorElement>(null);
    const isActive = isActiveSidebarItem(item, path);

    const isSame = isSamePath(item.href, path);

    // React.useEffect(() => {
    //     if (isActive) {
    //         ref.current?.scrollIntoView({
    //             behavior: "smooth",
    //             block: "center",
    //         });
    //     }
    // }, [isActive]);

    return (
        <Link
            ref={ref}
            href={item.href}
            isNavLink
            onClick={onClick}
            className={clsx(
                "relative",
                "min-h-[40px]",
                isActive
                    ? "dark:text-gray-0 text-gray-900"
                    : "dark:text-gray-400 text-gray-500",
                "text-sm leading-6 font-normal",
                "flex items-start justify-start",
                "p-2",
                dashed && !line && "pl-0",
                line && !dashed && "pl-5",
                line && dashed && "pl-5",
                line && "ml-[11px]",
                line && "border-l-2 dark:border-l-gray-700 border-l-gray-100",
                "group",
                "transition-colors duration-200 ease-in-out",
                "hover:dark:text-gray-0 hover:text-gray-900",
                "no-underline",
            )}
        >
            {dashed && <DashIcon className="w-6 h-6 flex-shrink-0 z-[1]" />}
            <span className="z-[1]">{item.label}</span>
            <div
                className={clsx(
                    "absolute",
                    isActive && isSame ? "opacity-100" : "opacity-0",
                    "rounded-lg",
                    !isActive && !isSame && "group-hover:opacity-50",
                    "bg-opacity-50",
                    "bg-gray-50 dark:bg-gray-700",
                    "transition-opacity",
                    "duration-200 ease-in-out",
                    {
                        "right-0": variant === "desktop",
                        "-right-2": variant === "mobile",
                        "w-[calc(280px-24px)]": variant === "desktop",
                        "w-[calc(480px-16px)]": variant === "mobile",
                    },
                    "top-0",
                    "h-full",
                )}
            />
        </Link>
    );
};

const SidebarHtml = ({
    item,
    path,
    line,
    variant,
}: {
    item: SidebarHtmlItem;
    path: string;
    line?: boolean;
    variant: Variant;
}) => {
    return null;
};

type RenderItemConfig = {
    items: SidebarItem[];
    path: string;
    root?: boolean;
    line?: boolean;
    fromHeader?: boolean;
    variant: Variant;
    onLinkClick?: () => void;
};

const renderItems = ({
    items = [],
    path,
    root,
    line,
    fromHeader,
    variant,
    onLinkClick,
}: RenderItemConfig) => {
    const hasCategory = items?.some((item) => item.type === "category");
    const isDashed = !root && hasCategory;

    return (
        items?.map((item, index) => {
            switch (item.type) {
                case "category":
                    return (
                        <SidebarCategory
                            key={index}
                            item={item}
                            path={path}
                            line={!!line}
                            variant={variant}
                            onLinkClick={onLinkClick}
                        />
                    );
                case "html":
                    return (
                        <SidebarHtml
                            key={index}
                            item={item}
                            path={path}
                            line={!!line}
                            variant={variant}
                        />
                    );
                case "link":
                    return (
                        <SidebarLink
                            key={index}
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
            className={clsx(
                "hidden lg:block",
                "sticky",
                "left-0",
                "overflow-auto",
                "w-full",
                "max-w-[280px]",
                // "scrollbar-slim",
            )}
            style={{
                top: `${HEADER_HEIGHT}px`,
                height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
        >
            <div
                className={clsx(
                    "pl-5",
                    "pr-3",
                    "py-12",
                    "border-r dark:border-r-gray-700 border-r-gray-200",
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
};

export const useSidebarItems = ({
    variant,
    onLinkClick,
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
        }),
    };
};
