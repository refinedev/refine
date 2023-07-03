import clsx from "clsx";
import React from "react";

export const TopAnnouncement = () => {
    return (
        <a
            href="https://s.refine.dev/discover-enterprise"
            target="_blank"
            rel="noreferrer"
            className={clsx(
                "block",
                "w-full",
                "p-2",
                "header-md:p-4",
                "bg-refine-blue",
                // "bg-opacity-[0.15]",
                "text-base",
                "text-gray-900",
                "text-center",
                "no-underline",
                "hover:no-underline",
                "hover:text-gray-900",
            )}
            style={{
                borderBottom: "1px solid rgba(0, 128, 255, 0.15)",
                background:
                    "linear-gradient(180deg, rgba(0, 128, 255, 0.05) 0%, rgba(110, 179, 247, 0.00) 100%), #F6FAFE",
            }}
        >
            👀 Interested in the latest enterprise backend features of refine?
            👉{" "}
            <span
                className={clsx(
                    "font-bold",
                    "text-refine-blue",
                    "hover:text-refine-blue-dark",
                )}
            >
                Join now
            </span>{" "}
            and get early access!
        </a>
    );
};
