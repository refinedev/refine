import React from "react";
import {
    ForgotPasswordPageProps,
    ForgotPasswordFormTypes,
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
import {
    useTranslate,
    useRouterContext,
    useForgotPassword,
} from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

type ResetPassworProps = ForgotPasswordPageProps<
    LayoutProps,
    CardProps,
    FormProps
>;

const { Text, Title } = Typography;

/**
 * **refine** has forgot password page form which is served on `/forgot-password` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ResetPassworProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const [form] = Form.useForm<ForgotPasswordFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: forgotPassword, isLoading } =
        useForgotPassword<ForgotPasswordFormTypes>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.forgotPassword.title", "Forgot your password?")}
        </Title>
    );
    const CardContent = (
        <Card
            title={CardTitle}
            headStyle={{ borderBottom: 0 }}
            style={containerStyles}
            {...(contentProps ?? {})}
        >
            <Form<ForgotPasswordFormTypes>
                layout="vertical"
                form={form}
                onFinish={(values) => forgotPassword(values)}
                requiredMark={false}
                {...formProps}
            >
                <Form.Item
                    name="email"
                    label={translate(
                        "pages.forgotPassword.fields.email",
                        "Email",
                    )}
                    rules={[
                        { required: true },
                        {
                            type: "email",
                            message: translate(
                                "pages.forgotPassword.errors.validEmail",
                                "Invalid email address",
                            ),
                        },
                    ]}
                >
                    <Input
                        type="email"
                        size="large"
                        placeholder={translate(
                            "pages.forgotPassword.fields.email",
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
                        <Text
                            style={{
                                fontSize: 12,
                                marginLeft: "auto",
                            }}
                        >
                            {translate(
                                "pages.register.buttons.haveAccount",
                                "Have an account? ",
                            )}{" "}
                            <Link
                                style={{
                                    fontWeight: "bold",
                                }}
                                to="/login"
                            >
                                {translate("pages.login.signin", "Sign in")}
                            </Link>
                        </Text>
                    )}
                </div>
                <Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={isLoading}
                        block
                    >
                        {translate(
                            "pages.forgotPassword.buttons.submit",
                            "Send reset instructions",
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
