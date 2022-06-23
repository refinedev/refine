import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SplitPane from "react-split-pane";
import clsx from "clsx";

import { IoMdOpen, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const iframeURLS = {
    antd: "https://example.admin.refine.dev",
    mui: "https://example.mui.admin.refine.dev",
};

const Hello = () => {
    const [clientActiveKeyPane, setClientActiveKeyPane] = useState("headless");
    const [adminActiveKeyPane, setAdminActiveKeyPane] = useState("antd");

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
                                onClick={() =>
                                    setClientActiveKeyPane("headless")
                                }
                                className={clsx(
                                    "tab-button",
                                    clientActiveKeyPane === "headless" &&
                                        "active",
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
                                onClick={() => setAdminActiveKeyPane("antd")}
                                className={clsx(
                                    "tab-button",
                                    adminActiveKeyPane === "antd" && "active",
                                )}
                            >
                                Ant Design
                                <Link to="https://example.admin.refine.dev">
                                    <IoMdOpen />
                                </Link>
                            </button>
                            <button
                                onClick={() => setAdminActiveKeyPane("mui")}
                                className={clsx(
                                    "tab-button",
                                    adminActiveKeyPane === "mui" && "active",
                                )}
                            >
                                Material UI
                                <Link to="https://example.mui.admin.refine.dev">
                                    <IoMdOpen />
                                </Link>
                            </button>
                        </div>
                        <iframe
                            src={iframeURLS[adminActiveKeyPane]}
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                </SplitPane>
            </div>
            <div className="mobile-view">
                <div className="mobile-pane client-pane">
                    <h2>Customer Facing App</h2>
                    <p>
                        <strong>Refine Headless &gt;</strong>
                        <br />
                        Refine Core + Next.js (SSR) + Tailwind CSS
                    </p>
                    <Link to="https://example.refine.dev">
                        <img src="/demo/nextjs-client.png" />
                    </Link>
                </div>
                <div className="mobile-pane admin-pane">
                    <h2>Admin Panel</h2>
                    <p>Refine Core + Ant Design</p>
                    <div className="mobile-img-container">
                        <Link to={iframeURLS["antd"]}>
                            <img src="/demo/mobile-antd.png" />
                        </Link>
                        <Link to={iframeURLS["mui"]}>
                            <img src="/demo/mobile-mui.png" />
                        </Link>
                    </div>
                    <p style={{ marginTop: "16px" }}>
                        Refine Core + Material UI
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Hello;
