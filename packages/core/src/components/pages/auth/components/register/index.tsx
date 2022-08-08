import { useTranslate } from "@hooks/translate";
import React, { useState } from "react";
import { IAuthCommonProps } from "../..";

export const Register: React.FC<IAuthCommonProps> = ({
    registerLink,
    loginLink,
    forgotLink,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const translate = useTranslate();

    return (
        <>
            <h1>{translate("pages.register.title", "Register")}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {translate(
                                    "pages.register.username",
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
                    </tbody>
                </table>
                <br />
                {forgotLink && (
                    <a href={forgotLink}>
                        {translate(
                            "pages.register.forgot",
                            "Forgot your password?",
                        )}
                    </a>
                )}
                {registerLink ? (
                    <a href={registerLink}>
                        {translate(
                            "pages.register.signup",

                            "Register",
                        )}
                    </a>
                ) : (
                    <input type="submit" value="register" />
                )}
                {loginLink && (
                    <a href={loginLink}>
                        {translate("pages.register.login", "Login")}
                    </a>
                )}
            </form>
        </>
    );
};
