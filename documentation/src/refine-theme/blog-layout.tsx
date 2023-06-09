import React from "react";
import { CommonLayout } from "./common-layout";

export const RefineBlogLayout = (props: any) => {
    const { children } = props;

    return (
        <CommonLayout {...props}>
            <div className="refine-prose">{children}</div>
        </CommonLayout>
    );
};
