import { useRouterContext, useLogin } from "@hooks";
import { useTranslate } from "@hooks/translate";
import React, { useState } from "react";
import { ILoginForm, IAuthCommonProps } from "../..";

export const Login: React.FC<IAuthCommonProps> = ({
    registerLink,
    loginLink,
    resetPasswordLink,
    providers,
}) => {
    const { Link } = useRouterContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const translate = useTranslate();

    const { mutate: login } = useLogin<ILoginForm>();

    const renderLink = (link: React.ReactNode, text?: string) => {
        if (link) {
            if (typeof link === "string") {
                return <Link to={link}>{text}</Link>;
            }
            return link;
        }
        return null;
    };

    const renderProviders = () => {
        if (providers) {
            return providers.map((provider) => (
                <div
                    key={provider.name}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                    }}
                >
                    <button
                        onClick={() =>
                            login({
                                email,
                                password,
                                providerName: provider.name,
                            })
                        }
                    >
                        {provider?.icon}
                        {provider.label ?? (
                            <label>
                                {translate("pages.login.button", "login")}
                            </label>
                        )}
                    </button>
                </div>
            ));
        }
        return null;
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.login.title", "Login")}
            </h1>
            {renderProviders()}
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ email, password });
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 25,
                    }}
                >
                    <label>
                        {translate("pages.login.email", undefined, "Email")}:
                    </label>
                    <input
                        type="text"
                        size={20}
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>
                        {translate(
                            "pages.login.password",
                            undefined,
                            "Password",
                        )}
                        :
                    </label>
                    <input
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    {loginLink ? (
                        renderLink(
                            loginLink,
                            translate("pages.login.signup", "Login"),
                        )
                    ) : (
                        <input type="submit" value="Login" />
                    )}
                    {resetPasswordLink &&
                        renderLink(
                            resetPasswordLink,
                            translate(
                                "pages.login.resetPassword",
                                "Forgot your password?",
                            ),
                        )}
                    {registerLink &&
                        renderLink(
                            registerLink,
                            translate("pages.login.register", "go to register"),
                        )}
                </div>
            </form>
        </>
    );
};
