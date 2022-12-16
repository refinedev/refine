import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";

import { USE_CASES } from "../../assets/use-cases";

export const UseCases = () => {
    return (
        <Layout>
            <Head title="Use Cases | refine">
                <html data-page="use-cases" data-customized="true" />
            </Head>
            <div className="container max-w-[1040px]">
                <h1 className="font-montserrat text-[#1890FF] text-center my-8">
                    YOUR WORK{" "}
                    <span className="font-normal">OUR INSPIRATION</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {USE_CASES.map((useCase) => (
                        <div key={useCase.route} className="flex flex-col">
                            <img
                                src={useCase.thumbImgURL}
                                alt={useCase.title}
                            />
                            <div>{useCase.title}</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: useCase.description,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default UseCases;
