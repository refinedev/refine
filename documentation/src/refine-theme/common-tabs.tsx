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
  smallTabs = false,
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
        "px-4",
        "flex gap-4",
        "bg-gray-100 dark:bg-gray-700",
        "rounded-tl-lg rounded-tr-lg",
        !wrapContent && "rounded-bl-lg rounded-br-lg",
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
            "px-2 py-3",
            "flex items-center justify-center",
            "min-w-[60px]",
            "cursor-pointer",
            "transition-all duration-200 ease-in-out",
            "border-b border-solid",
            "select-none",
            smallTabs && "!text-xs",
            !smallTabs && "!text-base",
            selectedValue !== value && "text-gray-800 dark:text-gray-100",
            selectedValue === value &&
              "text-refine-react-light-link dark:text-refine-react-dark-link",
            selectedValue !== value &&
              "hover:text-refine-react-light-link dark:hover:text-refine-react-dark-link",
            selectedValue !== value && "border-b-transparent",
            selectedValue === value &&
              "border-b-refine-react-light-link dark:border-b-refine-react-dark-link",
            selectedValue !== value &&
              "hover:border-b-refine-react-light-link dark:hover:border-b-refine-react-dark-link",
          )}
        >
          {label ?? value}
        </li>
      ))}
    </ul>
  );
}

function TabContent({ lazy, children, selectedValue, smallTabs }) {
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
          className: clsx(tabItem.props.className ?? [], "refine-tab-content"),
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
        "rounded-lg",
        "border-gray-300 dark:border-gray-700",
        wrapContent ? "border" : "border-0",
        "mb-6",
        "refine-wider-container",
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
