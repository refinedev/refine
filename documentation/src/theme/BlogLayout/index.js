import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";

export default function BlogLayout(props) {
    const { children, toc, ...layoutProps } = props;

    return (
        <Layout {...layoutProps}>
            <div className="container margin-vert--lg">
                <div className="row">
                    {toc && (
                        <div className="col col--3">
                            <div>Author</div>
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
