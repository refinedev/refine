import React from "react";
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
import {
    loginCard,
    signupSection,
    loginHeader,
    loginBackground,
} from "./styles";

import logo from "./refine.svg";

import { useLogin, useTranslate } from "@hooks";

const { Text } = Typography;
export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const translate = useTranslate();

    const { mutate: login } = useLogin();

    const onSubmit = (values: ILoginForm) => {
        login(values);
    };

    const CardTitle = (
        <div style={loginHeader}>
            <img src={logo} alt="Logo" />
        </div>
    );

    return (
        <Layout style={loginBackground}>
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <Card style={loginCard} title={CardTitle}>
                        <Form
                            className="ant-form-vertical"
                            form={form}
                            name="control-hooks"
                            onFinish={onSubmit}
                            requiredMark={false}
                        >
                            <Form.Item
                                name="username"
                                label={translate(
                                    "pages.login.username",
                                    "Username",
                                )}
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
                                label={translate(
                                    "pages.login.password",
                                    "Password",
                                )}
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
                                    <Checkbox>
                                        {translate(
                                            "pages.login.remember",
                                            "Remember me",
                                        )}
                                    </Checkbox>
                                </Form.Item>

                                <a style={{ float: "right" }} href="">
                                    {translate(
                                        "pages.login.forgotPassword",
                                        "Forgot password?",
                                    )}
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    {translate("pages.login.login", "Login")}
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={signupSection}>
                            <Text>
                                {translate(
                                    "pages.login.noAccount",
                                    "Still no account? Please go to",
                                )}{" "}
                                <a href="">
                                    {translate("pages.login.signup", "Sign up")}
                                </a>
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
