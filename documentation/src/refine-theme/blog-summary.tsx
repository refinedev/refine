import clsx from "clsx";
import React from "react";

export const BlogSummary = ({
  children,
  className,
  hasCode = false,
  codeTitle,
  ...props
}: any) => {
  const summaryLabel = hasCode && codeTitle ? codeTitle : children;

  return (
    <summary
      className={clsx(
        "blog-summary",
        !hasCode && "blog-summary--default",
        hasCode && "blog-summary--has-code",
        className,
      )}
      {...props}
    >
      <div className={clsx("w-4 h-4", "flex items-center justify-center")}>
        <BlogSummaryChevronIcon
          className={clsx("blog-summary-chevron", "w-4 h-4")}
        />
      </div>
      <span
        className={clsx(
          "blog-summary-label",
          !hasCode && "blog-summary-label--default",
          hasCode && "blog-summary-label--has-code",
        )}
      >
        {summaryLabel}
      </span>
    </summary>
  );
};

export default BlogSummary;

const BlogSummaryChevronIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4 6 4 4 4-4"
    />
  </svg>
);
