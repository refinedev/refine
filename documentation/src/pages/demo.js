import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SplitPane from "react-split-pane";
import clsx from "clsx";

import { IoMdOpen, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const iframeURLS = {
    antd: "https://example.admin.refine.dev",
    mui: "https://example.admin.refine.dev",
};

const Hello = () => {
    const [clientActiveKeyPane, setClientActiveKeyPane] = useState("headless");
    const [activeKeyPane2, setActiveKeyPane2] = useState("antd");

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
                        <div className="toggle toggle-left">
                            <IoIosArrowBack />
                        </div>
                        <div className="pane-header pane-header-left">
                            <h2>Customer Facing App</h2>
                            <p>
                                Refine Headless &gt; Refine Core + Next.js (SSR)
                                + Tailwind CSS
                            </p>
                        </div>
                        <div className="tabs">
                            <button
                                onClick={() => setActiveKeyPane1("headless")}
                                className={clsx(
                                    "tab-button",
                                    activeKeyPane1 === "headless" && "active",
                                )}
                            >
                                Headless
                                <Link to="https://example.refine.dev">
                                    <IoMdOpen />
                                </Link>
                            </button>
                        </div>
                        <iframe
                            src="https://example.refine.dev"
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                    <div className="pane">
                        <div className="toggle toggle-right">
                            <IoIosArrowForward />
                        </div>
                        <div className="pane-header pane-header-right">
                            <h2>Admin Panel</h2>
                            <p>Refine Core + Ant Design / Material UI</p>
                        </div>
                        <div className="tabs">
                            <button
                                onClick={() => setActiveKeyPane2("antd")}
                                className={clsx(
                                    "tab-button",
                                    activeKeyPane2 === "antd" && "active",
                                )}
                            >
                                Ant Design
                                <Link to="https://example.admin.refine.dev">
                                    <IoMdOpen />
                                </Link>
                            </button>
                            <button
                                onClick={() => setActiveKeyPane2("mui")}
                                className={clsx(
                                    "tab-button",
                                    activeKeyPane2 === "mui" && "active",
                                )}
                            >
                                Material UI
                                <Link to="https://example.admin.refine.dev">
                                    <IoMdOpen />
                                </Link>
                            </button>
                        </div>
                        <iframe
                            src={iframeURLS[activeKeyPane2]}
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
