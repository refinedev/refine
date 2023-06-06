import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
    useSidebarBreadcrumbs,
    useHomePageRoute,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import { HomeIcon } from "./icons/home";
import { ChevronRightIcon } from "./icons/chevron-right";

export const DocBreadcrumbs = () => {
    const breadcrumbs = useSidebarBreadcrumbs();
    const homePageRoute = useHomePageRoute();

    if (!breadcrumbs) {
        return null;
    }

    return (
        <nav
            className={clsx("pb-6")}
            aria-label={translate({
                id: "theme.docs.breadcrumbs.navAriaLabel",
                message: "Breadcrumbs",
                description: "The ARIA label for the breadcrumbs",
            })}
        >
            <ul
                className={clsx("breadcrumbs", "flex items-center")}
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                {homePageRoute && (
                    <li>
                        <Link href="/docs">
                            <HomeIcon className="text-gray-400 dark:text-gray-400" />
                        </Link>
                    </li>
                )}
                {breadcrumbs.map((item, idx) => {
                    const isLast = idx === breadcrumbs.length - 1;

                    return (
                        <li
                            key={idx}
                            className={clsx("flex flex-row flex-nowrap")}
                        >
                            <ChevronRightIcon className="text-gray-300" />
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "text-gray-600 dark:text-gray-400",
                                        "text-sm",
                                        "leading-6",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={clsx(
                                        isLast
                                            ? "text-gray-500"
                                            : "text-gray-600 dark:text-gray-400",
                                        "text-sm",
                                        "leading-6",
                                    )}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
