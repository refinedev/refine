import React from "react";
import { useLogin } from "@refinedev/core";
import { GoogleOutlined } from "@ant-design/icons";

import {
    Row,
    Col,
    Layout as AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    Checkbox,
    Space,
    Divider,
} from "antd";

import { useAuthConfig } from "@refinedev/connect";

const { Text, Title } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const Login: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();
    const authConfig = useAuthConfig();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={3} className="title">
            Sign in your account
        </Title>
    );

    const renderSocialLogin = () => {
        if (authConfig.isFetched) {
            const providers = authConfig.data?.filter(
                (item) => item.type !== "database",
            );

            // TODO: map social icon to provider type
            return (
                <Space direction="vertical" style={{ width: "100%" }}>
                    {providers?.map((provider) => (
                        <Button
                            key={provider.type}
                            type="primary"
                            size="large"
                            block
                            icon={<GoogleOutlined />}
                            href={provider.url}
                        >{`Sign in with ${provider.name}`}</Button>
                    ))}
                </Space>
            );
        }
    };

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
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    login(values);
                                }}
                                requiredMark={false}
                                initialValues={{
                                    remember: false,
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Email"
                                        type="email"
                                    />
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
                                    block
                                >
                                    Sign in
                                </Button>
                            </Form>

                            <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                                split={<Divider plain type="horizontal" />}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <Text style={{ fontSize: 12 }}>
                                        Don’t have an account?{" "}
                                        <a
                                            onClick={() => {
                                                console.log("sign up");
                                            }}
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Sign up
                                        </a>
                                    </Text>
                                </div>

                                {renderSocialLogin()}
                            </Space>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};
