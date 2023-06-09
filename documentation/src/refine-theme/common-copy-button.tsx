import React, { useCallback, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import { SubtractIcon } from "./icons/subtract";

export const CommonCopyButton = ({ code, className }) => {
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeout = useRef(undefined);

    const handleCopyCode = useCallback(() => {
        copy(code);
        setIsCopied(true);
        copyTimeout.current = window.setTimeout(() => {
            setIsCopied(false);
        }, 1000);
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
                "!bg-gray-900",
                "bg-opacity-50",
                "rounded",
                "hover:!bg-gray-900 hover:bg-opacity-75",
                isCopied && "bg-opacity-100",
                "group",
                "transition-[background-color] duration-200 ease-in-out",
            )}
            onClick={handleCopyCode}
        >
            <SubtractIcon
                className={clsx(
                    "w-4 h-4",
                    "text-gray-500",
                    isCopied && "rotate-[360deg]",
                    "group-hover:scale-110",
                    "transition-transform duration-200 ease-in-out",
                )}
            />
        </button>
    );
};
