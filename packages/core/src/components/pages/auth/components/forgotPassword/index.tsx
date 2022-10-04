import React, { useState } from "react";
import { RefineLoginPageProps } from "@pankod/refine-ui-types";

import { useTranslate, useRouterContext, useForgotPassword } from "@hooks";

import { DivPropsType, FormPropsType } from "../..";
type ForgotPasswordProps = RefineLoginPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = () => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");

    const { mutate: forgotPassword } = useForgotPassword();

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
        <div>
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.forgotPassword.title", "Forgot Password")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    forgotPassword({ email });
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
                        {translate("pages.forgotPassword.email", "Email")}
                    </label>
                    <input
                        type="mail"
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                </div>
            </form>
        </div>
    );
};
