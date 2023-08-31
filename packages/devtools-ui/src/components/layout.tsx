import React from "react";
import clsx from "clsx";

import { Header } from "./header";
import { Sidebar } from "./sidebar";

type Props = React.PropsWithChildren<{}>;

export const Layout = ({ children }: Props) => {
    return (
        <div
            className={clsx(
                "re-bg-gray-900",
                "re-flex",
                "re-flex-col",
                "re-h-full",
            )}
        >
            <Header />
            <div
                className={clsx(
                    "re-flex",
                    "re-flex-1",
                    "re-w-full",
                    "re-h-full",
                )}
            >
                <Sidebar />
                <div
                    className={clsx(
                        "re-flex-1",
                        "re-p-8",
                        "re-overflow-scroll",
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
