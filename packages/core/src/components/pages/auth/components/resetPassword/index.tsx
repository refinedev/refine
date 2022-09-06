import { useTranslate, useRouterContext, useResetPassword } from "@hooks";
import React, { useState } from "react";
import { IAuthCommonProps, IResetPasswordForm } from "../..";

export const ResetPassword: React.FC<IAuthCommonProps> = ({
    backLink,
    submitButton,
}) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");

    const { mutate: resetPassword } = useResetPassword<IResetPasswordForm>();

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
                {translate("pages.resetPassword.title", "Forgot Password")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    resetPassword({ email });
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
                        {translate("pages.resetPassword.email", "Email")}
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
                                "pages.resetPassword.button",
                                "Reset Password",
                            )}
                        />
                    )}
                    {backLink &&
                        renderLink(
                            backLink,
                            translate(
                                "pages.resetPassword.backLink",
                                "Go Back",
                            ),
                        )}
                </div>
            </form>
        </div>
    );
};
