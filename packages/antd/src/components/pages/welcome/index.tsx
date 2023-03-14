import * as React from "react";
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

const { Title } = Typography;

/**
 * It is a page that welcomes you after the configuration is completed.
 */
export const WelcomePage: React.FC = () => {
    return (
        <Row align="middle" justify="center" style={styles.root}>
            <Col style={{ textAlign: "center" }}>
                <img
                    style={{ marginBottom: "48px" }}
                    src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
                    alt="Refine Logo"
                />
                <Title style={styles.title}>Welcome on board</Title>
                <p style={styles.p1}>Your configuration is completed.</p>
                <Space
                    size="large"
                    wrap
                    style={{ marginTop: "70px", justifyContent: "center" }}
                >
                    <a
                        href="https://refine.dev"
                        target="_blank"
                        rel="noreferrer"
                    >
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
                    <a
                        href="https://discord.gg/refine"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button size="large" icon={<TeamOutlined />}>
                            Community
                        </Button>
                    </a>
                </Space>
            </Col>
        </Row>
    );
};
