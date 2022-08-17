import { useTranslate, useRouterContext, useResetPassword } from "@hooks";
import React, { useState } from "react";
import { IAuthCommonProps, IResetPasswordForm } from "../..";

export const ResetPassword: React.FC<IAuthCommonProps> = ({ backLink }) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");

    const { mutate: resetPassword } = useResetPassword<IResetPasswordForm>();

    const renderLink = (link: React.ReactNode, text?: string) => {
        if (link) {
            if (typeof link === "string") {
                return <Link to={link}>{text}</Link>;
            } else return link;
        }
        return null;
    };
    return (
        <div>
            <h1>{translate("pages.forgot.title", "Forgot Password")}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    resetPassword({ email });
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>{translate("pages.forgot.email", "Email")}:</td>
                            <td>
                                <input
                                    type="mail"
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
                    </tbody>
                </table>
                <br />
                {backLink &&
                    renderLink(
                        backLink,
                        translate("pages.forgot.back", "Back"),
                    )}
                <input type="submit" value="Reset Password" />
            </form>
        </div>
    );
};
