import React from "react";
import { Row, Col, Layout, Typography, Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

export const LoginPage: React.FC = () => {
    const { Title } = Typography;

    const [form] = Form.useForm();
    const history = useHistory();

    const onFinish = (values: any) => {
        console.log(`LoginFormValues: ${JSON.stringify(values)}`);

        history.push("/");
    };

    return (
        <Layout>
            <Row
                justify="center"
                style={{
                    display: "flex",
                    alignContent: "center",
                    height: "100vh",
                }}
            >
                <Col span={6}>
                    <Title level={2} style={{ textAlign: "center" }}>
                        Login
                    </Title>
                    <Form
                        className="ant-form-vertical"
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            label="E-Mail"
                            rules={[{ required: true }, { type: "email" }]}
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
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
};
