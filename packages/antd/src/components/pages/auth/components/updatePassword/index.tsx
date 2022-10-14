import React from "react";
import {
    UpdatePasswordPageProps,
    UpdatePasswordFormTypes,
} from "@pankod/refine-core";
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
    FormProps,
} from "antd";
import { useTranslate, useUpdatePassword } from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

const { Title } = Typography;

type UpdatePasswordProps = UpdatePasswordPageProps<
    LayoutProps,
    CardProps,
    FormProps
>;

/**
 * **refine** has update password page form which is served on `/update-password` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const [form] = Form.useForm<UpdatePasswordFormTypes>();
    const translate = useTranslate();
    const { mutate: updatePassword, isLoading } =
        useUpdatePassword<UpdatePasswordFormTypes>();

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
            <Form<UpdatePasswordFormTypes>
                layout="vertical"
                form={form}
                onFinish={(values) => updatePassword(values)}
                requiredMark={false}
                {...formProps}
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
                <Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={isLoading}
                        block
                    >
                        {translate(
                            "pages.updatePassword.buttons.submit",
                            "Update",
                        )}
                    </Button>
                </Form.Item>
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
