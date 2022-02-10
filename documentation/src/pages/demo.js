import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SplitPane from "react-split-pane";

import { IoMdOpen, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Hello = () => {
    return (
        <Layout title="One framework for all">
            <div className="desktop-view">
                <div className="main-title-container">
                    <h1>
                        One framework <br /> for all
                    </h1>
                </div>
                <SplitPane
                    defaultSize="50%"
                    minSize={375}
                    maxSize={-375}
                    split="vertical"
                    style={{ height: "auto" }}
                >
                    <div className="pane">
                        <Link
                            className="link-button"
                            to="https://example.refine.dev"
                        >
                            Refine Headless <br />
                            Refine Core + Next.js (SSR) + Tailwind CSS
                            <IoMdOpen />
                        </Link>
                        <div className="toggle toggle-left">
                            <IoIosArrowBack />
                        </div>
                        <iframe
                            src="https://example.refine.dev"
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                    <div className="pane">
                        <Link
                            className="link-button"
                            to="https://example.admin.refine.dev"
                        >
                            Refine Antd
                            <br />
                            Refine Core + Refine Ant Design
                            <IoMdOpen />
                        </Link>
                        <div className="toggle toggle-right">
                            <IoIosArrowForward />
                        </div>
                        <iframe
                            src="https://example.admin.refine.dev"
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                </SplitPane>
            </div>
            <div className="mobile-view">
                <div className="mobile-pane client-pane">
                    <Link
                        className="link-button"
                        to="https://example.refine.dev"
                    >
                        Refine Headless <br />
                        Refine Core + Next.js (SSR) + Tailwind CSS
                        <IoMdOpen />
                    </Link>
                    <img src="/demo/nextjs-client.png" />
                </div>
                <div className="mobile-pane admin-pane">
                    <Link
                        className="link-button"
                        to="https://example.admin.refine.dev"
                    >
                        Refine Antd
                        <br />
                        Refine Core + Refine Ant Design
                        <IoMdOpen />
                    </Link>
                    <img src="/demo/react-admin.png" />
                </div>
            </div>
        </Layout>
    );
};

export default Hello;
