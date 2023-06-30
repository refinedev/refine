import clsx from "clsx";
import React from "react";

export const TopAnnouncement = () => {
    return (
        <div
            className={clsx(
                "w-full",
                "p-2",
                "header-md:p-4",
                "bg-refine-blue",
                // "bg-opacity-[0.15]",
                "text-xs",
                "text-gray-900",
                "text-center",
            )}
            style={{
                borderBottom: "1px solid rgba(0, 128, 255, 0.15)",
                background:
                    "linear-gradient(180deg, rgba(0, 128, 255, 0.05) 0%, rgba(110, 179, 247, 0.00) 100%), #F6FAFE",
            }}
        >
            👀 Interested in the new enterprise backend features of refine? 👉{" "}
            <a
                href="https://s.refine.dev/go-enterprise"
                target="_blank"
                rel="noreferrer"
                className={clsx(
                    "font-bold",
                    "text-refine-blue",
                    "hover:text-refine-blue-dark",
                    "no-underline",
                    "hover:no-underline",
                )}
            >
                Join now
            </a>{" "}
            and get early access!
        </div>
    );
};
