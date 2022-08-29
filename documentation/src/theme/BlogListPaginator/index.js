import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import PaginatorNavLink from "@theme/PaginatorNavLink";

import { ChevronLeft, ChevronRight } from "../../components/blog/icons";
import { usePagination, DOTS } from "../../hooks/use-pagination";

export default function BlogListPaginator(props) {
    const { metadata } = props;
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
            <ul className="inline-flex items-center list-none">
                <li>
                    <Link className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <ChevronLeft />
                    </Link>
                </li>
                {paginationRange.map((pageNumber) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li className="pagination-item dots">&#8230;</li>
                        );
                    }

                    return (
                        <li
                            key={pageNumber}
                            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li>
                    <a
                        href="#"
                        className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRight />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
