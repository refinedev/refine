import React from "react";
import { RefineUpdatePasswordPageProps } from "@pankod/refine-ui-types";
import { Row, Col, Layout, Card, Typography, Form, Input, Button } from "antd";
import { useTranslate, useUpdatePassword } from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

const { Title } = Typography;
interface IUpdatePasswordForm {
    password?: string;
    confirmPassword?: string;
}

export const UpdatePasswordPage: React.FC<RefineUpdatePasswordPageProps> = ({
    submitButton,
}) => {
    const [form] = Form.useForm<IUpdatePasswordForm>();
    const translate = useTranslate();
    const { mutate: register, isLoading } =
        useUpdatePassword<IUpdatePasswordForm>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.updatePassword.title", "Set New Password")}
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
                            <Form<IUpdatePasswordForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    register(values);
                                }}
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="password"
                                    label={translate(
                                        "pages.updatePassword.fields.password",
                                        "New Password",
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
                                        "pages.updatePassword.fields.confirmPassword",
                                        "Confirm New Password",
                                    )}
                                    hasFeedback
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
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
                                                            "pages.updatePassword.errors.confirmPasswordNotMatch",
                                                            "The two passwords that you entered do not match",
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

                                {submitButton ?? (
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        loading={isLoading}
                                        block
                                    >
                                        {translate(
                                            "pages.updatePassword.buttons.submit",
                                            "Change Password",
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
