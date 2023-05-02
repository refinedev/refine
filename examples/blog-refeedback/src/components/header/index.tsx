import React from "react";
import { Layout } from "antd";

export const Header: React.FC = () => {
    return (
        <Layout.Header
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "64px",
                backgroundColor: "#FFF",
                borderBottom: "1px solid #f0f0f0",
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}
        >
            <img
                src="./refeedback.png"
                alt="refeedback"
                style={{ width: "250px" }}
            />
        </Layout.Header>
    );
};
