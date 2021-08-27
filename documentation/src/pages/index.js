import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import {
    Hero,
    FastAndFlexible,
    Comments,
    KeyFeatures,
    PerfectImplementation,
    GetStarted,
} from "../components";

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
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
