import { useRouterContext, useLogin } from "@hooks";
import { useTranslate } from "@hooks/translate";
import React, { useState } from "react";
import { ILoginForm, IAuthCommonProps } from "../..";

export const Login: React.FC<IAuthCommonProps> = ({
    registerLink,
    loginLink,
    forgotLink,
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
            } else return link;
        }
        return null;
    };

    const renderProviders = () => {
        if (providers) {
            return providers.map((provider) => (
                <div key={provider.name}>
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
                        {provider.label ??
                            translate("pages.login.button", "login")}
                    </button>
                    <br />
                    <hr />
                </div>
            ));
        }
        return null;
    };

    return (
        <>
            <h1>{translate("pages.login.title", "Login")}</h1>
            {renderProviders()}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ email, password });
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {translate(
                                    "pages.login.email",
                                    undefined,
                                    "email",
                                )}
                                :
                            </td>
                            <td>
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
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {translate(
                                    "pages.login.password",
                                    undefined,
                                    "password",
                                )}
                                :
                            </td>
                            <td>
                                <input
                                    type="password"
                                    required
                                    size={20}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {forgotLink &&
                    renderLink(
                        forgotLink,
                        translate(
                            "pages.login.forgot",
                            "Forgot your password?",
                        ),
                    )}
                <br />
                {loginLink ? (
                    renderLink(
                        loginLink,
                        translate("pages.login.signup", "Login"),
                    )
                ) : (
                    <input type="submit" value="login" />
                )}
                {registerLink &&
                    renderLink(
                        registerLink,
                        translate("pages.login.register", "go to register"),
                    )}
            </form>
        </>
    );
};
