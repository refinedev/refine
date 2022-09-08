import React from "react";
import { RefineResetPasswordPageProps } from "@pankod/refine-ui-types";
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
import {
    useTranslate,
    useRouterContext,
    useResetPassword,
} from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

type ResetPassworProps = RefineResetPasswordPageProps<LayoutProps, CardProps>;

const { Text, Title } = Typography;
interface IResestPasswordForm {
    email: string;
}

export const ResetPasswordPage: React.FC<ResetPassworProps> = ({
    submitButton,
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
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

    const CardContent = (
        <Card
            title={CardTitle}
            headStyle={{ borderBottom: 0 }}
            style={containerStyles}
            {...(contentProps ?? {})}
        >
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
                        "pages.resetPassword.fields.email",
                        "Email",
                    )}
                    rules={[{ required: true }]}
                >
                    <Input
                        size="large"
                        placeholder={translate(
                            "pages.resetPassword.fields.email",
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

                {submitButton ?? (
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={isLoading}
                        block
                    >
                        {translate(
                            "pages.resetPassword.buttons.submit",
                            "Send",
                        )}
                    </Button>
                )}
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
