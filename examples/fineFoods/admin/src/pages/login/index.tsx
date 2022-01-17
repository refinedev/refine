import { useLogin, useTranslate } from "@pankod/refine-core";

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
} from "@pankod/refine-antd";

import { Trans } from "react-i18next";

const { Text, Title } = Typography;

import "./style.less";

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();
    const t = useTranslate();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={3} className="layout-title">
            <Trans
                i18nKey="pages.login.message"
                defaults="<0>Sign in</0> your account"
                components={[<Text key="0" style={{ color: "#67be23" }} />]}
            />
        </Title>
    );

    return (
        <AntdLayout
            style={{
                background:
                    "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
                backgroundSize: "cover",
            }}
        >
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div style={{ maxWidth: "408px", margin: "auto" }}>
                        <img
                            style={{ marginBottom: 26 }}
                            src="/images/fine-foods-login.svg"
                            width="100%"
                        />
                        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form<ILoginForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    login(values);
                                }}
                                requiredMark={false}
                                initialValues={{
                                    remember: false,
                                    username: "admin",
                                    password: "admin",
                                }}
                            >
                                <Form.Item
                                    name="username"
                                    label={t("pages.login.email", "Username")}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="sample@finefoods.com"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label={t(
                                        "pages.login.password",
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
                                <div style={{ marginBottom: "12px" }}>
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
                                            {t(
                                                "pages.login.remember",
                                                "Remember me",
                                            )}
                                        </Checkbox>
                                    </Form.Item>

                                    <a
                                        style={{
                                            float: "right",
                                            fontSize: "12px",
                                        }}
                                        href="#"
                                    >
                                        {t(
                                            "pages.login.forgotPassword",
                                            "Forgot password?",
                                        )}
                                    </a>
                                </div>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    {t("pages.login.signin", "Sign in")}
                                </Button>
                            </Form>
                            <div style={{ marginTop: 8 }}>
                                <Text style={{ fontSize: 12 }}>
                                    {t(
                                        "pages.login.noAccount",
                                        "Still no account? Please go to",
                                    )}{" "}
                                    <a href="#" style={{ fontWeight: "bold" }}>
                                        {t("pages.login.signup", "Sign up")}
                                    </a>
                                </Text>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};
