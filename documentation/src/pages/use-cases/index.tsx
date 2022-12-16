import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";

import { GiftCard } from "../../components/use-case/gift-card";
import USE_CASES from "../../assets/use-cases";

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
                        <div
                            key={useCase.route}
                            className="flex flex-col justify-between"
                        >
                            <div>
                                <Link to={`/use-cases/${useCase.route}`}>
                                    <img
                                        src={useCase.thumbImgURL}
                                        alt={useCase.title}
                                    />
                                </Link>
                                <div className="font-montserrat font-bold text-[#242436] my-2">
                                    {useCase.title}
                                </div>
                                <div
                                    className="font-montserrat text-[#242436] text-sm"
                                    dangerouslySetInnerHTML={{
                                        __html: useCase.description,
                                    }}
                                />
                            </div>

                            <Link
                                className="shadow-startTiles appearance-none flex items-center justify-center mt-2 mb-4 no-underline font-bold font-montserrat text-sm h-8 w-44 text-[#1890FF] text-center bg-white rounded-[4px] cursor-pointer border border-solid border-[#EDEDEF]"
                                to={`/use-cases/${useCase.route}`}
                            >
                                Read more
                            </Link>
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <GiftCard />
                <br />
                <br />
            </div>
        </Layout>
    );
};

export default UseCases;
