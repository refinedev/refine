import React from "react";
import Layout from "@theme/Layout";

export default function BlogLayout(props) {
    const { toc, children, ...layoutProps } = props;

    return (
        <Layout {...layoutProps}>
            <div className="container margin-vert--lg">
                <div className="row">
                    {toc && <div className="col col--2">{toc}</div>}
                    <main
                        className="col col--12"
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
