import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { ArrowLeftIcon } from "./icons/arrow-left";
import { ArrowRightIcon } from "./icons/arrow-right";
import { ChevronDownIcon } from "./icons/chevron-down";

export const DocPaginator = (props) => {
    const { previous, next } = props;

    return (
        <div
            className={clsx(
                "grid grid-cols-1 md:grid-cols-2",
                "gap-4",
                "w-full",
            )}
        >
            {previous && (
                <Link
                    href={previous.permalink}
                    className={clsx(
                        "flex-1",
                        "p-4",
                        "rounded-lg",
                        "border border-gray-200 dark:border-gray-700",
                        "hover:bg-gray-100 hover:dark:bg-gray-700",
                        "hover:no-underline",
                    )}
                >
                    <div className="flex-1 flex items-start justify-center flex-col gap-2 text-left">
                        <div className="flex items-center gap-2 text-sm leading-6 text-gray-500 dark:text-gray-300">
                            <span className="bg-gray-50 dark:bg-gray-800 dark:bg-opacity-50 p-2 rounded">
                                <ArrowLeftIcon />
                            </span>
                            Previous
                        </div>
                        <span className="text-base text-refine-link-light dark:text-refine-link-dark underline break-all">
                            {previous.title}
                        </span>
                    </div>
                </Link>
            )}
            {next && (
                <Link
                    href={next.permalink}
                    className={clsx(
                        "flex-1",
                        "p-4",
                        "rounded-lg",
                        "border border-gray-200 dark:border-gray-700",
                        "hover:bg-gray-100 hover:dark:bg-gray-700",
                        "hover:no-underline",
                        !previous && "col-start-2",
                    )}
                >
                    <div className="flex-1 flex items-end justify-center flex-col gap-2 text-right">
                        <div className="flex items-center gap-2 text-sm leading-6 text-gray-500 dark:text-gray-300">
                            Next
                            <span className="bg-gray-50 dark:bg-gray-800 dark:bg-opacity-50 p-2 rounded">
                                <ArrowRightIcon />
                            </span>
                        </div>

                        <span className="text-base text-refine-blue underline break-all">
                            {next.title}
                        </span>
                    </div>
                </Link>
            )}
        </div>
    );
};
