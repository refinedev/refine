import React, { useMemo, useRef } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
    useSidebarBreadcrumbs,
    useHomePageRoute,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import { HomeIcon } from "./icons/home";
import { ChevronRightIcon } from "./icons/chevron-right";
import { useTWBreakpoints } from "../hooks/use-tw-breakpoints";

const hiddenBreadcrumbText = "...";

export const DocBreadcrumbs = () => {
    const breakpoints = useTWBreakpoints();
    const breadcrumbs = useSidebarBreadcrumbs();
    const homePageRoute = useHomePageRoute();

    if (!breadcrumbs) {
        return null;
    }

    const breadcrumbList = useMemo(() => {
        const breadcrumbsLength = breadcrumbs.length;
        const shouldRenderDotdotdot = breadcrumbsLength >= 3 && !breakpoints.sm;

        if (!shouldRenderDotdotdot) {
            return breadcrumbs;
        }

        const firstBreadcrumb = breadcrumbs[0];
        const lastBreadcrumb = breadcrumbs[breadcrumbsLength - 1];
        const secondLastBreadcrumb = breadcrumbs[breadcrumbsLength - 2];

        return [
            firstBreadcrumb,
            hiddenBreadcrumbText,
            lastBreadcrumb,
            secondLastBreadcrumb,
        ];
    }, [breadcrumbs]);

    return (
        <nav
            className={clsx("refine-breadcrumbs", "pb-6")}
            aria-label={translate({
                id: "theme.docs.breadcrumbs.navAriaLabel",
                message: "Breadcrumbs",
                description: "The ARIA label for the breadcrumbs",
            })}
        >
            {breadcrumbList.find((item) => item.label === "Examples") && (
                <div
                    className={clsx(
                        "example-full-title",
                        "hidden",
                        "h-0 w-0",
                        "overflow-hidden",
                    )}
                    aria-hidden={true}
                >
                    {breadcrumbList
                        .slice(2)
                        .map((item) => item.label)
                        .join(" ")}
                    {" Example"}
                </div>
            )}
            <ul
                className={clsx("breadcrumbs", "flex flex-wrap items-center")}
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                {homePageRoute && (
                    <li>
                        <Link href="/docs">
                            <HomeIcon className="text-gray-400 dark:text-gray-400" />
                            <span className="sr-only">Documentation</span>
                        </Link>
                    </li>
                )}
                {breadcrumbList.map((item, idx) => {
                    const isHidden = item === hiddenBreadcrumbText;
                    const isLast = idx === breadcrumbs.length - 1;

                    return (
                        <li
                            key={idx}
                            className={clsx("flex flex-row flex-nowrap")}
                        >
                            <ChevronRightIcon className="text-gray-300" />
                            {isHidden ? (
                                <div className="text-gray-600 dark:text-gray-400">
                                    {hiddenBreadcrumbText}
                                </div>
                            ) : item.href && !isLast ? (
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
