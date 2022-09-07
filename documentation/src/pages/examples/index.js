import React from "react";
import Layout from "@theme/Layout";

const Examples = () => {
    return (
        <Layout
            title="Examples"
            description="Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
        >
            <div className="container">
                <h1 className="font-montserrat uppercase text-center text-5xl font-medium text-[#1890FF] my-10">
                    Awesome Things <br />{" "}
                    <span className="font-extrabold">
                        You Can Build With Refine.
                    </span>
                </h1>
                <p className="font-montserrat uppercase text-center font-medium text-2xl">
                    A collection of reference applications you can use as a{" "}
                    <br />
                    starting point for your next project.
                </p>
            </div>
        </Layout>
    );
};

export default Examples;
