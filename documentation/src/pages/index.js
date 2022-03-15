import React from "react";
import Layout from "@theme/Layout";
import LazyLoad from "react-lazyload";

import {
    Hero,
    FastAndFlexible,
    Comments,
    KeyFeatures,
    PerfectImplementation,
    GetStarted,
} from "../components";

function Home() {
    return (
        <Layout
            title={`refine | A React-based framework for building internal tools, rapidly!`}
            description="Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
        >
            <main>
                <Hero />
                <KeyFeatures />
                <FastAndFlexible />
                {/* <Comments /> */}
                <LazyLoad once offset={200}>
                    <PerfectImplementation />
                </LazyLoad>
                <GetStarted />
            </main>
        </Layout>
    );
}

export default Home;
