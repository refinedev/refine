import * as React from "react";
import { Row, Col, Typography } from "antd";

const styles: { [key: string]: React.CSSProperties } = {
    root: {
        height: "100vh",
        background:
            "linear-gradient(135deg, #D5D5A4 0%, #C6C6AD 50%, #D0D0CD 100%)",
        color: "#565656",
    },
};

const { Title } = Typography;

export const ReadyPage: React.FC = () => {
    return (
        <Row align="middle" justify="center" style={styles.root}>
            <Col style={{ textAlign: "center" }}>
                <Title>readmin</Title>
                <Title level={2}>Welcome to readmin</Title>
                <div>
                    Your application is properly configured.
                    <br />
                    Now you can add a &lt;Resource&gt; as child of
                    &lt;Admin&gt;.
                </div>
            </Col>
        </Row>
    );
};
