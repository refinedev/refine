import React from "react";
import { CommonLayout } from "./common-layout";
import { CommonHeader } from "./common-header";
import { BlogFooter } from "./blog-footer";
import clsx from "clsx";

export const RefineBlogLayout = (props: any) => {
    const { children, toc, ...layoutProps } = props;

    return (
        <CommonLayout {...layoutProps}>
            {/* If there's TOC, then we can say that this is a blog post page. */}
            {/* Then we can pass `trackProgress` prop to the header. */}
            <CommonHeader hasSticky={true} trackProgress={!!toc} />
            <div
                className={clsx(
                    "flex",
                    "justify-center",
                    "mx-auto",
                    "max-w-screen-blog-max",
                    "w-full",
                )}
            >
                {/* if there's TOC, we need to replicate the same width in the left side to center the content */}
                {toc && (
                    <div
                        className={clsx(
                            "w-[280px]",
                            "hidden blog-lg:block",
                            "flex-shrink-0",
                        )}
                    />
                )}
                <div className={clsx("refine-prose", "flex-1", "min-w-0")}>
                    {children}
                </div>
                {toc && (
                    <div
                        className={clsx(
                            "w-[280px]",
                            "hidden blog-md:block",
                            "flex-shrink-0",
                        )}
                    >
                        {toc}
                    </div>
                )}
            </div>
            <BlogFooter />
        </CommonLayout>
    );
};
