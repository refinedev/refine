import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";

import { AuthorCard } from "../../components/blog";

export default function BlogLayout(props) {
    const { children, toc, ...layoutProps } = props;

    return (
        <Layout {...layoutProps}>
            <div className="container margin-vert--lg">
                <div className="flex flex-row flex-wrap lg:flex-nowrap lg:gap-8">
                    {toc && (
                        <div className="w-full lg:w-1/4">
                            <AuthorCard />
                            <br />
                            {toc}
                        </div>
                    )}
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
        </Layout>
    );
}
