import React from "react";
import {
    useMenu,
    useTitle,
    useLogout,
    useGetIdentity,
    useNavigation,
} from "@pankod/refine-core";
import {
    Menu,
    Icons,
    Button,
    Space,
    Modal,
    useModalForm,
    Row,
    Col,
    Typography,
    Input,
    Radio,
    Form,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { Canvas } from "types/canvas";
import { DEFAULT_CANVAS_SIZE, getRandomName } from "utility";

const { Link } = routerProvider;
const { LoginOutlined, LogoutOutlined, PlusSquareOutlined } = Icons;

export function PixelsHeader() {
    const Title = useTitle();
    const { selectedKey } = useMenu();
    const { data: user } = useGetIdentity();
    const { mutate: mutateLogout } = useLogout();
    const { push } = useNavigation();
    const { modalProps, formProps, show } = useModalForm<Canvas>({
        resource: "canvases",
        action: "create",
        redirect: "show",
    });

    const [values, setValues] = React.useState(() => {
        const name = getRandomName();
        return {
            name: name,
            id: name.replace(/\s/g, "-").toLowerCase(),
            width: DEFAULT_CANVAS_SIZE,
            height: DEFAULT_CANVAS_SIZE,
        };
    });

    return (
        <>
            <Menu
                selectedKeys={[selectedKey]}
                mode="horizontal"
                style={{ backgroundColor: "transparent" }}
            >
                <Space
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0px 24px",
                        height: "64px",
                        backgroundColor: "transparent",
                    }}
                >
                    <Menu.Item key="logo">
                        <Link to="/">
                            <img
                                width="120"
                                src="/pixels-logo.svg"
                                alt="pixels-logo"
                            />
                        </Link>
                    </Menu.Item>
                    <Space>
                        <Menu.Item key="home">
                            <Link
                                style={{
                                    color: "#242436",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                                to="/"
                            >
                                Home
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="feed">
                            <Link
                                style={{
                                    color: "#242436",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                                to="/feed"
                            >
                                Feed
                            </Link>
                        </Menu.Item>
                    </Space>
                    <Space>
                        <Menu.Item key="create">
                            <Button
                                onClick={() => {
                                    if (user) {
                                        show();
                                    } else {
                                        push("/login");
                                    }
                                }}
                                icon={<PlusSquareOutlined />}
                            >
                                Create a Canvas
                            </Button>
                        </Menu.Item>
                        <Space>
                            {user ? (
                                <Menu.Item key="logout">
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => {
                                            mutateLogout();
                                        }}
                                        icon={<LogoutOutlined />}
                                    >
                                        Logout
                                    </Button>
                                </Menu.Item>
                            ) : (
                                <Menu.Item key="login">
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            push("/login");
                                        }}
                                        icon={<LoginOutlined />}
                                    >
                                        Login
                                    </Button>
                                </Menu.Item>
                            )}
                        </Space>
                    </Space>
                </Space>
            </Menu>
            <Modal
                {...modalProps}
                title="Create Canvas"
                centered
                afterClose={() => {
                    const name = getRandomName();
                    setValues({
                        name: name,
                        id: name.replace(/\s/g, "-").toLowerCase(),
                        width: DEFAULT_CANVAS_SIZE,
                        height: DEFAULT_CANVAS_SIZE,
                    });
                }}
                bodyStyle={{ borderRadius: "6px" }}
            >
                <Form
                    {...formProps}
                    onFinish={() => {
                        return (
                            formProps.onFinish &&
                            formProps.onFinish({
                                ...values,
                                user_id: user?.id,
                            })
                        );
                    }}
                >
                    <Row gutter={16} style={{ maxWidth: 360, margin: "auto" }}>
                        <Col span={24} style={{ marginBottom: 24 }}>
                            <Row gutter={16}>
                                <Col style={{ width: 70 }}>ID: </Col>
                                <Col flex={1}>
                                    <Input value={values.id} disabled />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{ marginBottom: 24 }}>
                            <Row gutter={16}>
                                <Col style={{ width: 70 }}>Name: </Col>
                                <Col flex={1}>
                                    <Input value={values.name} disabled />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{ marginBottom: 24 }}>
                            <Row gutter={16}>
                                <Col style={{ width: 70 }}>Size: </Col>
                                <Col flex={1}>
                                    <Radio.Group
                                        options={[10, 20, 30, 50, 70]}
                                        onChange={({ target: { value } }) =>
                                            setValues((p) => ({
                                                ...p,
                                                height: value,
                                                width: value,
                                            }))
                                        }
                                        value={values.width}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default PixelsHeader;
