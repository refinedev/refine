import React from "react";
import { RegisterPageProps, RegisterFormTypes } from "@pankod/refine-core";
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
    Divider,
} from "antd";
import {
    useTranslate,
    useRouterContext,
    useRegister,
} from "@pankod/refine-core";

import { layoutStyles, containerStyles, titleStyles } from "../styles";

const { Text, Title } = Typography;

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps>;

/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
    providers,
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const [form] = Form.useForm<RegisterFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: register, isLoading } = useRegister<RegisterFormTypes>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            {translate("pages.register.title", "Sign up for your account")}
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
                                    register({
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
            <Form<RegisterFormTypes>
                layout="vertical"
                form={form}
                onFinish={(values) => register(values)}
                requiredMark={false}
                {...formProps}
            >
                <Form.Item
                    name="email"
                    label={translate("pages.register.email", "Email")}
                    rules={[
                        { required: true },
                        {
                            type: "email",
                            message: translate(
                                "pages.register.errors.validEmail",
                                "Invalid email address",
                            ),
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder={translate(
                            "pages.register.fields.email",
                            "Email",
                        )}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={translate(
                        "pages.register.fields.password",
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
                                "pages.login.buttons.haveAccount",
                                "Have an account?",
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
                        {translate("pages.register.buttons.submit", "Sign up")}
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
