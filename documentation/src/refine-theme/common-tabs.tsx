import React, { cloneElement } from "react";
import clsx from "clsx";
import {
    useScrollPositionBlocker,
    useTabs,
} from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";

function TabList({ className, block, selectedValue, selectValue, tabValues }) {
    const tabRefs = [];
    const { blockElementScrollPositionUntilNextRender } =
        useScrollPositionBlocker();
    const handleTabChange = (event) => {
        const newTab = event.currentTarget;
        const newTabIndex = tabRefs.indexOf(newTab);
        const newTabValue = tabValues[newTabIndex].value;
        if (newTabValue !== selectedValue) {
            blockElementScrollPositionUntilNextRender(newTab);
            selectValue(newTabValue);
        }
    };
    const handleKeydown = (event) => {
        let focusElement = null;
        switch (event.key) {
            case "Enter": {
                handleTabChange(event);
                break;
            }
            case "ArrowRight": {
                const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
                focusElement = tabRefs[nextTab] ?? tabRefs[0];
                break;
            }
            case "ArrowLeft": {
                const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
                focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1];
                break;
            }
            default:
                break;
        }
        focusElement?.focus();
    };
    return (
        <ul
            role="tablist"
            aria-orientation="horizontal"
            className={clsx(
                className,
                "list-none",
                "m-0",
                "px-4",
                "flex items-end gap-4",
                "border-b border-b-gray-700",
                "bg-gray-800",
                "rounded-tl-lg rounded-tr-lg",
            )}
        >
            {tabValues.map(({ value, label, attributes }) => (
                <li
                    role="tab"
                    tabIndex={selectedValue === value ? 0 : -1}
                    aria-selected={selectedValue === value}
                    key={value}
                    ref={(tabControl) => tabRefs.push(tabControl)}
                    onKeyDown={handleKeydown}
                    onClick={handleTabChange}
                    {...attributes}
                    className={clsx(
                        "m-0",
                        "px-2",
                        "py-3",
                        "flex items-center justify-center",
                        "h-[47px]",
                        "border-b border-b-transparent",
                        "-mb-px",
                        "text-base",
                        "min-w-[60px]",
                        "cursor-pointer",
                        "transition-all duration-200 ease-in-out",
                        selectedValue !== value && "text-gray-500",
                        selectedValue === value && "border-b-refine-blue",
                        selectedValue === value && "text-gray-0",
                        "bg-gradient-to-t from-refine-indigo via-transparent to-transparent",
                        "bg-no-repeat",
                    )}
                    style={{
                        backgroundPosition:
                            selectedValue === value ? "center" : "center 30px",
                    }}
                >
                    {label ?? value}
                </li>
            ))}
        </ul>
    );
}

function TabContent({ lazy, children, selectedValue }) {
    const childTabs = (Array.isArray(children) ? children : [children]).filter(
        Boolean,
    );
    if (lazy) {
        const selectedTabItem = childTabs.find(
            (tabItem) => tabItem.props.value === selectedValue,
        );
        if (!selectedTabItem) {
            // fail-safe or fail-fast? not sure what's best here
            return null;
        }
        return cloneElement(selectedTabItem, { className: "margin-top--md" });
    }
    return (
        <div className="p-4">
            {childTabs.map((tabItem, i) =>
                cloneElement(tabItem, {
                    key: i,
                    hidden: tabItem.props.value !== selectedValue,
                }),
            )}
        </div>
    );
}

function TabsComponent(props) {
    const tabs = useTabs(props);

    return (
        <div
            className={clsx(
                "tabs-container",
                "rounded-lg",
                "border",
                "border-gray-700",
                "mb-6",
            )}
        >
            <TabList {...props} {...tabs} />
            <TabContent {...props} {...tabs} />
        </div>
    );
}

export default function CommonTabs(props) {
    const isBrowser = useIsBrowser();
    return (
        <TabsComponent
            // Remount tabs after hydration
            // Temporary fix for https://github.com/facebook/docusaurus/issues/5653
            key={String(isBrowser)}
            {...props}
        />
    );
}
