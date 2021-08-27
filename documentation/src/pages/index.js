import React from "react";
import Layout from "@theme/Layout";

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
            title={`refine | A React-based framework for building data-intensive applications in no time!`}
            description="Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
        >
            <main>
                <Hero />
                <FastAndFlexible />
                <Comments />
                <KeyFeatures />
                <PerfectImplementation />
                <GetStarted />
            </main>
        </Layout>
    );
}

export default Home;
