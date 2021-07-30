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

/**
 * **refine** shows a default ready page on root route when no `<Resource>` is passed to the `<Refine>` component as a child.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#readypage} for more details.
 */
export const ReadyPage: React.FC = () => {
    return (
        <Row align="middle" justify="center" style={styles.root}>
            <Col style={{ textAlign: "center" }}>
                <Title>refine</Title>
                <Title level={2}>Welcome to refine</Title>
                <p style={{ marginBottom: 0 }}>
                    Your application is properly configured.
                </p>
                <p>
                    Now you can add a &lt;Resource&gt; as child of
                    &lt;Refine&gt;.
                </p>
            </Col>
        </Row>
    );
};
