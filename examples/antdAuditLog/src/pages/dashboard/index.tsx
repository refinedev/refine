import React from "react";
import {
    AntdLayout,
    Button,
    Col,
    Form,
    Input,
    Row,
    Typography,
} from "@pankod/refine-antd";

import refineSDK from "utils/refine-sdk";
import { useLogList } from "@pankod/refine-core";

const { Title } = Typography;

export const DashboardPage: React.FC = () => {
    const { data } = useLogList({
        resource: "auth",
        action: "login",
        meta: {
            username: "yildirayunlu",
        },
        // author: {
        //     email: "test@mail.com",
        // },
    });

    const send = async (values: any) => {
        const { name, username, email } = values;
        return await refineSDK.log.create({
            resource: "auth",
            action: "login",
            data: {
                name,
                username,
                email,
            },
            meta: {
                username,
            },
        });
    };

    return (
        <AntdLayout className="layout">
            <Title level={3} className="title">
                Dashboard
            </Title>

            <Row gutter={[16, 16]}>
                <Col span="12">
                    <Form onFinish={send} layout="vertical">
                        <Form.Item label="Name" name="name">
                            <Input placeholder="John Doe" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="john@mail.com" />
                        </Form.Item>
                        <Form.Item label="Username" name="username">
                            <Input placeholder="john-doe" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Send Log
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span="12">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </Col>
            </Row>
        </AntdLayout>
    );
};
