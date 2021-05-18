import React from "react";
import { Row, AntdLayout, Card, Typography, Button } from "@pankod/refine";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
    const { Title } = Typography;

    const { loginWithRedirect } = useAuth0();

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
                <Card>
                    <Title
                        level={3}
                        style={{
                            textAlign: "center",
                        }}
                    >
                        Login
                    </Title>
                    <Button
                        onClick={() => loginWithRedirect()}
                        size="large"
                        type="primary"
                    >
                        Login with Auth0
                    </Button>
                </Card>
            </Row>
        </AntdLayout>
    );
};
