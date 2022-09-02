import { useTranslate, useRouterContext, useRegister } from "@hooks";
import React, { useState } from "react";
import { IAuthCommonProps, IRegisterForm } from "../..";

export const Register: React.FC<IAuthCommonProps> = ({
    submitButton,
    backLink,
    loginLink,
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
            }
            return link;
        }
        return null;
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.register.title", "Register")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password === confirmPassword) {
                        register({ email, password });
                    }
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
                        {translate("pages.register.email", undefined, "Email")}
                    </label>
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
                    <label>
                        {translate(
                            "pages.register.password",
                            undefined,
                            "Password",
                        )}
                    </label>
                    <input
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>
                        {translate(
                            "pages.register.confirmPassword",
                            undefined,
                            "Confirm Password",
                        )}
                    </label>
                    <input
                        type="password"
                        required
                        size={20}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    {submitButton ?? (
                        <input
                            type="submit"
                            value={translate(
                                "pages.register.button",
                                "Register",
                            )}
                        />
                    )}
                    <br />
                    {loginLink &&
                        renderLink(
                            loginLink,
                            translate(
                                "pages.register.loginLink",
                                "Go to Login",
                            ),
                        )}
                    {backLink &&
                        renderLink(
                            backLink,
                            translate("pages.register.backLink", "Go Back"),
                        )}
                </div>
            </form>
        </>
    );
};
