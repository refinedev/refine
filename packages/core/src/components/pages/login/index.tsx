import React, { useContext } from "react";
import {
    Row,
    Col,
    Layout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    Checkbox,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";

import { useNavigation, useNotification } from "@hooks";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

const { Title, Text } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const { push } = useNavigation();
    const notification = useNotification();

    const { login } = useContext<IAuthContext>(AuthContext);

    const onSubmit = (values: ILoginForm) => {
        login(values)
            .then(() => push("/"))
            .catch(() => {
                notification.error({
                    message: "Login Error",
                    description: "Invalid username or password",
                });
            });
    };

    const CardTitle = (
        <Title level={2} style={{ textAlign: "center" }}>
            Refine
        </Title>
    );

    return (
        <Layout className="login-background">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <Card className="login-card" title={CardTitle}>
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
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "#00000040" }}
                                        />
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Username"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="password"
                                    prefix={
                                        <LockOutlined
                                            style={{ color: "#00000040" }}
                                        />
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a style={{ float: "right" }} href="">
                                    Forgot password?
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="signup-section">
                            <Text>
                                Still no account? Please go to{" "}
                                <a href="">Sign up</a>
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
