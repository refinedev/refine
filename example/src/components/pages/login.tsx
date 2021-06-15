import React from "react";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Form,
    Input,
    Button,
    useTranslate,
    useLogin,
} from "@pankod/refine";

export interface ILoginForm {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const { Title } = Typography;

    const [form] = Form.useForm();
    const { mutate: login } = useLogin();
    const translate = useTranslate();

    const onSubmit = async (values: ILoginForm) => {
        login(values);
    };

    return (
        <AntdLayout>
            <Row
                justify="center"
                style={{
                    display: "flex",
                    alignContent: "center",
                    height: "100vh",
                }}
            >
                <Col xl={6} lg={8} md={12} sm={18} xs={22}>
                    <Card>
                        <Title level={2} style={{ textAlign: "center" }}>
                            {translate("common:pages.login.title")}
                        </Title>
                        <Form
                            className="ant-form-vertical"
                            form={form}
                            name="control-hooks"
                            onFinish={onSubmit}
                        >
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true }]}
                            >
                                <Input type="password" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                >
                                    {translate("common:pages.login.title")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
