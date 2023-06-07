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
            className="flex justify-end"
            aria-label={translate({
                id: "theme.blog.paginator.navAriaLabel",
                message: "Blog list page navigation",
                description: "The ARIA label for the blog pagination",
            })}
        >
            <ul className="flex list-none items-center gap-1">
                {currentPage !== 1 && (
                    <li>
                        <Link
                            to={
                                currentPage - 1 === 1
                                    ? basePath
                                    : `${basePath}/page/${currentPage - 1}`
                            }
                            className={clsx(
                                "text-gray-500 dark:text-gray-0",
                                "rounded",
                                "hover:no-underline",
                            )}
                        >
                            <ChevronLeft />
                        </Link>
                    </li>
                )}

                {paginationRange.map((pageNumber) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li
                                key={`page:${pageNumber}`}
                                className={clsx(
                                    "flex",
                                    "text-gray-500 dark:text-gray-0",
                                    "rounded",
                                    "hover:no-underline",
                                    "px-3 py-1",
                                    "no-underline",
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
                                    pageNumber === 1
                                        ? basePath
                                        : `${basePath}/page/${pageNumber}`
                                }
                                className={clsx(
                                    "flex",
                                    "text-gray-500 dark:text-gray-0",
                                    "rounded",
                                    "hover:no-underline",
                                    "px-3 py-1",
                                    "no-underline",
                                    pageNumber === currentPage &&
                                        "bg-gray-100 dark:bg-gray-700",
                                )}
                            >
                                {pageNumber}
                            </Link>
                        </li>
                    );
                })}

                {currentPage !== lastPage && (
                    <li>
                        <Link
                            to={
                                currentPage === lastPage
                                    ? undefined
                                    : `${basePath}/page/${currentPage + 1}`
                            }
                            className={clsx(
                                "text-gray-500 dark:text-gray-0",
                                "rounded",
                                "hover:no-underline",
                            )}
                        >
                            <ChevronRight />
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
