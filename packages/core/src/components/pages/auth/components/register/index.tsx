import React, { useState } from "react";
import { RegisterPageProps } from "../../../../../interfaces";

import {
    useTranslate,
    useRouterContext,
    useLink,
    useRouterType,
    useRegister,
} from "@hooks";

import { DivPropsType, FormPropsType } from "../..";
import { useActiveAuthProvider } from "@definitions/helpers";

type RegisterProps = RegisterPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

export const RegisterPage: React.FC<RegisterProps> = ({
    providers,
    loginLink,
    wrapperProps,
    contentProps,
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

    const translate = useTranslate();

    const authProvider = useActiveAuthProvider();
    const { mutate: register, isLoading } = useRegister({
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
                            register({
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
                {translate("pages.register.title", "Sign up for your account")}
            </h1>
            {renderProviders()}
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    register({ email, password });
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
                        {translate("pages.register.fields.email", "Email")}
                    </label>
                    <input
                        name="email"
                        type="email"
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
                            "pages.register.fields.password",
                            "Password",
                        )}
                    </label>
                    <input
                        name="password"
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        value={translate(
                            "pages.register.buttons.submit",
                            "Sign up",
                        )}
                        disabled={isLoading}
                    />
                    {loginLink ?? (
                        <>
                            <span>
                                {translate(
                                    "pages.login.buttons.haveAccount",
                                    "Have an account?",
                                )}{" "}
                                {renderLink(
                                    "/login",
                                    translate("pages.login.signin", "Sign in"),
                                )}
                            </span>
                        </>
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
