import React from "react";
import { RefineResetPasswordPageProps } from "@pankod/refine-ui-types";
import { Row, Col, Layout, Card, Typography, Form, Input, Button } from "antd";
import {
    useTranslate,
    useRouterContext,
    useResetPassword,
} from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "./styles";

const { Title } = Typography;
interface IResestPasswordForm {
    email: string;
}

export const ResetPasswordPage: React.FC<RefineResetPasswordPageProps> = ({
    submitButton,
    loginLink,
}) => {
    const [form] = Form.useForm<IResestPasswordForm>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: resetPassword, isLoading } =
        useResetPassword<IResestPasswordForm>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.resetPassword.title", "Forgot your password?")}
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
                            <Form<IResestPasswordForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    resetPassword(values);
                                }}
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="email"
                                    label={translate(
                                        "pages.resetPassword.email",
                                        "Email",
                                    )}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="large"
                                        placeholder={translate(
                                            "pages.resetPassword.email",
                                            "Email",
                                        )}
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
                                            "pages.resetPassword.submit",
                                            "Send reset link",
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
