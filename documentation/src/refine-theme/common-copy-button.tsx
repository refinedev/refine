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
        "refine-code-block-copy-button",
        "w-6 h-6",
        "flex justify-center items-center",
        "bg-gray-200",
        "dark:bg-gray-800",
        "hover:bg-gray-300",
        "dark:hover:bg-refine-react-dark-code",
        "rounded",
        "group",
        "transition-[background-color] duration-200 ease-in-out",
      )}
      onClick={handleCopyCode}
    >
      <SubtractIcon
        className={clsx(
          "w-3 h-3",
          "text-gray-500",
          "dark:text-gray-400",
          isCopied && "rotate-[360deg]",
          "transition-all duration-200 ease-in-out",
        )}
      />
    </button>
  );
};
