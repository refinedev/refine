import React from "react";
import clsx from "clsx";

import { RefineBlogLayout } from "@site/src/refine-theme/blog-layout";
import { BlogFooter } from "@site/src/refine-theme/blog-footer";
import { CommonHeader } from "@site/src/refine-theme/common-header";

export default function BlogLayout(props) {
    const { children, toc, ...layoutProps } = props;

    return (
        <RefineBlogLayout {...layoutProps}>
            <CommonHeader hasSticky={true} />
            <div className="flex justify-center max-w-[1304px] mx-auto">
                <div>{children}</div>
                {toc && <div className="w-[280px] hidden xl:block">{toc}</div>}
            </div>
            <BlogFooter />
        </RefineBlogLayout>
    );
}
