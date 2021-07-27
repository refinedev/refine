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
    useLogin,
    useTranslate,
} from "@pankod/refine";

const { Text, Title } = Typography;

import { layoutStyles, containerStyles, titleStyles } from "./style";

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();
    const translate = useTranslate();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={3} style={titleStyles}>
            <Text style={{ color: "#67be23" }}>Sign in</Text> your account
        </Title>
    );

    return (
        <AntdLayout style={layoutStyles}>
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div style={containerStyles}>
                        <img src="/images/fine-foods-login.svg" width="100%" />
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
                                }}
                            >
                                <Form.Item
                                    name="email"
                                    label={translate(
                                        "pages.login.email",
                                        "Email",
                                    )}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="sample@finefoods.com"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label={translate(
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
                                            {translate(
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
                                        {translate(
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
                                    {translate("pages.login.signin", "Sign in")}
                                </Button>
                            </Form>
                            <Text style={{ fontSize: 12 }}>
                                {translate(
                                    "pages.login.noAccount",
                                    "Still no account? Please go to",
                                )}{" "}
                                <a href="#" style={{ fontWeight: "bold" }}>
                                    {translate("pages.login.signup", "Sign up")}
                                </a>
                            </Text>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};
