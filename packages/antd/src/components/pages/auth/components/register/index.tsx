import React from "react";
import { RefineRegisterPageProps } from "@pankod/refine-ui-types";
import { Row, Col, Layout, Card, Typography, Form, Input, Button } from "antd";
import {
    useTranslate,
    useRouterContext,
    useRegister,
} from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "./styles";

const { Title } = Typography;
interface IRegisterForm {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const RegisterPage: React.FC<RefineRegisterPageProps> = ({
    submitButton,
    loginLink,
}) => {
    const [form] = Form.useForm<IRegisterForm>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: register, isLoading } = useRegister<IRegisterForm>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.register.title", "Sign up your account")}
        </Title>
    );

    return (
        <Layout style={layoutStyles}>
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div style={containerStyles}>
                        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form<IRegisterForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    register(values);
                                }}
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="email"
                                    label={translate(
                                        "pages.register.email",
                                        "Email",
                                    )}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="large"
                                        placeholder={translate(
                                            "pages.register.email",
                                            "Email",
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label={translate(
                                        "pages.register.password",
                                        "Password",
                                    )}
                                    rules={[{ required: true }]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        size="large"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    label={translate(
                                        "pages.register.confirmPassword",
                                        "Confirm Password",
                                    )}
                                    hasFeedback
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message: translate(
                                                "pages.register.confirmPasswordRequired",
                                                "Please confirm your password!",
                                            ),
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "password",
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        translate(
                                                            "pages.register.confirmPasswordNotMatch",
                                                            "The two passwords that you entered do not match!",
                                                        ),
                                                    ),
                                                );
                                            },
                                        }),
                                    ]}
                                    style={{ marginBottom: "12px" }}
                                >
                                    <Input
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        size="large"
                                    />
                                </Form.Item>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "12px",
                                    }}
                                >
                                    {loginLink ?? (
                                        <Link
                                            style={{
                                                fontSize: "12px",
                                                marginLeft: "auto",
                                            }}
                                            to="/login"
                                        >
                                            {translate(
                                                "pages.register.signup",
                                                "Have an account? Login",
                                            )}
                                        </Link>
                                    )}
                                </div>

                                {submitButton ?? (
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        loading={isLoading}
                                        block
                                    >
                                        {translate(
                                            "pages.register.signin",
                                            "Sign in",
                                        )}
                                    </Button>
                                )}
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};
