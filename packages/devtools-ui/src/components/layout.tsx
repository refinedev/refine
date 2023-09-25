import React from "react";
import clsx from "clsx";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { ProjectIdFixBanner } from "./project-id-fix-banner";

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
                    "re-overflow-hidden",
                    "re-h-[calc(100vh-36px-8px-8px-1px)]",
                )}
            >
                <Sidebar />
                <div
                    className={clsx(
                        "re-flex-1",
                        "re-p-4",
                        "md:re-p-6",
                        "lg:re-p-8",
                    )}
                >
                    <ProjectIdFixBanner />

                    <div className={clsx("re-flex-1", "re-overflow-scroll")}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
