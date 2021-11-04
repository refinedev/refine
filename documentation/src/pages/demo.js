import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SplitPane from "react-split-pane";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
                            to="https://alpha.client.example.refine.dev"
                        >
                            Public facing app (client)
                            <IoIosArrowForward />
                        </Link>
                        <div className="toggle toggle-left">
                            <IoIosArrowBack />
                        </div>
                        <iframe
                            src="https://alpha.client.example.refine.dev"
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                    <div className="pane">
                        <Link
                            className="link-button"
                            to="https://alpha.example.refine.dev"
                        >
                            Admin panel
                            <IoIosArrowForward />
                        </Link>
                        <div className="toggle toggle-right">
                            <IoIosArrowForward />
                        </div>
                        <iframe
                            src="https://alpha.example.refine.dev"
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
                        to="https://alpha.client.example.refine.dev"
                    >
                        Public facing app (client)
                        <IoIosArrowForward />
                    </Link>
                    <img src="/demo/nextjs-client.png" />
                </div>
                <div className="mobile-pane admin-pane">
                    <Link
                        className="link-button"
                        to="https://alpha.example.refine.dev"
                    >
                        Admin panel
                        <IoIosArrowForward />
                    </Link>
                    <img src="/demo/react-admin.png" />
                </div>
            </div>
        </Layout>
    );
};

export default Hello;
