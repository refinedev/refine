import React from "react";
import {
    useGetIdentity,
    useLogout,
    useMenu,
    useNavigation,
    useRouterContext,
} from "@pankod/refine-core";
import { Button, Image, Space, Icons, useModalForm } from "@pankod/refine-antd";

import { CreateCanvas } from "components/canvas";
import { Canvas } from "types";

const { PlusSquareOutlined, LogoutOutlined, LoginOutlined } = Icons;

export const Header: React.FC = () => {
    const { Link, useLocation } = useRouterContext();
    const { isError } = useGetIdentity();
    const { mutate: mutateLogout } = useLogout();
    const { push } = useNavigation();
    const { selectedKey } = useMenu();
    const { pathname } = useLocation();

    const { modalProps, formProps, show } = useModalForm<Canvas>({
        resource: "canvases",
        action: "create",
        redirect: "show",
    });

    const isLogin = !isError;

    const handleRedirect = () => {
        if (pathname === "/") {
            push("/login");
        }

        push(`/login?to=${encodeURIComponent(pathname)}`);
    };

    return (
        <div className="container">
            <div className="layout-header">
                <Link to="/">
                    <Image
                        width="120px"
                        src="/pixels-logo.svg"
                        alt="Pixels Logo"
                        preview={false}
                    />
                </Link>
                <Space size="large">
                    <Link
                        to="/"
                        className={`nav-button ${
                            selectedKey === "/" ? "active" : ""
                        }`}
                    >
                        <span className="dot-icon" />
                        HOME
                    </Link>
                    <Link
                        to="/canvases"
                        className={`nav-button ${
                            selectedKey === "/canvases" ? "active" : ""
                        }`}
                    >
                        <span className="dot-icon" />
                        NEW
                    </Link>
                </Space>
                <Space>
                    <Button
                        icon={<PlusSquareOutlined />}
                        onClick={() => {
                            if (isLogin) {
                                show();
                            } else {
                                handleRedirect();
                            }
                        }}
                        title="Create a new canvas"
                    >
                        Create
                    </Button>
                    {isLogin ? (
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                mutateLogout();
                            }}
                            icon={<LogoutOutlined />}
                            title="Logout"
                        />
                    ) : (
                        <Button
                            type="primary"
                            onClick={() => {
                                handleRedirect();
                            }}
                            icon={<LoginOutlined />}
                            title="Login"
                        >
                            Login
                        </Button>
                    )}
                </Space>
            </div>
            <CreateCanvas modalProps={modalProps} formProps={formProps} />
        </div>
    );
};
