import React from "react";

import { Layout, Space, theme } from "antd";

import { AlgoliaSearch } from "./algolia-search";
import { CurrentUser } from "./current-user";
import { Notifications } from "./notifications";

const { useToken } = theme;

export const Header: React.FC = () => {
    const { token } = useToken();

    const headerStyles: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 999,
    };

    return (
        <Layout.Header style={headerStyles}>
            <AlgoliaSearch />
            <Space align="center" size="middle">
                <Notifications />
                <CurrentUser />
            </Space>
        </Layout.Header>
    );
};
