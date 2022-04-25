import React from "react";
import { useLogin } from "@pankod/refine-core";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
} from "@pankod/refine-antd";

import { ILoginDto } from "interfaces";

const { Title } = Typography;

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const { mutate: login } = useLogin<ILoginDto>();

    const CardTitle = (
        <Title level={3} className="title">
            Login
        </Title>
    );

    return (
        <AntdLayout className="layout">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div className="container">
                        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={async ({ email, password }) =>
                                    login({
                                        email,
                                        password,
                                    })
                                }
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, type: "email" }]}
                                >
                                    <Input size="large" placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        size="large"
                                    />
                                </Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    Sign in
                                </Button>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};
