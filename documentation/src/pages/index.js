import React from "react";
import Layout from "@theme/Layout";
import LazyLoad from "react-lazyload";
import Head from "@docusaurus/Head";

import { Landing } from "../components/landing";

function Home() {
    React.useEffect(() => {
        return () => {
            // scroll to top after unmount with set timeout
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        };
    }, []);

    return (
        <>
            <Head>
                <html data-page="index" data-customized="true" />
            </Head>
            <Layout
                title={`refine | Build your React-based CRUD applications, without constraints!`}
                description="Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
            >
                <Landing />
            </Layout>
        </>
    );
}

export default Home;
