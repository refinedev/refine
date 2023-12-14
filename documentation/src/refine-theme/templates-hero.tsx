import clsx from "clsx";
import React, { FC } from "react";

type Props = { className?: string };

export const TemplatesHero: FC<Props> = ({ className }) => {
    return (
        <div
            className={clsx(
                "relative",
                "flex",
                "flex-col",
                "items-start landing-md:items-center",
                "gap-6 landing-md:gap-12",
                "not-prose",
                "landing-md:mx-auto",
                "w-full",
                "overflow-hidden",
                className,
            )}
        >
            <img
                className={clsx(
                    "absolute",
                    "top-0",
                    "hidden landing-md:block",
                    "w-[1200px]",
                    "max-w-[1200px]",
                )}
                src="https://refine.ams3.cdn.digitaloceanspaces.com/templates/templates-hero.png"
                alt="Refine Templates"
            />
            <h2
                className={clsx(
                    "flex",
                    "items-center",
                    "justify-center",
                    "gap-2",
                    "text-[32px] leading-[40px] landing-sm:text-[56px] landing-sm:leading-[72px]",
                )}
            >
                <span className={clsx("dark:text-gray-0 text-gray-900")}>
                    Refine{" "}
                </span>
                <span
                    className={clsx(
                        "font-semibold",
                        "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
                        "text-refine-blue drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
                    )}
                >
                    Templates
                </span>
            </h2>
            <p
                className={clsx(
                    "text-base",
                    "max-w-[588px]",
                    "dark:text-gray-400 text-gray-600",
                )}
            >
                Browse ready-made templates with different interfaces, database
                collections, actions & more. Connect your data and start
                customizing your app interface!
            </p>
        </div>
    );
};
