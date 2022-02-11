import { useLogin } from "@pankod/refine-core";

import { AntdLayout, Button } from "@pankod/refine-antd";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <AntdLayout
            style={{
                background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
                backgroundSize: "cover",
            }}
        >
            <div style={{ height: "100vh", display: "flex" }}>
                <div style={{ maxWidth: "200px", margin: "auto" }}>
                    <div style={{ marginBottom: "28px" }}>
                        <img src="./refine.svg" alt="Refine" />
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() => loginWithRedirect()}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </AntdLayout>
    );
};
