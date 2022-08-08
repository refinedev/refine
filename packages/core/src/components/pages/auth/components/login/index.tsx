import { useLogin } from "@hooks/auth";
import { useTranslate } from "@hooks/translate";
import React, { useState } from "react";
import { ILoginForm, IAuthCommonProps } from "../..";

export const Login: React.FC<IAuthCommonProps> = ({
    registerLink,
    loginLink,
    forgotLink,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const translate = useTranslate();

    const { mutate: login } = useLogin<ILoginForm>();

    console.log("registerLink", registerLink);

    return (
        <>
            <h1>{translate("pages.login.title", "Login")}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login({ username, password });
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {translate(
                                    "pages.login.username",
                                    undefined,
                                    "username",
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
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                {forgotLink && (
                    <a href={forgotLink}>
                        {translate(
                            "pages.login.forgot",
                            "Forgot your password?",
                        )}
                    </a>
                )}
                {loginLink ? (
                    <a href={loginLink}>
                        {translate(
                            "pages.login.signup",

                            "Sign up",
                        )}
                    </a>
                ) : (
                    <input type="submit" value="login" />
                )}
                {registerLink && (
                    <a href={registerLink}>
                        {translate("pages.login.register", "Register")}
                    </a>
                )}
            </form>
        </>
    );
};
