import React from "react";
import { LoginPageProps, LoginFormTypes } from "@pankod/refine-core";
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
    CardProps,
    LayoutProps,
    Divider,
    FormProps,
} from "antd";
import { useLogin, useTranslate, useRouterContext } from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

const { Text, Title } = Typography;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
    providers,
    registerLink,
    forgotPasswordLink,
    rememberMe,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const [form] = Form.useForm<LoginFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: login, isLoading } = useLogin<LoginFormTypes>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.login.title", "Sign in to your account")}
        </Title>
    );

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    {providers.map((provider) => {
                        return (
                            <Button
                                key={provider.name}
                                type="ghost"
                                block
                                icon={provider.icon}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    marginBottom: "8px",
                                }}
                                onClick={() =>
                                    login({
                                        providerName: provider.name,
                                    })
                                }
                            >
                                {provider.label}
                            </Button>
                        );
                    })}
                    <Divider>{translate("pages.login.divider", "or")}</Divider>
                </>
            );
        }
        return null;
    };

    const CardContent = (
        <Card
            title={CardTitle}
            headStyle={{ borderBottom: 0 }}
            style={containerStyles}
            {...(contentProps ?? {})}
        >
            {renderProviders()}
            <Form<LoginFormTypes>
                layout="vertical"
                form={form}
                onFinish={(values) => login(values)}
                requiredMark={false}
                initialValues={{
                    remember: false,
                }}
                {...formProps}
            >
                <Form.Item
                    name="email"
                    label={translate("pages.login.fields.email", "Email")}
                    rules={[
                        { required: true },
                        {
                            type: "email",
                            message: translate(
                                "pages.login.errors.validEmail",
                                "Invalid email address",
                            ),
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder={translate(
                            "pages.login.fields.email",
                            "Email",
                        )}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={translate("pages.login.fields.password", "Password")}
                    rules={[{ required: true }]}
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
                    {rememberMe ?? (
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                {translate(
                                    "pages.login.buttons.rememberMe",
                                    "Remember me",
                                )}
                            </Checkbox>
                        </Form.Item>
                    )}
                    {forgotPasswordLink ?? (
                        <Link
                            style={{
                                fontSize: "12px",
                                marginLeft: "auto",
                            }}
                            to="/forgot-password"
                        >
                            {translate(
                                "pages.login.buttons.forgotPassword",
                                "Forgot password?",
                            )}
                        </Link>
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
                        {translate("pages.login.signin", "Sign in")}
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ marginTop: 8 }}>
                {registerLink ?? (
                    <Text style={{ fontSize: 12 }}>
                        {translate(
                            "pages.login.buttons.noAccount",
                            "Don’t have an account?",
                        )}{" "}
                        <Link to="/register" style={{ fontWeight: "bold" }}>
                            {translate("pages.login.signup", "Sign up")}
                        </Link>
                    </Text>
                )}
            </div>
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
