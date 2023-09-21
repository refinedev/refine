import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";

import { Space, theme, Typography } from "antd";

import { Logo } from "./logo";

const { useToken } = theme;

const name = "Globex Corporation";

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
    collapsed,
    wrapperStyles,
}) => {
    const { token } = useToken();
    const Link = useLink();

    return (
        <Link
            to="/login"
            style={{
                display: "inline-block",
                textDecoration: "none",
            }}
        >
            <Space
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "inherit",
                    ...wrapperStyles,
                }}
            >
                <div
                    style={{
                        height: "24px",
                        width: "24px",
                        color: token.colorPrimary,
                    }}
                >
                    <Logo />
                </div>

                {!collapsed && (
                    <Typography.Title
                        style={{
                            fontSize: "inherit",
                            marginBottom: 0,
                            fontWeight: 700,
                        }}
                    >
                        {name}
                    </Typography.Title>
                )}
            </Space>
        </Link>
    );
};
