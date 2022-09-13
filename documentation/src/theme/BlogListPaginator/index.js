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
            className="font-montserrat flex justify-end"
            aria-label={translate({
                id: "theme.blog.paginator.navAriaLabel",
                message: "Blog list page navigation",
                description: "The ARIA label for the blog pagination",
            })}
        >
            <ul className="flex list-none items-center space-x-2">
                <li>
                    <Link
                        to={
                            currentPage === 1
                                ? undefined
                                : currentPage - 1 === 1
                                ? basePath
                                : `${basePath}/page/${currentPage - 1}`
                        }
                        className="hover:no-underline"
                    >
                        <div
                            className={clsx("pagination-item", {
                                disabled: currentPage === 1,
                            })}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft />
                        </div>
                    </Link>
                </li>
                {paginationRange.map((pageNumber) => {
                    if (pageNumber === DOTS) {
                        return <li className="dots">&#8230;</li>;
                    }

                    return (
                        <li key={pageNumber}>
                            <Link
                                to={
                                    pageNumber === 1
                                        ? basePath
                                        : `${basePath}/page/${pageNumber}`
                                }
                                className="hover:no-underline"
                            >
                                <div
                                    className={clsx("pagination-item", {
                                        active: pageNumber === currentPage,
                                    })}
                                >
                                    {pageNumber}
                                </div>
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
                        className="hover:no-underline"
                    >
                        <div
                            className={clsx("pagination-item", {
                                disabled: currentPage === lastPage,
                            })}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight />
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
