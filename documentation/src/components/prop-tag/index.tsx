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
                    "leading-4",
                    "p-0",
                    "ml-1",
                    "rounded",
                    "bg-refine-orange",
                    "tracking-wide",
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
                    "inline",
                    "text-gray-0",
                    "text-xs",
                    "leading-4",
                    "p-0",
                    "ml-1",
                    "rounded",
                    "bg-refine-yellow",
                    "tracking-wide",
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
                    "leading-4",
                    "p-0",
                    "ml-1",
                    "rounded",
                    "bg-refine-red",
                    "tracking-wide",
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
                    "leading-4",
                    "p-0",
                    "ml-1",
                    "rounded",
                    "bg-refine-green",
                    "tracking-wide",
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
                    "leading-4",
                    "p-0",
                    "ml-1",
                    "rounded",
                    "bg-gray-800",
                    "tracking-wide",
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
