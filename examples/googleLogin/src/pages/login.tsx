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
import { useGoogleLogin, GoogleLoginResponse } from "react-google-login";

const { Text } = Typography;
const { GoogleOutlined } = Icons;

const clientId =
    "149954872426-ga5qkfj6v6fjr98p4lbakvf8u6mgtnp6.apps.googleusercontent.com";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin<GoogleLoginResponse>();

    const { signIn } = useGoogleLogin({
        onSuccess: (response) => login(response as GoogleLoginResponse),
        clientId,
        isSignedIn: true,
        cookiePolicy: "single_host_origin",
    });

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
                            block
                            icon={<GoogleOutlined />}
                            onClick={() => signIn()}
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
