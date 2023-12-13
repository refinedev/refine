import clsx from "clsx";
import React, { FC } from "react";
import { EnterpriseGetInTouchButton } from "./enterprise-get-in-touch-button";

type Props = {
    className?: string;
};

export const EnterpriseGetInTouchCta: FC<Props> = (props) => {
    return (
        <div className={clsx(props.className)}>
            <div
                className={clsx(
                    "not-prose",
                    "flex flex-col landing-md:flex-row",
                    "items-center",
                    "justify-between",
                    "gap-4 landing-sm:gap-6",
                    "py-6 pr-6 pl-6 landing-md:pl-12",
                    "rounded-2xl landing-md:rounded-full",
                    "dark:bg-gray-800 bg-gray-50",
                    "dark:bg-enterprise-cta-dark dark:landing-md:bg-enterprise-cta-dark-md",
                    "bg-enterprise-cta-light landing-md:bg-enterprise-cta-light-md",
                )}
            >
                <h2
                    className={clsx(
                        "text-sm landing-sm:text-2xl",
                        "dark:text-gray-400 text-gray-600",
                    )}
                >
                    Ready to try Refine Enterprise Edition?
                </h2>
                <EnterpriseGetInTouchButton />
            </div>
        </div>
    );
};
