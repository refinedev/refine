import clsx from "clsx";
import React from "react";

type Props = {
    asterisk?: boolean;
    deprecated?: boolean;
    required?: boolean;
    featured?: boolean;
    alt?: string;
};

const PropTag: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    asterisk,
    deprecated,
    required,
    featured,
    alt,
}) => {
    if (deprecated) {
        return (
            <div
                className={clsx(
                    "inline",
                    "text-gray-0",
                    "text-xs",
                    "leading-6",
                    "py-0.5",
                    "px-2",
                    "rounded",
                    "bg-refine-orange",
                    "tracking-wide",
                    "align-middle",
                )}
                title={alt}
            >
                {children ?? "deprecated"}
            </div>
        );
    }

    if (asterisk) {
        return (
            <div
                className={clsx(
                    "flex justify-center items-center",
                    "text-sm",
                    "text-gray-0",
                    "rounded-full",
                    "bg-refine-red",
                    "ml-1",
                    "w-4 h-4",
                    "align-middle",
                )}
                title={alt}
            >
                {children ?? "﹡"}
            </div>
        );
    }

    if (required) {
        return (
            <div
                className={clsx(
                    "inline",
                    "text-gray-0",
                    "text-xs",
                    "leading-6",
                    "py-0.5",
                    "px-2",
                    "rounded",
                    "bg-refine-red",
                    "tracking-wide",
                    "align-middle",
                )}
                title={alt}
            >
                {children ?? "required"}
            </div>
        );
    }

    if (featured) {
        return (
            <div
                className={clsx(
                    "inline",
                    "text-gray-0",
                    "text-xs",
                    "leading-6",
                    "py-0.5",
                    "px-2",
                    "rounded",
                    "bg-refine-green",
                    "tracking-wide",
                    "align-middle",
                )}
                title={alt}
            >
                {children ?? "featured"}
            </div>
        );
    }

    if (children) {
        return (
            <div
                className={clsx(
                    "inline",
                    "text-gray-0",
                    "text-xs",
                    "leading-6",
                    "py-0.5",
                    "px-2",
                    "rounded",
                    "bg-gray-800",
                    "tracking-wide",
                    "align-middle",
                )}
                title={alt}
            >
                {children}
            </div>
        );
    }

    return null;
};

export default PropTag;
