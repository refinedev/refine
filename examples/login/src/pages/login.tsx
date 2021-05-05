import React from "react";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
} from "@pankod/refine";

import { useLogin } from "@pankod/refine";

export interface ILoginForm {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const { Title } = Typography;

    const [form] = Form.useForm();
    const login = useLogin();

    const onSubmit = (values: ILoginForm) => {
        login(values);
    };

    return (
        <AntdLayout>
            <Row
                justify="center"
                style={{
                    display: "flex",
                    alignContent: "center",
                    height: "100vh",
                }}
            >
                <Col xl={6} lg={8} md={12} sm={18} xs={22}>
                    <Card>
                        <Title level={2} style={{ textAlign: "center" }}>
                            Login
                        </Title>
                        <Form
                            className="ant-form-vertical"
                            form={form}
                            name="control-hooks"
                            onFinish={onSubmit}
                        >
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true }]}
                            >
                                <Input type="password" />
                            </Form.Item>

                            <Button
                                type="primary"
                                size="middle"
                                shape="round"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
