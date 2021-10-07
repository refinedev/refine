import { Card, Button, Row, Col, Typography } from "@pankod/refine";

import { Header, Footer } from "@components";

const { Title } = Typography;

export const HomePage = () => {
    return (
        <Row>
            <Col span={24}>
                <Title>Delight in every bite!</Title>
            </Col>
            <Col span={24}></Col>
        </Row>
    );
};
