import React, { useState } from "react";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Form,
    Input,
    Button,
    Icons,
} from "@pankod/refine";
import "./styles.css";

import { useLogin } from "@pankod/refine";

const { PhoneOutlined, NumberOutlined } = Icons;
export interface ILoginForm {
    gsmNumber: string;
    code: string;
}

export const Login: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);
    const [form] = Form.useForm();

    const { mutate: login } = useLogin<ILoginForm>();

    const onSubmit = async (values: ILoginForm) => {
        login(values);
    };

    const handleSend = () => {
        form.validateFields(["gsmNumber"])
            .then(() => setCurrent(current + 1))
            .catch(() => null);
    };

    const CardTitle = (
        <div className="login-header">
            <img src="./refine.svg" alt="Logo" />
        </div>
    );

    return (
        <AntdLayout
            className="login-background"
            style={{ backgroundImage: "url('./background.svg')" }}
        >
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <Card className="login-card" title={CardTitle}>
                        <Form
                            className="ant-form-vertical"
                            form={form}
                            requiredMark={false}
                            onFinish={onSubmit}
                        >
                            <Form.Item
                                hidden={current === 1}
                                name="gsmNumber"
                                label="Gsm Number"
                                rules={[
                                    {
                                        required: true,
                                        message: "GSM no is required",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <PhoneOutlined
                                            style={{ color: "#00000040" }}
                                        />
                                    }
                                    maxLength={11}
                                    placeholder="(___)___-____"
                                />
                            </Form.Item>
                            <Form.Item
                                className="login-buttons"
                                hidden={current === 1}
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    onClick={handleSend}
                                >
                                    Send
                                </Button>
                            </Form.Item>
                            <Form.Item
                                hidden={current === 0}
                                name="code"
                                label="Code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Code is required",
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    prefix={
                                        <NumberOutlined
                                            style={{ color: "#00000040" }}
                                        />
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                className="login-buttons"
                                hidden={current === 0}
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    block
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
