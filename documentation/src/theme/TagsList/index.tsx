import React from "react";
import Tag from "@theme/Tag";
import { titleCase } from "title-case";
import clsx from "clsx";
import { Disclosure, Transition } from "@headlessui/react";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";
import { FilterIcon } from "@site/src/refine-theme/icons/filter";
import { CommonDrawer } from "@site/src/refine-theme/common-drawer";

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
        className={clsx("hidden blog-lg:flex", className)}
        onShowMoreClick={(collapsed) => setCollapsed(collapsed)}
      />
      <Mobile
        tags={sortedTags}
        className={clsx("block blog-lg:hidden", className)}
      />
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
          !collapsed && "h-24",
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
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false);

  return (
    <>
      <div className={clsx(className)}>
        <button
          type="button"
          onClick={() => setIsFilterDrawerOpen(true)}
          className={clsx(
            "flex",
            "items-center",
            "justify-center",
            "gap-2",
            "rounded-full",
            "px-6 py-3",
            "bg-refine-react-3 dark:bg-refine-react-6",
            "text-refine-react-8 dark:text-white",
          )}
        >
          <FilterIcon />
          <div>Filter Tags</div>
        </button>
      </div>
      <CommonDrawer
        onClose={() => setIsFilterDrawerOpen(false)}
        open={isFilterDrawerOpen}
        title="Filter Tags"
        variant="blog"
      >
        <ul
          className={clsx("overflow-hidden", "flex", "flex-col", "gap-6")}
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          {tags.map((tag) => (
            <li className={clsx("flex")} key={tag.permalink}>
              <Tag
                {...tag}
                label={mapLabel(tag.label)}
                variant="inverted"
                size="medium"
              />
            </li>
          ))}
        </ul>
      </CommonDrawer>
    </>
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
