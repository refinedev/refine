import React, { useState } from "react";

import { useTranslate, useRouterContext } from "@hooks";
import { IAuthCommonProps } from "../..";

export const UpdatePassword: React.FC<IAuthCommonProps> = ({ backLink }) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

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
                {translate("pages.update.title", "Update Password")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password && newpPassword === confirmPassword) {
                        //TO DO: add update password logic
                        console.log(password, newpPassword, confirmPassword);
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
                        {translate("pages.update.password", "Password")}:
                    </label>
                    <input
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {translate("pages.update.newPassword", "New Password")}
                    :
                    <input
                        type="password"
                        required
                        size={20}
                        value={newpPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {translate(
                        "pages.update.confirmNewPassword",
                        "Confirm New Password",
                    )}
                    :
                    <input
                        type="password"
                        required
                        size={20}
                        value={password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    <input
                        type="submit"
                        value={translate(
                            "pages.update.button",
                            "Update Password",
                        )}
                    />
                    {backLink &&
                        renderLink(
                            backLink,
                            translate("pages.forgot.back", "Back"),
                        )}
                </div>
            </form>
        </div>
    );
};
