import clsx from "clsx";
import React from "react";
import { CautionIcon } from "./icons/caution";
import { CommandLineIcon } from "./icons/command-line";
import { InfoIcon } from "./icons/info";
import { TipIcon } from "./icons/tip";
import { NoteIcon } from "./icons/note";
import { GithubIcon } from "./icons/github";

type Props = {
    type:
        | "caution"
        | "command-line"
        | "sourcecode"
        | "info"
        | "tip"
        | "note"
        | "additional"
        | "danger"
        | "info-tip"
        | "simple";
    title?: React.ReactNode;
    children: React.ReactNode;
};

const icons = {
    danger: CautionIcon,
    caution: CautionIcon,
    "command-line": CommandLineIcon,
    sourcecode: GithubIcon,
    info: InfoIcon,
    tip: TipIcon,
    note: NoteIcon,
    additional: NoteIcon,
    "info-tip": TipIcon,
};

const colorTextClasses = {
    danger: "text-refine-red",
    caution: "text-[#F2800D] dark:text-refine-orange",
    "command-line": "text-refine-purple",
    sourcecode: "text-refine-pink",
    info: "text-refine-blue dark:text-[#6EB3F7]",
    "info-tip": "text-refine-blue dark:text-[#6EB3F7]",
    tip: "text-refine-green",
    note: "text-refine-cyan",
    additional: "text-refine-cyan",
    simple: "text-gray-700 dark:text-gray-100",
};

const colorWrapperClasses = {
    danger: "bg-refine-red bg-opacity-10 border-l-refine-red",
    caution:
        "bg-[#F2800D]/10 dark:bg-refine-orange/10 dark:bg-opacity-10 bg-opacity-10 border-l-refine-orange",
    "command-line": "bg-refine-purple bg-opacity-10 border-l-refine-purple",
    sourcecode: "bg-refine-pink bg-opacity-10 border-l-refine-pink",
    info: "bg-refine-blue/10 dark:bg-[#6EB3F7]/10 bg-opacity-10  dark:bg-opacity-10 border-l-refine-blue",
    "info-tip":
        "bg-refine-blue/10 dark:bg-[#6EB3F7]/10 bg-opacity-10  dark:bg-opacity-10 border-l-refine-blue",
    tip: "bg-refine-green bg-opacity-10 border-l-refine-green",
    note: "bg-refine-cyan bg-opacity-10 border-l-refine-cyan",
    additional: "bg-refine-cyan bg-opacity-10 border-l-refine-cyan",
    simple: "border dark:border-gray-700 border-gray-300",
};

const titles = {
    danger: "DANGER",
    caution: "CAUTION",
    "command-line": "COMMAND LINE",
    sourcecode: "SOURCE CODE",
    info: "INFORMATION",
    tip: "TIP",
    note: "NOTE",
    additional: "ADDITIONAL INFO",
    "info-tip": "INFORMATION",
    simple: "Good to know",
};

export const Admonition = ({ type, title, children }: Props) => {
    const Icon = icons[type] ?? (() => null);
    const clsText = colorTextClasses[type] ?? "tex-inherit";
    const clsWrapper = colorWrapperClasses[type] ?? "bg-inherit";

    if (type === "simple") {
        return (
            <Simple type={type} title={title}>
                {children}
            </Simple>
        );
    }

    return (
        <div
            className={clsx(
                "rounded-lg",
                "admonition",
                `admonition-${type}`,
                "mb-6",
                clsWrapper,
            )}
        >
            <div
                className={clsx(
                    "border-l-4",
                    "border-l-solid",
                    "border-l-inherit",
                    "rounded-tl-lg",
                    "rounded-bl-lg",
                    "p-4",
                    "flex flex-col",
                    "gap-2 sm:gap-4",
                )}
            >
                {(title || titles[type]) && (
                    <div
                        className={clsx(
                            "flex",
                            "items-center",
                            "gap-2",
                            "text-xs sm:text-base 2xl:text-base 2xl:leading-7",
                            "font-semibold",
                            clsText,
                        )}
                    >
                        <Icon />
                        <span className="uppercase">
                            {title ?? titles[type] ?? ""}
                        </span>
                    </div>
                )}
                <div className={clsx("text-gray-0", "text-base", "last:mb-0")}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const Simple = ({ type, title, children }: Props) => {
    const clsText = colorTextClasses[type] ?? "tex-inherit";
    const clsWrapper = colorWrapperClasses[type] ?? "bg-inherit";

    return (
        <div
            className={clsx(
                "rounded-md",
                "admonition",
                `admonition-${type}`,
                "mb-6",
                clsWrapper,
            )}
        >
            <div className={clsx("flex flex-col", "gap-2", !title && "pt-4")}>
                {title && (
                    <div
                        className={clsx(
                            "px-4",
                            "pt-4",
                            "text-sm",
                            "leading-5",
                            "-mt-0.5",
                            clsText,
                        )}
                    >
                        <span className="font-semibold">{title ?? ""}</span>
                        <span>:</span>
                    </div>
                )}
                <div
                    className={clsx(
                        "text-gray-0",
                        "text-base",
                        "last:mb-0",
                        "px-4 pb-4",
                        "admonition-content",
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
