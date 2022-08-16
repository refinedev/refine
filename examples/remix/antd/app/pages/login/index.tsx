import React from "react";
import { ActionFunction } from "@remix-run/node";
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
    Checkbox,
} from "@pankod/refine-antd";

import { createUserSession, login } from "~/session.server";

const { Text, Title } = Typography;

interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const Login: React.FC = () => {
    const CardTitle = (
        <Title level={3} className="title">
            Sign in your account
        </Title>
    );

    const [form] = Form.useForm();

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
                        <div className="imageContainer">
                            <img src="./refine.svg" alt="Refine Logo" />
                        </div>
                        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form<ILoginForm>
                                component="form"
                                layout="vertical"
                                id="loginForm"
                                form={form}
                                method="post"
                                requiredMark={false}
                                initialValues={{
                                    remember: false,
                                }}
                            >
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        name="username"
                                        size="large"
                                        placeholder="Username"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        size="large"
                                    />
                                </Form.Item>
                                <div style={{ marginBottom: "12px" }}>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                        noStyle
                                    >
                                        <Checkbox
                                            style={{
                                                fontSize: "12px",
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                    </Form.Item>

                                    <a
                                        style={{
                                            float: "right",
                                            fontSize: "12px",
                                        }}
                                        href="#"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    onClick={() => {
                                        form.validateFields().then(() => {
                                            (
                                                document.getElementById(
                                                    "loginForm",
                                                ) as HTMLFormElement
                                            ).submit();
                                        });
                                    }}
                                    block
                                >
                                    Sign in
                                </Button>
                            </Form>
                            <div style={{ marginTop: 8 }}>
                                <Text style={{ fontSize: 12 }}>
                                    Don’t have an account?{" "}
                                    <a href="#" style={{ fontWeight: "bold" }}>
                                        Sign up
                                    </a>
                                </Text>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    const redirectTo = form.get("redirectTo") || "/";
    const user = await login({ username, password });
    if (!user) {
        return null;
    }

    return createUserSession(user as any, redirectTo as string);
};
