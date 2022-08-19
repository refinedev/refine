import React, { useState } from "react";

import { useTranslate, useRouterContext, useUpdatePassword } from "@hooks";
import { IAuthCommonProps, IUpdatePasswordForm } from "../..";

export const UpdatePassword: React.FC<IAuthCommonProps> = ({
    backLink,
    updatePasswordLink,
}) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: updatePassword } = useUpdatePassword<IUpdatePasswordForm>();

    const [password, setPassword] = useState("");
    const [newpPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.updatePassword.title", "Update Password")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password && newpPassword === confirmPassword) {
                        //TODO: should updatePassword need email?
                        updatePassword({
                            password,
                            newPassword: newpPassword,
                        });
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
                        {translate("pages.updatePassword.password", "Password")}
                    </label>
                    <input
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {translate(
                        "pages.updatePassword.newPassword",
                        "New Password",
                    )}
                    <input
                        type="password"
                        required
                        size={20}
                        value={newpPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {translate(
                        "pages.updatePassword.confirmNewPassword",
                        "Confirm New Password",
                    )}

                    <input
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    {updatePasswordLink ? (
                        renderLink(
                            updatePasswordLink,
                            translate(
                                "pages.updatePassword.button",
                                "Reset Password",
                            ),
                        )
                    ) : (
                        <input
                            type="submit"
                            value={translate(
                                "pages.updatePassword.button",
                                "Update Password",
                            )}
                        />
                    )}

                    {backLink &&
                        renderLink(
                            backLink,
                            translate("pages.updatePassword.backLink", "Back"),
                        )}
                </div>
            </form>
        </div>
    );
};
