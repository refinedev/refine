import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";
import { Layout, Space, Typography } from "antd";
import { ThemedTitle } from "@refinedev/antd";

const clientId =
    "1041339102270-jlljcjl19jo1hkgf695em3ibr7q2m734.apps.googleusercontent.com";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>();

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (
                typeof window === "undefined" ||
                !window.google ||
                !divRef.current
            ) {
                return;
            }

            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    client_id: clientId,
                    callback: async (res) => {
                        if (res.credential) {
                            login(res);
                        }
                    },
                });
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                });
            } catch (error) {
                console.log(error);
            }
        }, [clientId, window.google, divRef.current]);

        return <div ref={divRef} />;
    };

    return (
        <Layout
            style={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Space direction="vertical" align="center" size="large">
                <ThemedTitle
                    collapsed={false}
                    wrapperStyles={{
                        fontSize: "22px",
                    }}
                />
                <GoogleButton />
                <Typography.Text type="secondary">
                    Powered by Google
                </Typography.Text>
            </Space>
        </Layout>
    );
};
