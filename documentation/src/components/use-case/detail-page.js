import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

const UseCaseDetail = (props) => {
    const { data } = props;

    return (
        <Layout>
            <Head title={`${data.title} | refine`}>
                <html data-page="use-cases-detail" data-customized="true" />
            </Head>
            <div className="container max-w-[1040px]">
                <h1>Use Case Detail</h1>
                <pre>{JSON.stringify(props, null, 2)}</pre>
            </div>
        </Layout>
    );
};

export default UseCaseDetail;
