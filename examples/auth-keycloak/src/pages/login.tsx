import { AntdLayout, Button } from "@pankod/refine-antd";
import { useLogin } from "@pankod/refine-core";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin();

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
                        onClick={() => login({})}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </AntdLayout>
    );
};
