import React, { useState } from "react";
import { RefineRegisterPageProps } from "@pankod/refine-ui-types";

import { useTranslate, useRouterContext, useRegister } from "@hooks";

import { DivPropsType, FormPropsType } from "../..";
type RegisterProps = RefineRegisterPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

export const RegisterPage: React.FC<RegisterProps> = () => {
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const translate = useTranslate();

    const { mutate: register } = useRegister();

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
                </div>
            </form>
        </>
    );
};
