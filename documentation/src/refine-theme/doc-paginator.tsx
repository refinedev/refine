import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { ArrowLeftIcon } from "./icons/arrow-left";
import { ArrowRightIcon } from "./icons/arrow-right";

export const DocPaginator = (props) => {
    const { previous, next } = props;

    return (
        <div className={clsx("grid grid-cols-2", "gap-4 2xl:gap-8", "w-full")}>
            {previous && (
                <Link
                    href={previous.permalink}
                    className={clsx(
                        "group",
                        "flex-1",
                        "p-4 2xl:p-6",
                        "rounded-lg",
                        "border border-gray-200 dark:border-gray-700",
                        "hover:bg-gray-100 hover:dark:bg-gray-700",
                        "hover:no-underline",
                    )}
                >
                    <div className="flex-1 flex items-start justify-center flex-col gap-2 2xl:gap-4 text-left">
                        <div
                            className={clsx(
                                "flex items-center gap-2",
                                "text-xs leading-3 content-md:text-sm content-md:leading-6",
                                "text-gray-500 dark:text-gray-300",
                                "text-xs content-md:text-sm content-4xl:text-lg",
                            )}
                        >
                            <span
                                className={clsx(
                                    "bg-gray-100 dark:bg-gray-800",
                                    "dark:bg-opacity-50",
                                    "group-hover:bg-gray-50 dark:group-hover:bg-gray-800 dark:group-hover:bg-opacity-100",
                                    "flex items-center justify-center",
                                    "rounded",
                                    "w-6 h-6",
                                )}
                            >
                                <ArrowLeftIcon className="text-gray-400 dark:text-gray-500" />
                            </span>
                            Previous
                        </div>
                        <span
                            className={clsx(
                                "text-xs content-md:text-base content-4xl:text-xl",
                                "text-refine-link-light dark:text-refine-link-dark",
                                "underline",
                                "ml-8",
                            )}
                        >
                            {previous.title}
                        </span>
                    </div>
                </Link>
            )}
            {next && (
                <Link
                    href={next.permalink}
                    className={clsx(
                        "group",
                        "flex-1",
                        "p-4",
                        "rounded-lg",
                        "border border-gray-200 dark:border-gray-700",
                        "hover:bg-gray-100 hover:dark:bg-gray-700",
                        "hover:no-underline",
                        !previous && "col-start-2",
                    )}
                >
                    <div className="flex-1 flex items-end justify-center flex-col gap-2 2xl:gap-4 text-right">
                        <div
                            className={clsx(
                                "flex items-center gap-2",
                                "text-xs leading-3 content-md:text-sm content-md:leading-6",
                                "text-gray-500 dark:text-gray-300",
                                "text-xs content-md:text-sm content-4xl:text-lg",
                            )}
                        >
                            Next
                            <span
                                className={clsx(
                                    "bg-gray-100 dark:bg-gray-800",
                                    "dark:bg-opacity-50",
                                    "group-hover:bg-gray-50 dark:group-hover:bg-gray-800 dark:group-hover:bg-opacity-100",
                                    "flex items-center justify-center",
                                    "rounded",
                                    "w-6 h-6",
                                )}
                            >
                                <ArrowRightIcon className="text-gray-400 dark:text-gray-500" />
                            </span>
                        </div>

                        <span
                            className={clsx(
                                "text-xs content-md:text-base content-4xl:text-xl",
                                "text-refine-link-light dark:text-refine-link-dark",
                                "underline",
                                "mr-8",
                            )}
                        >
                            {next.title}
                        </span>
                    </div>
                </Link>
            )}
        </div>
    );
};
