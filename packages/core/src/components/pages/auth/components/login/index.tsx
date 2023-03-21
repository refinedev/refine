import React, { useState } from "react";
import { LoginPageProps, LoginFormTypes } from "../../../../../interfaces";

import { useRouterContext, useLink, useRouterType, useLogin } from "@hooks";
import { useTranslate } from "@hooks/translate";

import { DivPropsType, FormPropsType } from "../..";
import { useActiveAuthProvider } from "@definitions/helpers";

type LoginProps = LoginPageProps<DivPropsType, DivPropsType, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({
    providers,
    registerLink,
    forgotPasswordLink,
    rememberMe,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
    title = undefined,
}) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const translate = useTranslate();

    const authProvider = useActiveAuthProvider();
    const { mutate: login } = useLogin<LoginFormTypes>({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const renderLink = (link: React.ReactNode, text?: string) => {
        if (link) {
            if (typeof link === "string") {
                return <ActiveLink to={link}>{text}</ActiveLink>;
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
                                providerName: provider.name,
                            })
                        }
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {provider?.icon}
                        {provider.label ?? <label>{provider.label}</label>}
                    </button>
                </div>
            ));
        }
        return null;
    };

    const content = (
        <div {...contentProps}>
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.login.title", "Sign in to your account")}
            </h1>
            {renderProviders()}
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ email, password, remember });
                }}
                {...formProps}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 25,
                    }}
                >
                    <label>
                        {translate("pages.login.fields.email", "Email")}
                    </label>
                    <input
                        name="email"
                        type="text"
                        size={20}
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>
                        {translate("pages.login.fields.password", "Password")}
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {rememberMe ?? (
                        <>
                            <label>
                                {translate(
                                    "pages.login.buttons.rememberMe",
                                    "Remember me",
                                )}
                                <input
                                    name="remember"
                                    type="checkbox"
                                    size={20}
                                    checked={remember}
                                    value={remember.toString()}
                                    onChange={() => {
                                        setRemember(!remember);
                                    }}
                                />
                            </label>
                        </>
                    )}
                    <br />
                    {forgotPasswordLink ??
                        renderLink(
                            "/forgot-password",
                            translate(
                                "pages.login.buttons.forgotPassword",
                                "Forgot password?",
                            ),
                        )}
                    <input
                        type="submit"
                        value={translate("pages.login.signin", "Sign in")}
                    />
                    {registerLink ?? (
                        <span>
                            {translate(
                                "pages.login.buttons.noAccount",
                                "Don’t have an account?",
                            )}{" "}
                            {renderLink(
                                "/register",
                                translate("pages.login.register", "Sign up"),
                            )}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );

    return (
        <div {...wrapperProps}>
            {renderContent ? renderContent(content, title) : content}
        </div>
    );
};
