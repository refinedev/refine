import { useTranslate, useRouterContext, useRegister } from "@hooks";
import React, { useState } from "react";
import { IAuthCommonProps, IRegisterForm } from "../..";

export const Register: React.FC<IAuthCommonProps> = ({
    registerLink,
    loginLink,
    forgotLink,
}) => {
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const translate = useTranslate();

    const { mutate: register } = useRegister<IRegisterForm>();

    const renderLink = (link: React.ReactNode, text?: string) => {
        if (link) {
            if (typeof link === "string") {
                return <Link to={link}>{text}</Link>;
            } else return link;
        }
        return null;
    };

    return (
        <>
            <h1>{translate("pages.register.title", "Register")}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password === confirmPassword) {
                        register({ email, password });
                    }
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {translate(
                                    "pages.register.email",
                                    undefined,
                                    "email",
                                )}
                                :
                            </td>
                            <td>
                                <input
                                    type="email"
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
                                    "pages.register.password",
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
                        <tr>
                            <td>
                                {translate(
                                    "pages.register.confirmPassword",
                                    undefined,
                                    "confirm password",
                                )}
                                :
                            </td>
                            <td>
                                <input
                                    type="password"
                                    required
                                    size={20}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
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
                {registerLink ? (
                    renderLink(
                        registerLink,
                        translate("pages.register.signup", "Sign up"),
                    )
                ) : (
                    <input type="submit" value="register" />
                )}
                <br />
                {loginLink &&
                    renderLink(
                        loginLink,
                        translate("pages.register.login", "go to login"),
                    )}
            </form>
        </>
    );
};
