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
    useLogin,
} from "@pankod/refine";
export interface ILoginForm {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const { Title } = Typography;

    const [form] = Form.useForm();
    const login = useLogin();

    const onSubmit = (values: ILoginForm) => {
        login(values);
    };

    return (
        <AntdLayout>
            <Row
                justify="center"
                align="middle"
                style={{
                    display: "flex",
                    height: "100vh",
                }}
            >
                <Col>
                    <Card
                        hoverable
                        title={
                            <Title level={3} style={{ textAlign: "center" }}>
                                refine
                            </Title>
                        }
                        style={{ minWidth: "300px", borderRadius: "15px" }}
                    >
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
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    type="primary"
                                    size="middle"
                                    shape="round"
                                    htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
