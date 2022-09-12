import React from "react";
import {
    RefineUpdatePasswordPageProps,
    RefineUpdatePasswordFormTypes,
} from "@pankod/refine-ui-types";
import {
    Row,
    Col,
    Layout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    LayoutProps,
    CardProps,
} from "antd";
import { useTranslate, useUpdatePassword } from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

const { Title } = Typography;

type UpdatePassworProps = RefineUpdatePasswordPageProps<LayoutProps, CardProps>;

export const UpdatePasswordPage: React.FC<UpdatePassworProps> = ({
    onSubmit,
    wrapperProps,
    contentProps,
    renderContent,
}) => {
    const [form] = Form.useForm<RefineUpdatePasswordFormTypes>();
    const translate = useTranslate();
    const { mutate: updatePassword, isLoading } =
        useUpdatePassword<RefineUpdatePasswordFormTypes>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.updatePassword.title", "Set New Password")}
        </Title>
    );

    const CardContent = (
        <Card
            title={CardTitle}
            headStyle={{ borderBottom: 0 }}
            style={containerStyles}
            {...(contentProps ?? {})}
        >
            <Form<RefineUpdatePasswordFormTypes>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                    if (onSubmit) {
                        onSubmit(values);
                    } else {
                        updatePassword(values);
                    }
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
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        translate(
                                            "pages.updatePassword.errors.confirmPasswordNotMatch",
                                            "Passwords do not match",
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

                <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={isLoading}
                    block
                >
                    {translate("pages.updatePassword.buttons.submit", "Update")}
                </Button>
            </Form>
        </Card>
    );

    return (
        <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    {renderContent ? renderContent(CardContent) : CardContent}
                </Col>
            </Row>
        </Layout>
    );
};
