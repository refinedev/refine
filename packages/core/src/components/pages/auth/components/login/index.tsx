import React, { useState } from "react";
import {
    RefineLoginPageProps,
    RefineLoginFormTypes,
} from "@pankod/refine-ui-types";

import { useRouterContext, useLogin } from "@hooks";
import { useTranslate } from "@hooks/translate";

import { DivPropsType, FormPropsType } from "../..";
type LoginProps = RefineLoginPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

export const LoginPage: React.FC<LoginProps> = ({
    providers,
    registerLink,
    forgotPasswordLink,
    rememberMe,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const { Link } = useRouterContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const translate = useTranslate();

    const { mutate: login } = useLogin<RefineLoginFormTypes>();

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
                                providerName: provider.name,
                            })
                        }
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {provider?.icon}
                        {provider.label ?? (
                            <label>
                                {translate(
                                    "pages.login.button",
                                    `login with ${provider.name}`,
                                )}
                            </label>
                        )}
                    </button>
                </div>
            ));
        }
        return null;
    };

    const content = (
        <div {...contentProps}>
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.login.title", "Login")}
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
                        {translate("pages.login.email", undefined, "Email")}:
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
                        {translate(
                            "pages.login.password",
                            undefined,
                            "Password",
                        )}
                        :
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
                                    "pages.login.rememberMe",
                                    undefined,
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
                                "pages.login.forgotPassword",
                                "Forgot your password?",
                            ),
                        )}
                    <input
                        type="submit"
                        value={translate("pages.login.button", "Login")}
                    />
                    {registerLink ??
                        renderLink(
                            "register",
                            translate(
                                "pages.login.register",
                                "Don't have an account? Register",
                            ),
                        )}
                </div>
            </form>
        </div>
    );

    return (
        <div {...wrapperProps}>
            {renderContent ? renderContent(content) : content}
        </div>
    );
};
