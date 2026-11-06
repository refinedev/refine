import React from "react";
import { Layout, Space, Typography, Avatar } from "antd";
import { GithubOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const CustomHeader: React.FC = () => {
  return (
    <Layout.Header
      style={{
        backgroundColor: "#ffffff",
        height: 52,
        lineHeight: "normal",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        borderBottom: "1px solid #f1f5f9",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Space size="middle" align="center">
        <a
          href="https://github.com/refinedev/refine"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#64748b",
            fontSize: 16,
            display: "inline-flex",
            alignItems: "center",
            padding: "6px",
            borderRadius: "6px",
            transition: "all 150ms ease",
          }}
          title="GitHub Repository"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0f172a";
            e.currentTarget.style.backgroundColor = "#f8fafc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#64748b";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <GithubOutlined />
        </a>

        <div
          style={{
            width: "1px",
            height: "16px",
            backgroundColor: "#e2e8f0",
          }}
        />

        <Space size="small" align="center" style={{ cursor: "default" }}>
          <Avatar
            size={28}
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 600,
            }}
            icon={<UserOutlined />}
          />
          <Text style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>
            Editor
          </Text>
        </Space>
      </Space>
    </Layout.Header>
  );
};
