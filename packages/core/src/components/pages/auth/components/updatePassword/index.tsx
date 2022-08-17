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
            <h1>{translate("pages.update.title", "Update Password")}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (password && newpPassword === confirmPassword) {
                        console.log(password, newpPassword, confirmPassword);
                    }
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {translate("pages.update.password", "Password")}
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
                        <tr>
                            <td>
                                {translate(
                                    "pages.update.newPassword",
                                    "New Password",
                                )}
                                :
                            </td>
                            <td>
                                <input
                                    type="password"
                                    required
                                    size={20}
                                    value={newpPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {translate(
                                    "pages.update.confirmNewPassword",
                                    "Confirm New Password",
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
                                        setConfirmPassword(e.target.value)
                                    }
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

                <input
                    type="submit"
                    value={translate("pages.update.button", "Update Password")}
                />
            </form>
        </div>
    );
};
