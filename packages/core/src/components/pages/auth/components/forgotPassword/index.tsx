import { useTranslate, useRouterContext, useForgotPassword } from "@hooks";
import React, { useState } from "react";
import { IAuthCommonProps, IForgotPasswordForm } from "../..";

export const ForgotPassword: React.FC<IAuthCommonProps> = ({
    backLink,
    submitButton,
}) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");

    const { mutate: forgotPassword } = useForgotPassword<IForgotPasswordForm>();

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
                    {submitButton ?? (
                        <input
                            type="submit"
                            value={translate(
                                "pages.forgotPassword.button",
                                "Reset Password",
                            )}
                        />
                    )}
                    {backLink &&
                        renderLink(
                            backLink,
                            translate(
                                "pages.forgotPassword.backLink",
                                "Go Back",
                            ),
                        )}
                </div>
            </form>
        </div>
    );
};
