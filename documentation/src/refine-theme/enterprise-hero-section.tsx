import React, { SVGProps } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

export const EnterpriseHeroSection = ({
    className,
}: {
    className?: string;
}) => {
    const { colorMode } = useColorMode();

    return (
        <div
            className={clsx(
                "flex flex-col",
                "landing-md:grid landing-md:grid-cols-12",
                "landing-md:items-center",
                "not-prose",
                className,
            )}
        >
            <div className={clsx("flex flex-col", "col-start-1 col-end-8")}>
                <h1
                    className={clsx(
                        "max-w-xl landing-md:max-w-[408px] landing-lg:max-w-non landing-lg:whitespace-nowrap",
                        "text-[32px] leading-[40px] landing-sm:text-[56px] landing-sm:leading-[72px]",
                        "tracking-tight",
                        "text-start",
                        "pl-0 landing-sm:pl-6 landing-md:pl-10",
                        "dark:text-gray-0 text-gray-900",
                    )}
                >
                    Refine{" "}
                    <span
                        className={clsx(
                            "font-semibold",
                            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
                            "text-refine-indigo drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
                        )}
                    >
                        Enterprise Edition
                    </span>
                    .
                </h1>
                <p
                    className={clsx(
                        "max-w-[446px]",
                        "mt-6",
                        "pl-0 landing-sm:pl-6 landing-md:pl-10",
                        "dark:text-gray-400 text-gray-600",
                    )}
                >
                    Our solution for larger organizations with extensive{" "}
                    <span className={clsx("dark:text-gray-0 text-gray-900")}>
                        security
                    </span>
                    and{" "}
                    <span className={clsx("dark:text-gray-0 text-gray-900")}>
                        support
                    </span>{" "}
                    needs. Includes official integrations with enterprise-grade{" "}
                    <span className={clsx("dark:text-gray-0 text-gray-900")}>
                        identity providers
                    </span>{" "}
                    and
                    <span className={clsx("dark:text-gray-0 text-gray-900")}>
                        relational databases
                    </span>
                    .
                </p>
                <div
                    className={clsx(
                        "pl-0 landing-sm:pl-6 landing-md:pl-10",
                        "mt-6 landing-lg:mt-16",
                        "flex",
                        "items-center",
                        "justify-start",
                        "gap-4",
                        "landing-lg:gap-6",
                    )}
                >
                    <Link
                        to="docs"
                        className={clsx(
                            "self-start",
                            "rounded-2xl landing-sm:rounded-3xl",
                            "!text-gray-0 dark:!text-gray-900",
                            "bg-refine-blue dark:bg-refine-cyan-alt",
                            "transition-[filter]",
                            "duration-150",
                            "ease-in-out",
                            "hover:brightness-110",
                            "py-3",
                            "pl-7 pr-8",
                            "landing-md:px-8",
                            "landing-lg:pl-7 landing-lg:pr-8",
                            "flex",
                            "items-center",
                            "justify-center",
                            "gap-2",
                            "hover:!no-underline",
                        )}
                    >
                        <GetInTouchIcon />
                        <span className={clsx("text-base", "font-semibold")}>
                            Get in touch
                        </span>
                    </Link>
                </div>
            </div>
            <div
                className={clsx(
                    "flex",
                    "justify-end",
                    "col-start-8",
                    "col-end-13",
                    "mt-12 landing-sm:mt-16 landing-md:mt-0",
                )}
            >
                <img
                    className={clsx(
                        "landing-md:h-[360px] landing-md:w-[360px]",
                        "landing-md:h-[360px] landing-md:w-[360px]",
                    )}
                    src={`https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/enterprise-hero-image-${colorMode}.png`}
                    alt="refine enterprise image"
                />
            </div>
        </div>
    );
};

const GetInTouchIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
        className={clsx("text-gray-0 dark:text-gray-900", props.className)}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M3.604 1.004a2.58 2.58 0 0 0-2.864.588A2.65 2.65 0 0 0 .217 4.48l1.519 3.517-1.52 3.524a2.65 2.65 0 0 0 .525 2.888 2.58 2.58 0 0 0 2.863.587l10.8-4.571A2.63 2.63 0 0 0 16 8a2.63 2.63 0 0 0-1.596-2.425l-10.8-4.571Zm-1.713 1.7a.98.98 0 0 1 1.09-.227l10.8 4.572c.37.156.619.528.619.951 0 .423-.25.795-.62.951l-10.8 4.572a.98.98 0 0 1-1.089-.226l-.558.54.558-.54a1.05 1.05 0 0 1-.205-1.142L3.132 8.8H6a.8.8 0 0 0 0-1.6H3.134L1.686 3.846a1.05 1.05 0 0 1 .205-1.142Z"
            clipRule="evenodd"
        />
    </svg>
);
