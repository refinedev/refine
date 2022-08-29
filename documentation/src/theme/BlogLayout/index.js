import React from "react";
import Layout from "@theme/Layout";

export default function BlogLayout(props) {
    const { children, ...layoutProps } = props;

    return (
        <Layout {...layoutProps}>
            <div className="container margin-vert--lg">
                <div className="row">
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
