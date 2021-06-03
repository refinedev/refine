import { Row, Col, Card, Space } from "@pankod/refine";

export const DashbaordPage: React.FC = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col md={16}>
                <Card title="Delivery Map">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem odit minus itaque nostrum molestias, totam
                    voluptates quis quae officiis veritatis dolorum maiores
                    alias id excepturi dolores. Numquam nisi voluptatem
                    eligendi.
                </Card>
            </Col>
            <Col md={8} xs={24}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Card>
                        <p>Total Order: 256</p>
                        <p>Total Delivery: 253</p>
                    </Card>
                    <Card>
                        <p>Daily Revune</p>
                    </Card>
                    <Card>...</Card>
                </Space>
            </Col>
        </Row>
    );
};
