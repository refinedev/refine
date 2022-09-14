import React from "react";
import Layout from "@theme/Layout";
import LazyLoad from "react-lazyload";
import Head from "@docusaurus/Head";

import { Landing } from "../components/landing";

function Home() {
    React.useEffect(() => {
        const listener = function () {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        };

        window.addEventListener("locationchange", listener);

        return () => {
            window.removeEventListener("locationchange", listener);
        };
    }, []);

    return (
        <>
            <Head>
                <html data-page="index" data-customized="true" />
            </Head>
            <Layout
                title={`refine | A React-based framework for building internal tools, rapidly!`}
                description="Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
            >
                <Landing />
            </Layout>
        </>
    );
}

export default Home;
