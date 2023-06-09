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
            {/* <div className="container max-w-[1008px]">
                <div className="flex flex-row flex-wrap lg:flex-nowrap lg:gap-4">
                    <main
                        className={clsx({
                            "w-full lg:w-3/4": toc,
                            "w-full": !toc,
                        })}
                        itemScope
                        itemType="http://schema.org/Blog"
                    >
                        {children}
                    </main>
                    
                </div>
            </div> */}
            <BlogFooter />
        </RefineBlogLayout>
    );
}
