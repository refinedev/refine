import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";

import { AuthorCard } from "../../components/blog";

export default function BlogLayout(props) {
    const { children, toc, ...layoutProps } = props;

    return (
        <Layout {...layoutProps}>
            <div className="container margin-vert--lg">
                <div className="row">
                    {toc && (
                        <div className="col col--3">
                            <AuthorCard />
                            <br />
                            {toc}
                        </div>
                    )}
                    <main
                        className={clsx("col", {
                            "col--9": toc,
                            "col--12": !toc,
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
