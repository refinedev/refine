import React from "react";
import { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import { ChevronLeft, ChevronRight } from "../../components/blog/icons";
import { usePagination, DOTS } from "../../hooks/use-pagination";
import clsx from "clsx";

export default function BlogListPaginator(props) {
  const { metadata, basePath = "/blog" } = props;
  const { totalPages, page: currentPage } = metadata;

  const paginationRange = usePagination({ totalPages, currentPage });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav
      className={clsx(
        "blog-md:justify-end flex items-center justify-center",
        "not-prose",
      )}
      aria-label={translate({
        id: "theme.blog.paginator.navAriaLabel",
        message: "Blog list page navigation",
        description: "The ARIA label for the blog pagination",
      })}
    >
      <ul className="flex list-none items-center gap-2 py-6">
        <li>
          <Link
            to={
              currentPage === 1
                ? undefined
                : currentPage - 1 === 1
                  ? basePath
                  : `${basePath}/page/${currentPage - 1}`
            }
            className={clsx(
              "rounded-lg",
              "hover:no-underline",
              "text-zinc-600 dark:text-zinc-400",
              "hover:text-zinc-900 dark:hover:text-white",
              currentPage !== 1 && "opacity-70",
              currentPage === 1 && "pointer-events-none opacity-20",
            )}
          >
            <ChevronLeft />
          </Link>
        </li>

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={`page:${pageNumber}`}
                className={clsx(
                  "flex items-center justify-center",
                  "text-zinc-600 dark:text-zinc-400",
                  "rounded-lg",
                  "hover:no-underline",
                  "no-underline",
                  "h-[40px] w-[40px]",
                )}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li key={pageNumber}>
              <Link
                to={
                  pageNumber === 1 ? basePath : `${basePath}/page/${pageNumber}`
                }
                className={clsx(
                  "text-sm",
                  "flex items-center justify-center",
                  "rounded-lg",
                  "hover:no-underline",
                  "hover:text-zinc-900 dark:hover:text-white",
                  "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                  "h-[40px] w-[40px]",
                  "no-underline",
                  pageNumber !== currentPage &&
                    "text-zinc-600 dark:text-zinc-400",
                  pageNumber === currentPage && "text-zinc-900 dark:text-white",
                  pageNumber === currentPage && "bg-zinc-200 dark:bg-zinc-800",
                )}
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}

        <li>
          <Link
            to={
              currentPage === lastPage
                ? undefined
                : `${basePath}/page/${currentPage + 1}`
            }
            className={clsx(
              "rounded-lg",
              "hover:no-underline",
              "text-zinc-600 dark:text-zinc-400",
              "hover:text-zinc-900 dark:hover:text-white",
              currentPage !== lastPage && "opacity-70",
              currentPage === lastPage && "pointer-events-none opacity-20",
            )}
          >
            <ChevronRight />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
