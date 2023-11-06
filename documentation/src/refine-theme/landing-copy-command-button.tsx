import React from "react";
import clsx from "clsx";

import {
    ChangingTextElement,
    ChangingTextElementRef,
} from "./changing-text-element";
import { LandingCopySuccessIcon } from "./icons/landing-copy-success";

const installText = "npm create refine-app@latest";
const copiedText = "copied to clipboard!";

export const LandingCopyCommandButton = ({
    className,
}: {
    className?: string;
}) => {
    const changingTextRef = React.useRef<ChangingTextElementRef>(null);
    const copyTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const [copied, setCopied] = React.useState(false);
    const [fadedOut, setFadedOut] = React.useState(false);

    const onCopy = () => {
        if (changingTextRef.current) {
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
            setCopied(false);
            changingTextRef.current.start();
            // copy to clipboard
            navigator.clipboard.writeText(installText);
            copyTimeoutRef.current = setTimeout(() => {
                setFadedOut(true);
                setTimeout(() => {
                    changingTextRef.current?.reset();
                    setFadedOut(false);
                }, 300);
            }, 3000);
        }
    };

    return (
        <button
            type="button"
            onClick={onCopy}
            className={clsx(
                "self-start",
                "appearance-none",
                "focus:outline-none",
                "border-none",
                "py-3",
                "px-6",
                "rounded-3xl",
                "bg-refine-blue dark:bg-refine-cyan-alt",
                "bg-opacity-10 dark:bg-opacity-10",
                "text-refine-blue dark:text-refine-cyan-alt",
                "text-[13px] leading-5",
                "leading-6",
                "font-mono",
                "overflow-hidden",
                "relative",
                className,
            )}
        >
            <ChangingTextElement
                ref={changingTextRef}
                first={installText}
                second={copiedText}
                onEnd={() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 1500);
                }}
                tick={50}
                className={clsx(
                    "inline-block",
                    "whitespace-pre",
                    "duration-150",
                    "transition-opacity",
                    "will-change-contents",
                    "ease-in-out",
                    fadedOut && "opacity-0",
                    !fadedOut && "opacity-100",
                )}
                activeClassName={clsx("text-gray-500 dark:text-gray-0")}
            />
            <div
                className={clsx(
                    "py-4",
                    "pr-4",
                    "absolute",
                    "top-0",
                    "-right-8",
                    copied && "-translate-x-8",
                    "duration-150",
                    "ease-out",
                    "transition-transform",
                )}
            >
                <LandingCopySuccessIcon className={clsx()} />
            </div>
        </button>
    );
};
