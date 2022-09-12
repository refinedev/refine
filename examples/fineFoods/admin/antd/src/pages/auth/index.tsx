import { AuthPage as AntdAuthPage } from "@pankod/refine-antd";
import { useRegister, useRouterContext } from "@pankod/refine-core";

const authWrapperProps = {
    style: {
        background:
            "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
        backgroundSize: "cover",
    },
};

const renderAuthContent = (content: React.ReactNode) => {
    const { Link } = useRouterContext();

    return (
        <div
            style={{
                maxWidth: 408,
                margin: "auto",
            }}
        >
            <Link to="/">
                <img
                    style={{ marginBottom: 26 }}
                    src="/images/fine-foods-login.svg"
                    alt="Logo"
                    width="100%"
                />
            </Link>
            {content}
        </div>
    );
};

export const AuthPage: React.FC<{
    type?: "login" | "register" | "resetPassword" | "updatePassword";
}> = ({ type }) => {
    const { mutate: register } = useRegister();

    return (
        <AntdAuthPage
            type={type}
            wrapperProps={authWrapperProps}
            renderContent={renderAuthContent}
            {...(type === "register" && {
                onSubmit: async (values: {
                    email?: string;
                    password?: string;
                }) => {
                    if (values.email && values.password) {
                        register(values);
                    }
                },
            })}
        />
    );
};
