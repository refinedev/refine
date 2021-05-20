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
    Checkbox,
    Icons,
} from "@pankod/refine";
import "./styles.css";

import { useLogin } from "@pankod/refine";

const { UserOutlined, LockOutlined } = Icons;
const { Text } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const login = useLogin();

    const onSubmit = async (values: ILoginForm) => {
        console.log(values);
        login(values).catch(() => false);
    };

    const CardTitle = (
        <div className="login-header">
            <img src="refine.svg" alt="Logo" />
        </div>
    );

    return (
        <AntdLayout className="login-background">
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
                            requiredMark={false}
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
                                label="Password"
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
                                    initialValue={true}
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
        </AntdLayout>
    );
};
