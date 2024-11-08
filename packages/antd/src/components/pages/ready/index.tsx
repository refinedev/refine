import * as React from "react";
import type { RefineReadyPageProps } from "@refinedev/ui-types";
import { Row, Col, Typography, Space, Button } from "antd";
import { ReadOutlined, FolderOutlined, TeamOutlined } from "@ant-design/icons";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    height: "100vh",
    backgroundImage:
      "url('https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png')",
    backgroundSize: "cover",
    backgroundColor: "#331049",
  },
  title: {
    color: "white",
    fontWeight: 800,
    fontSize: "64px",
    marginBottom: "8px",
  },
  p1: {
    color: "white",
    marginBottom: 0,
    fontSize: "20px",
    fontWeight: "bold",
  },
  p2: {
    color: "white",
    fontSize: "20px",
  },
  code: {
    backgroundColor: "white",
    color: "#331049",
  },
};

/**
 * **refine** shows a default ready page on root route when no `resources` is passed to the `<Refine>` component as a property.
 *
 * @deprecated `ReadyPage` is deprecated and will be removed in the next major release.
 */
export const ReadyPage: React.FC<RefineReadyPageProps> = () => {
  return (
    <Row align="middle" justify="center" style={styles.root}>
      <Col style={{ textAlign: "center" }}>
        <img
          style={{ marginBottom: "48px" }}
          src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
          alt="Refine Logo"
        />
        <Typography.Title style={styles.title}>
          Welcome on board
        </Typography.Title>
        <p style={styles.p1}>Your configuration is completed.</p>
        <p style={styles.p2}>
          Now you can get started by adding your resources to the{" "}
          <code style={styles.code}>{"resources"}</code> property of{" "}
          <code style={styles.code}>{"<Refine>"}</code>
        </p>
        <Space
          size="large"
          wrap
          style={{ marginTop: "70px", justifyContent: "center" }}
        >
          <a href="https://refine.dev" target="_blank" rel="noreferrer">
            <Button size="large" icon={<ReadOutlined />}>
              Documentation
            </Button>
          </a>
          <a
            href="https://refine.dev/examples"
            target="_blank"
            rel="noreferrer"
          >
            <Button size="large" icon={<FolderOutlined />}>
              Examples
            </Button>
          </a>
          <a href="https://discord.gg/refine" target="_blank" rel="noreferrer">
            <Button size="large" icon={<TeamOutlined />}>
              Community
            </Button>
          </a>
        </Space>
      </Col>
    </Row>
  );
};
