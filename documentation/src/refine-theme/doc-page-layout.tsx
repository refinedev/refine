import React from "react";
import { DocHeader } from "./doc-header";
import { DocSidebar } from "./doc-sidebar";
import clsx from "clsx";
import { CommonFooter } from "./common-footer";

type Props = React.PropsWithChildren<{}>;

export const DocPageLayout = ({ children }: Props) => {
    return (
        <>
            <DocHeader />
            <div
                className={clsx(
                    "flex items-start justify-start",
                    "w-full flex-1 max-w-[1664px]",
                    "mx-auto",
                )}
            >
                <DocSidebar />
                {children}
            </div>
            <CommonFooter />
        </>
    );
};
