import React from "react";
import Tag from "@theme/Tag";
import { titleCase } from "title-case";
import clsx from "clsx";
import { Disclosure, Transition } from "@headlessui/react";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";

export default function TagsList({ tags, className }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const priorityTags = [
    "refine",
    "react",
    "nextjs",
    "typescript",
    "tutorial",
    "material-ui",
    "ant-design",
    "docker",
    "comparison",
  ];

  const sortedTags = (tags ?? []).sort((a, b) => {
    const aIndex = priorityTags.indexOf(a.label);
    const bIndex = priorityTags.indexOf(b.label);

    if (aIndex === -1) {
      return bIndex === -1 ? 0 : 1;
    }
    return bIndex === -1 ? -1 : aIndex - bIndex;
  });

  return (
    <>
      <Desktop
        collapsed={collapsed}
        tags={sortedTags}
        className={className}
        onShowMoreClick={(collapsed) => setCollapsed(collapsed)}
      />
      <Mobile tags={sortedTags} className={className} />
    </>
  );
}

const Desktop = ({
  tags,
  collapsed,
  className,
  onShowMoreClick,
}: {
  tags: any;
  collapsed: boolean;
  className?: string;
  onShowMoreClick: (collapsed: boolean) => void;
}) => {
  return (
    <div
      className={clsx(
        "hidden blog-lg:flex",
        "bg-refine-react-1 dark:bg-refine-react-dark-code",
        "justify-between",
        "items-start",
        "p-5",
        collapsed && "rounded-full",
        !collapsed && "rounded-3xl",
        "not-prose",
        className,
      )}
    >
      <ul
        className={clsx(
          "overflow-hidden",
          "flex-1",
          !collapsed && "h-28",
          collapsed && "h-8",
          "m-0 p-0",
          "mr-16",
          "transition-all duration-300 ease-in-out",
        )}
      >
        {tags.map((tag) => (
          <li
            className={clsx("inline-flex", "m-1", "mr-3")}
            key={tag.permalink}
          >
            <Tag {...tag} label={mapLabel(tag.label)} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onShowMoreClick(!collapsed)}
        className={clsx(
          "appearance-none",
          "flex",
          "items-center",
          "justify-center",
          "gap-2",
          "cursor-pointer",
          "flex-shrink",
          "no-underline hover:no-underline",
          "text-xs",
          "rounded-full",
          "py-1",
          "pl-3",
          "pr-1",
          "mt-1",
          "text-refine-react-8 dark:text-refine-react-3",
          "bg-refine-react-3 dark:bg-refine-react-7",
        )}
      >
        Show More{" "}
        <ChevronDownIcon
          className={clsx(
            "opacity-30",
            "transition-transform duration-200 ease-in-out",
            {
              "rotate-180 transform": !collapsed,
            },
          )}
        />
      </button>
    </div>
  );
};

const Mobile = ({ tags, className }: { tags: any; className?: string }) => {
  return (
    <div className={clsx("mb-10 block w-full  blog-lg:hidden", className)}>
      <Disclosure>
        {({ open }) => (
          <div
            className={clsx(
              "rounded-3xl",
              "bg-refine-react-1 dark:bg-refine-react-dark-code",
            )}
          >
            <Disclosure.Button
              className={clsx(
                "bg-refine-react-1 dark:bg-refine-react-dark-code",
                "rounded-full",
                "w-full",
                "flex items-center gap-3",
                "px-2 py-2",
              )}
            >
              <TriangleDownIcon
                className={clsx(
                  "h-5 w-5",
                  "text-gray-400 dark:text-gray-500",
                  "transition-transform duration-200 ease-in-out",
                  {
                    "-rotate-90 transform": !open,
                  },
                )}
              />
              <span
                className={clsx("text-sm", "dark:text-gray-0 text-gray-900")}
              >
                Blog Post Tags
              </span>
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel className="h-[200px] overflow-auto p-2 sm:h-[232px] sm:p-6">
                <ul
                  className={clsx("overflow-hidden", "flex-1")}
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {tags.map((tag) => (
                    <li
                      className={clsx("inline-flex", "m-1")}
                      key={tag.permalink}
                    >
                      <Tag {...tag} label={mapLabel(tag.label)} />
                    </li>
                  ))}
                </ul>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

const ChevronDownIcon = (props: { className?: string }) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <title>chevron</title>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm1 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM5.854 6.646a.5.5 0 1 0-.708.708l2.5 2.5a.5.5 0 0 0 .708 0l2.5-2.5a.5.5 0 0 0-.708-.708L8 8.793 5.854 6.646Z"
      clipRule="evenodd"
    />
  </svg>
);

const mapLabel = (label) => {
  let newLabel = `${label}`;

  // remove `-`
  newLabel = label.replace(/-/g, " ");

  // replace
  const replace = [
    ["typescript", "TypeScript"],
    ["javascript", "JavaScript"],
    ["chakra ui", "Chakra UI"],
    ["material ui", "Material UI"],
    ["nextjs", "Next.js"],
    ["nestjs", "NestJS"],
    ["css", "CSS"],
  ];

  replace.forEach((element) => {
    newLabel = label.replace(element[0], element[1]);
  });

  // title case
  return titleCase(label);
};
