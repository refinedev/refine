/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Original File: https://github.com/facebook/docusaurus/blob/main/website/src/components/BrowserWindow/index.tsx
 */

import React from "react";
import clsx from "clsx";

interface Props {
    children?: React.ReactNode;
    minHeight?: number;
    url?: string;
    hasBottom?: boolean;
}

export default function BrowserWindow({
    children,
    minHeight,
    url = "http://localhost:3000",
    hasBottom = false,
}: Props): JSX.Element {
    return (
        <div className={clsx("flex", "flex-col", "h-full")}>
            <div
                className={clsx(
                    "flex-shrink-0",
                    "rounded-tl-lg",
                    "rounded-tr-lg",
                    "border-b",
                    "border-b-gray-200 dark:border-b-gray-900",
                    "px-4 py-2",
                    "flex items-center justify-center",
                    "bg-gray-100 dark:bg-gray-700",
                    "relative",
                )}
            >
                <div
                    className={clsx(
                        "absolute",
                        "h-full",
                        "left-3",
                        "top-0",
                        "flex items-center justify-center",
                        "gap-1",
                    )}
                >
                    <div
                        className={clsx(
                            "w-2.5 h-2.5",
                            "rounded-full",
                            "bg-refine-red",
                        )}
                    />
                    <div
                        className={clsx(
                            "w-2.5 h-2.5",
                            "rounded-full",
                            "bg-refine-orange",
                        )}
                    />
                    <div
                        className={clsx(
                            "w-2.5 h-2.5",
                            "rounded-full",
                            "bg-refine-green",
                        )}
                    />
                </div>
                <div
                    className={clsx(
                        "rounded-lg",
                        "p-2",
                        "bg-gray-0 dark:bg-gray-800",
                        "flex items-center justify-center",
                        "text-gray-500 dark:text-gray-400",
                        "text-xs",
                        "w-full",
                        "max-w-[260px]",
                        "md:max-w-[320px]",
                    )}
                >
                    {`${url}`.replace(/^http(s?):\/\//, "")}
                </div>
            </div>
            <div
                className={clsx(
                    "flex-1",
                    "overflow-hidden",
                    "p-1",
                    "bg-gray-100 dark:bg-gray-700",
                    !hasBottom && "rounded-bl-lg rounded-br-lg",
                    hasBottom && "border-b-gray-200 dark:border-b-gray-900",
                    hasBottom && "border-b",
                )}
                style={{ minHeight }}
            >
                {children}
            </div>
        </div>
    );
}
