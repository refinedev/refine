import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

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
                        <span className="text-sm leading-6 text-gray-500 dark:text-gray-300">
                            Previous
                        </span>
                        <span className="text-base text-refine-link underline break-all">
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
                        <span className="text-sm leading-6 text-gray-500 dark:text-gray-300">
                            Next
                        </span>
                        <span className="text-base text-refine-blue underline break-all">
                            {next.title}
                        </span>
                    </div>
                </Link>
            )}
        </div>
    );
};
