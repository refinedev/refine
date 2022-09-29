import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";

import { SHOW_CASES, EXAMPLES } from "../../assets/examples";
import { ExampleCard } from "../../components/examples";
import { ChevronRight } from "../../components/blog/icons";

const Examples: React.FC = () => {
    return (
        <Layout>
            <Head title="Examples | refine">
                <html data-page="examples" data-customized="true" />
            </Head>
            <div className="container max-w-[1040px]">
                <span
                    className="fixed -left-10 bottom-[20vh] z-10 "
                    id="leftReward"
                />
                <span
                    className="fixed -right-10 bottom-[20vh] z-10 "
                    id="rightReward"
                />
                <h1 className="font-montserrat my-10 text-center text-[42px] font-medium uppercase text-[#1890FF]">
                    Awesome Things <br />{" "}
                    <span className="font-extrabold">
                        You Can Build With Refine.
                    </span>
                </h1>
                <p className="font-montserrat text-center text-[20px] font-medium uppercase text-[#2A2A42]">
                    A collection of reference applications you can use as a{" "}
                    <br />
                    starting point for your next project.
                </p>
                <br />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {SHOW_CASES.map((showCase, index) => (
                        <ExampleCard key={index} example={showCase} />
                    ))}
                </div>
                <br />
                <br />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {EXAMPLES.map((example, index) => (
                        <ExampleCard key={index} example={example} />
                    ))}
                </div>
                <br />
                <div className="flex justify-end">
                    <Link
                        to="/docs/examples/"
                        className="flex items-center text-xl font-bold uppercase text-[#2A2A42]"
                        target="_blank"
                    >
                        See All Examples
                        <ChevronRight className="h-8 w-8" />
                    </Link>
                </div>
                <br />
            </div>
        </Layout>
    );
};

export default Examples;
