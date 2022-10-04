import React, { useState } from "react";
import { RefineUpdatePasswordPageProps } from "@pankod/refine-ui-types";

import { useTranslate, useRouterContext, useUpdatePassword } from "@hooks";

import { DivPropsType, FormPropsType } from "../..";
type UpdatePasswordProps = RefineUpdatePasswordPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = () => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { mutate: updatePassword } = useUpdatePassword();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                {translate("pages.updatePassword.title", "Update Password")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newPassword === confirmPassword) {
                        updatePassword({
                            newPassword,
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
                        {translate(
                            "pages.updatePassword.newPassword",
                            "New Password",
                        )}
                    </label>
                    <input
                        type="password"
                        required
                        size={20}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label>
                        {translate(
                            "pages.updatePassword.confirmNewPassword",
                            "Confirm New Password",
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
        </div>
    );
};
