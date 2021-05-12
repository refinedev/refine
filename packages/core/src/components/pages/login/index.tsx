import React, { useContext } from "react";
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
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";

import { useNavigation, useNotification } from "@hooks";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

const { Text } = Typography;

export interface ILoginForm {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const { push } = useNavigation();
    const notification = useNotification();

    const { login } = useContext<IAuthContext>(AuthContext);

    const onSubmit = (values: ILoginForm) => {
        login(values)
            .then(() => push("/"))
            .catch(() => {
                notification.error({
                    message: "Login Error",
                    description: "Invalid username or password",
                });
            });
    };

    const CardTitle = (
        <div className="login-header">
            <svg
                width="100"
                height="28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0)">
                    <g filter="url(#filter0_b)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M42.78 8.189h-2.465a.386.386 0 01-.378-.378v-.456c0-1.9.864-2.851 2.595-2.851a4.078 4.078 0 011.666.336.665.665 0 00.899-.376l1.04-2.87a.67.67 0 00-.34-.833 6.729 6.729 0 00-1.389-.483A10.523 10.523 0 0041.976 0c-2.413 0-4.283.657-5.61 1.974-1.328 1.316-1.992 3.095-1.992 5.337v17.253a2.851 2.851 0 105.702 0V12.96a.385.385 0 01.385-.384h2.32a2.193 2.193 0 100-4.386zm34.482 8.625c0-2.947-.877-5.262-2.632-6.945-1.754-1.681-4.191-2.521-7.31-2.52-3.12 0-5.557.841-7.311 2.522-1.755 1.68-2.632 3.995-2.632 6.944v7.75a2.852 2.852 0 005.703 0v-7.567c-.002-1.627.352-2.858 1.06-3.691.707-.834 1.742-1.25 3.106-1.25 1.39.005 2.444.422 3.162 1.25.719.828 1.078 2.058 1.078 3.691v7.565a2.852 2.852 0 002.851 2.852h.074a2.851 2.851 0 002.851-2.852v-7.75zm21.152 1.974h-13.01a.303.303 0 00-.29.388 4.583 4.583 0 001.805 2.5c.995.706 2.236 1.06 3.723 1.06a7.565 7.565 0 002.724-.458c.266-.102.525-.224.773-.364.88-.491 2.143-.315 2.827.425l.03.034a2.287 2.287 0 01-.539 3.527c-1.609.936-3.596 1.404-5.96 1.404-2.223 0-4.185-.432-5.886-1.297a9.513 9.513 0 01-3.948-3.601c-.925-1.534-1.388-3.277-1.388-5.228a10.047 10.047 0 011.37-5.208 9.605 9.605 0 013.767-3.619c1.596-.864 3.38-1.296 5.352-1.296 1.925 0 3.668.414 5.228 1.242a9.083 9.083 0 013.673 3.565c.89 1.547 1.335 3.344 1.335 5.391v.02a1.581 1.581 0 01-1.586 1.515zm-11.866-6.323a4.538 4.538 0 00-1.518 2.53.383.383 0 00.372.467h8.765a.383.383 0 00.37-.468 4.608 4.608 0 00-1.514-2.511c-.878-.74-1.95-1.111-3.217-1.111-1.295-.003-2.381.361-3.258 1.093zM52.7 9.405a2.851 2.851 0 00-4.867 2.016V23.24a2.852 2.852 0 005.703 0V11.42c0-.755-.3-1.48-.836-2.015zm-4.892-.861a4.075 4.075 0 012.876-1.194 4.075 4.075 0 014.07 4.07v11.82a4.07 4.07 0 01-8.139 0V11.42a4.075 4.075 0 011.193-2.876z"
                            fill="#1890FF"
                        />
                    </g>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.143 10.423c.648-1.1 1.46-2.094 2.405-2.951l.061-.182c-.88-.162-1.772-.24-2.666-.235-3.12 0-5.557.84-7.311 2.522C.877 11.26 0 13.573 0 16.521v8.042a2.851 2.851 0 105.703 0v-7.858c0-1.633.353-2.864 1.06-3.692.633-.74 1.529-1.15 2.688-1.226.203-.468.434-.923.692-1.364zm20.397 8.365H17.53a.303.303 0 00-.299.249.304.304 0 00.007.139 4.594 4.594 0 001.805 2.5c.997.706 2.238 1.06 3.725 1.06a7.566 7.566 0 002.724-.458c.266-.102.525-.224.773-.364.88-.491 2.143-.315 2.827.425l.029.034a2.285 2.285 0 01-.538 3.527c-1.61.936-3.598 1.404-5.96 1.404-2.223 0-4.185-.432-5.886-1.297a9.525 9.525 0 01-3.949-3.601c-.926-1.534-1.389-3.277-1.389-5.228a10.047 10.047 0 011.371-5.208 9.611 9.611 0 013.761-3.618c1.596-.865 3.381-1.298 5.355-1.297 1.925 0 3.668.414 5.228 1.242a9.092 9.092 0 013.673 3.565c.89 1.547 1.334 3.344 1.335 5.391v.02a1.582 1.582 0 01-1.582 1.515zm-11.866-6.323a4.537 4.537 0 00-1.518 2.53.382.382 0 00.37.467h8.763a.383.383 0 00.37-.468 4.615 4.615 0 00-1.517-2.511c-.878-.74-1.95-1.111-3.218-1.111-1.29-.003-2.373.361-3.25 1.093zm34.18-1.111a2.17 2.17 0 11-4.34 0 2.17 2.17 0 014.34 0z"
                        fill="#36CFC9"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <path fill="#fff" d="M0 0h100v27.416H0z" />
                    </clipPath>
                    <filter
                        id="filter0_b"
                        x="26.374"
                        y="-8"
                        width="81.626"
                        height="43.416"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImage" stdDeviation="4" />
                        <feComposite
                            in2="SourceAlpha"
                            operator="in"
                            result="effect1_backgroundBlur"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="effect1_backgroundBlur"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );

    return (
        <Layout className="login-background">
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
                            name="control-hooks"
                            onFinish={onSubmit}
                            requiredMark={false}
                        >
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    prefix={
                                        <UserOutlined
                                            style={{ color: "#00000040" }}
                                        />
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="password"
                                    prefix={
                                        <LockOutlined
                                            style={{ color: "#00000040" }}
                                        />
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a style={{ float: "right" }} href="">
                                    Forgot password?
                                </a>
                            </Form.Item>
                            <Form.Item>
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
                        <div className="signup-section">
                            <Text>
                                Still no account? Please go to{" "}
                                <a href="">Sign up</a>
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};
