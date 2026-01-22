import React from "react";
import Link from "@docusaurus/Link";
import Tag from "@theme/Tag";
import { titleCase } from "title-case";
import clsx from "clsx";
import { FilterIcon } from "@site/src/refine-theme/icons/filter";
import { CommonDrawer } from "@site/src/refine-theme/common-drawer";

const PRIORITY_TAGS = [
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

export default function TagsList({
  tags,
  className,
  variant = "compact",
}: {
  tags?: any[];
  className?: string;
  variant?: "compact" | "page";
}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const sortedTags = React.useMemo(() => {
    return [...(tags ?? [])].sort((a, b) => {
      const aIndex = PRIORITY_TAGS.indexOf(`${a.label}`.toLowerCase());
      const bIndex = PRIORITY_TAGS.indexOf(`${b.label}`.toLowerCase());

      if (aIndex === -1) {
        return bIndex === -1 ? 0 : 1;
      }
      return bIndex === -1 ? -1 : aIndex - bIndex;
    });
  }, [tags]);

  if (variant === "page") {
    return (
      <PageTags
        tags={sortedTags}
        className={className}
        collapsed={collapsed}
        onShowMoreClick={(nextCollapsed) => setCollapsed(nextCollapsed)}
      />
    );
  }

  return (
    <>
      <Desktop
        collapsed={collapsed}
        tags={sortedTags}
        className={clsx("hidden blog-lg:flex", className)}
        onShowMoreClick={(nextCollapsed) => setCollapsed(nextCollapsed)}
      />
      <Mobile
        tags={sortedTags}
        className={clsx("block blog-lg:hidden", className)}
      />
    </>
  );
}

const PAGE_VISIBLE_LIMIT = 24;

const PageTags = ({
  tags,
  className,
  collapsed,
  onShowMoreClick,
}: {
  tags: any[];
  className?: string;
  collapsed: boolean;
  onShowMoreClick: (collapsed: boolean) => void;
}) => {
  const totalPosts = React.useMemo(() => {
    return tags.reduce(
      (total, tag) => total + (typeof tag.count === "number" ? tag.count : 0),
      0,
    );
  }, [tags]);

  const hasOverflow = tags.length > PAGE_VISIBLE_LIMIT;
  const visibleTags =
    hasOverflow && collapsed ? tags.slice(0, PAGE_VISIBLE_LIMIT) : tags;

  return (
    <div
      className={clsx(
        "relative",
        "overflow-hidden",
        "rounded-3xl",
        "border border-zinc-200/70 dark:border-zinc-700/70",
        "bg-gradient-to-b from-white/80 via-white to-white dark:from-zinc-900/80 dark:via-zinc-900 dark:to-zinc-900",
        "p-6 blog-sm:p-8",
        "not-prose",
        className,
      )}
    >
      <div className="absolute -top-20 -right-24 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full border border-zinc-200/80 dark:border-zinc-700/80 px-3 py-1">
              {tags.length} tags
            </span>
            <span className="rounded-full border border-zinc-200/80 dark:border-zinc-700/80 px-3 py-1">
              {totalPosts} posts
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-3 blog-sm:grid-cols-2 blog-lg:grid-cols-3 blog-max:grid-cols-4">
          {visibleTags.map((tag) => (
            <TagCard key={tag.permalink} tag={tag} />
          ))}
        </div>
        {hasOverflow && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => onShowMoreClick(!collapsed)}
              className={clsx(
                "appearance-none",
                "flex",
                "items-center",
                "gap-2",
                "rounded-full",
                "border border-zinc-200/80 dark:border-zinc-700/80",
                "px-4 py-2",
                "text-xs font-medium",
                "text-zinc-600 dark:text-zinc-300",
                "hover:text-zinc-900 dark:hover:text-white",
                "hover:border-zinc-300 dark:hover:border-zinc-600",
                "transition-colors duration-200 ease-in-out",
              )}
            >
              {collapsed ? "Show all tags" : "Show fewer"}
              <ChevronDownIcon
                className={clsx(
                  "transition-transform duration-200 ease-in-out text-zinc-500 dark:text-zinc-400",
                  {
                    "rotate-180 transform": !collapsed,
                  },
                )}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TagCard = ({ tag }: { tag: any }) => {
  const count = typeof tag.count === "number" ? tag.count : null;

  return (
    <TagCardLink
      href={tag.permalink}
      label={mapLabel(tag.label)}
      count={count}
    />
  );
};

const TagCardLink = ({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number | null;
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "group",
        "relative",
        "flex",
        "flex-col",
        "gap-2",
        "rounded-2xl",
        "border",
        "px-4 py-3",
        "transition-all duration-200 ease-in-out",
        "hover:-translate-y-0.5",
        "border-zinc-200/70 dark:border-zinc-700/70",
        "bg-white/70 dark:bg-zinc-900/40",
        "hover:border-zinc-300 dark:hover:border-zinc-600",
        "no-underline hover:no-underline",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
          {label}
        </span>
        {count !== null && (
          <span
            className={clsx(
              "rounded-full",
              "px-2 py-0.5",
              "text-[11px] font-medium",
              "bg-zinc-100/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
            )}
          >
            {count} {count === 1 ? "post" : "posts"}
          </span>
        )}
      </div>
      <div
        className={clsx(
          "h-px w-full",
          "bg-gradient-to-r",
          "from-zinc-200/80 via-zinc-200/30 to-transparent",
          "dark:from-zinc-700/80 dark:via-zinc-700/30",
        )}
      />
      <div className="text-xs text-zinc-500 dark:text-zinc-400">View posts</div>
    </Link>
  );
};

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
        "bg-zinc-50 dark:bg-zinc-800",
        "justify-between",
        "items-start",
        "p-4",
        collapsed && "rounded-2.5xl",
        !collapsed && "rounded-xl",
        "not-prose",
        className,
      )}
    >
      <ul
        className={clsx(
          "overflow-hidden",
          "flex-1",
          !collapsed && "h-16",
          collapsed && "h-8",
          "m-0 p-0",
          "mr-16",
          "transition-all duration-300 ease-in-out",
        )}
      >
        {tags.map((tag) => (
          <li
            className={clsx(
              "inline-flex",
              "m-1",
              "mr-3",
              "tracking-[-0.007em]",
            )}
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
          "font-medium",
          "rounded-sm",
          "pr-1.5",
          "pl-2.5",
          "py-1.5",
          "mt-0.5",
          "text-zinc-900 dark:text-white",
          "bg-zinc-200 dark:bg-zinc-700",
          "tracking-[-0.007em]",
        )}
      >
        Show More{" "}
        <ChevronDownIcon
          className={clsx(
            "transition-transform duration-200 ease-in-out text-zinc-600 dark:text-zinc-400",
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
            "bg-zinc-200 dark:bg-zinc-700",
            "text-zinc-900 dark:text-white",
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
  let newLabel = titleCase(`${label}`.replace(/-/g, " "));
  const replace = [
    ["typescript", "TypeScript"],
    ["javascript", "JavaScript"],
    ["chakra ui", "Chakra UI"],
    ["material ui", "Material UI"],
    ["nextjs", "Next.js"],
    ["nestjs", "NestJS"],
    ["css", "CSS"],
  ];

  replace.forEach(([from, to]) => {
    newLabel = newLabel.replace(new RegExp(from, "i"), to);
  });

  return newLabel;
};
