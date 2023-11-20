import {
    useScrollPositionBlocker,
    useTabs,
} from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";
import clsx from "clsx";
import React, { cloneElement } from "react";

function TabList({
    className,
    block,
    selectedValue,
    selectValue,
    tabValues,
    wrapContent = true,
}) {
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
                "!my-0",
                "flex-wrap",
                "list-none",
                "m-0 mb-0 mt-0",
                "px-2",
                "py-[7px]",
                "flex gap-2",
                wrapContent
                    ? "border-b border-b-gray-200 dark:border-b-gray-700"
                    : "border border-gray-200 dark:border-gray-700",
                "bg-gray-50 dark:bg-gray-800",
                "rounded-tl-md rounded-tr-md",
                !wrapContent && "rounded-bl-md rounded-br-md",
                "items-stretch",
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
                        "!my-0",
                        "mx-0 mt-0",
                        "px-2 py-1",
                        "flex items-center justify-center",
                        "!leading-5",
                        "!text-[13px]",
                        "min-w-[60px]",
                        "cursor-pointer",
                        "transition-all duration-200 ease-in-out",
                        "rounded",
                        "border border-solid",
                        "select-none",
                        selectedValue !== value && "border-transparent",
                        selectedValue === value &&
                            "border-gray-300 dark:border-gray-700",
                        selectedValue === value && "bg-gray-0 dark:bg-gray-900",
                        selectedValue === value &&
                            "text-gray-900 dark:text-gray-0",
                        selectedValue !== value &&
                            "hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-900 dark:hover:text-gray-0",
                        selectedValue !== value &&
                            "text-gray-500 dark:text-gray-400",
                    )}
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
        return cloneElement(selectedTabItem, {
            className: "margin-top--md refine-tab-content",
        });
    }
    return (
        <div className="p-4">
            {childTabs.map((tabItem, i) =>
                cloneElement(tabItem, {
                    key: i,
                    hidden: tabItem.props.value !== selectedValue,
                    className: clsx(
                        tabItem.props.className ?? [],
                        "refine-tab-content",
                    ),
                }),
            )}
        </div>
    );
}

function TabsComponent(props) {
    const tabs = useTabs(props);

    const { wrapContent = true } = props;

    return (
        <div
            className={clsx(
                "tabs-container",
                "rounded-md",
                "border-gray-200 dark:border-gray-700",
                wrapContent ? "border" : "border-0",
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
