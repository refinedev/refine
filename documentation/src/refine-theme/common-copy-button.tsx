import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SubtractIcon } from "./icons/subtract";

export const CommonCopyButton = ({ code, className }) => {
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeout = useRef(undefined);

    const handleCopyCode = useCallback(() => {
        try {
            navigator.clipboard.writeText(code).then(() => {
                setIsCopied(true);
                copyTimeout.current = window.setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            });
        } catch (error) {}
    }, [code]);

    useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

    return (
        <button
            type="button"
            aria-label={isCopied ? "Copied!" : "Copy code to clipboard"}
            title={"Copy code to clipboard"}
            className={clsx(
                "w-8 h-8",
                "flex justify-center items-center",
                "bg-gray-50",
                "hover:bg-gray-100",
                "dark:bg-gray-800",
                "dark:hover:bg-gray-900",
                "rounded",
                "group",
                "transition-[background-color] duration-200 ease-in-out",
            )}
            onClick={handleCopyCode}
        >
            <SubtractIcon
                className={clsx(
                    "w-4 h-4",
                    "text-gray-400",
                    "dark:text-gray-500",
                    isCopied && "rotate-[360deg]",
                    "transition-all duration-200 ease-in-out",
                )}
            />
        </button>
    );
};
