import React from "react";
import clsx from "clsx";

import { AuthorCardWithHook } from "../../components/blog";
import { RefineBlogLayout } from "@site/src/refine-theme/blog-layout";
import { BlogHeader } from "@site/src/refine-theme/blog-header";

export default function BlogLayout(props) {
    const { children, toc, sidebar, ...layoutProps } = props;

    return (
        <RefineBlogLayout {...layoutProps}>
            <BlogHeader />
            <div className="margin-vert--lg container  max-w-[1040px]">
                <div className="flex flex-row flex-wrap lg:flex-nowrap lg:gap-4">
                    {sidebar ??
                        (toc && (
                            <div className="w-full lg:w-1/4">
                                <AuthorCardWithHook />
                                <br />
                                {toc}
                            </div>
                        ))}
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
            </div>
        </RefineBlogLayout>
    );
}
