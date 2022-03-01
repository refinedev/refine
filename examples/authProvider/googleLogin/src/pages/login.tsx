import { useLogin } from "@pankod/refine-core";
import { AntdLayout, Button, Icons } from "@pankod/refine-antd";
import { useGoogleLogin, GoogleLoginResponse } from "react-google-login";

const { GoogleOutlined } = Icons;

const clientId =
    "149954872426-ga5qkfj6v6fjr98p4lbakvf8u6mgtnp6.apps.googleusercontent.com";

export const Login: React.FC = () => {
    const { mutate: login, isLoading } = useLogin<GoogleLoginResponse>();

    const { signIn } = useGoogleLogin({
        onSuccess: (response) => login(response as GoogleLoginResponse),
        clientId,
        isSignedIn: true,
        cookiePolicy: "single_host_origin",
    });

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
                        icon={<GoogleOutlined />}
                        loading={isLoading}
                        onClick={() => signIn()}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </AntdLayout>
    );
};
