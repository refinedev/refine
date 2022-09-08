import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import { SHOW_CASES, EXAMPLES } from "../../assets/examples";
import { ExampleCard, ShowCaseCard } from "../../components/examples";
import { ChevronRight } from "../../components/blog/icons";

const Examples: React.FC = () => {
    return (
        <Layout>
            <div className="container">
                <h1 className="font-montserrat my-10 text-center text-5xl font-medium uppercase text-[#1890FF]">
                    Awesome Things <br />{" "}
                    <span className="font-extrabold">
                        You Can Build With Refine.
                    </span>
                </h1>
                <p className="font-montserrat text-center text-2xl font-medium uppercase">
                    A collection of reference applications you can use as a{" "}
                    <br />
                    starting point for your next project.
                </p>
                <br />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {SHOW_CASES.map((showCase, index) => (
                        <ShowCaseCard key={index} showCase={showCase} />
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
                        to="/docs/examples/tutorial/headless-tutorial"
                        className="flex items-center font-bold uppercase text-inherit"
                    >
                        See All Examples
                        <ChevronRight />
                    </Link>
                </div>
                <br />
            </div>
        </Layout>
    );
};

export default Examples;
