import React from "react";
import clsx from "clsx";

export const ActiveItemBackground = ({ active }: { active?: boolean }) => {
    return (
        <div
            className={clsx(
                "re-absolute",
                "re-left-0",
                "re-top-0",
                "re-h-full",
                "re-w-full",
                active ? "re-scale-100" : "re-scale-0",
                "re-transition-all",
                "re-duration-300",
                "re-ease-[cubic-bezier(.25,.75,.5,1.25)]",
            )}
            style={{
                background:
                    "url(data:image/png;base64,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)",
                backgroundSize: "36px 36px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};
