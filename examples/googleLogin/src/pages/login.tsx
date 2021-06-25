import React from "react";
import {
    Row,
    Col,
    AntdLayout,
    Card,
    Typography,
    Button,
    Icons,
    useLogin,
} from "@pankod/refine";

const { Text } = Typography;
const { GoogleOutlined } = Icons;

export const Login: React.FC = () => {
    const { mutate: login } = useLogin();

    const CardTitle = (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60px",
            }}
        >
            <img src="./refine.svg" alt="Logo" />
        </div>
    );

    return (
        <AntdLayout
            style={{
                backgroundColor: "#eff7f7",
                backgroundImage: `url("./background.svg")`,
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
                    <Card
                        style={{
                            maxWidth: "400px",
                            margin: "auto",
                        }}
                        title={CardTitle}
                    >
                        <Button
                            type="primary"
                            size="large"
                            // htmlType="submit"
                            block
                            icon={<GoogleOutlined />}
                            onClick={() => login(undefined)}
                        >
                            Login with Google
                        </Button>
                        <br />
                        <br />
                        <div
                            style={{ textAlign: "center", padding: "10px 0px" }}
                        >
                            <Text>
                                Still no account? Please go to
                                <a href="#"> Sign up</a>
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </AntdLayout>
    );
};
