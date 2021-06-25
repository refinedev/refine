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
    const [current, setCurrent] = useState<"gsmNumber" | "code">("gsmNumber");
    const [gsmNumber, setGsmNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { mutate: login } = useLogin<ILoginForm>();

    const onGsmFormSubmit = (values: Pick<ILoginForm, "gsmNumber">) => {
        setLoading(true);
        setGsmNumber(values.gsmNumber);
        setTimeout(() => setCurrent("code"), 1000);
    };

    const onCodeFormSubmit = async (values: Pick<ILoginForm, "code">) => {
        login({ gsmNumber, code: values.code });
    };

    const CardTitle = (
        <div className="login-header">
            <img src="./refine.svg" alt="Logo" />
        </div>
    );

    const renderGSMForm = () => (
        <Form layout="vertical" requiredMark={false} onFinish={onGsmFormSubmit}>
            <Form.Item
                name="gsmNumber"
                label="Gsm Number"
                rules={[
                    {
                        required: true,
                        message: "Gsm number is required",
                    },
                ]}
            >
                <Input
                    prefix={<PhoneOutlined style={{ color: "#00000040" }} />}
                    maxLength={10}
                    placeholder="(___)___-____"
                />
            </Form.Item>
            <Form.Item className="login-buttons">
                <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    loading={loading}
                >
                    Send
                </Button>
            </Form.Item>
        </Form>
    );

    const renderCodeForm = () => (
        <Form
            layout="vertical"
            requiredMark={false}
            onFinish={onCodeFormSubmit}
        >
            <Form.Item
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
                    maxLength={4}
                    prefix={<NumberOutlined style={{ color: "#00000040" }} />}
                />
            </Form.Item>
            <Form.Item className="login-buttons">
                <Button type="primary" size="large" htmlType="submit" block>
                    Login
                </Button>
            </Form.Item>
        </Form>
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
                        {current === "gsmNumber"
                            ? renderGSMForm()
                            : renderCodeForm()}
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
