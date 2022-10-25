import React, { useState } from "react";
import {
    useTranslate,
    useUpdatePassword,
    UpdatePasswordFormTypes,
    UpdatePasswordPageProps,
} from "@pankod/refine-core";
import { Box, BoxProps } from "@chakra-ui/react";

import { FormPropsType } from "../..";

type UpdatePasswordProps = UpdatePasswordPageProps<
    BoxProps,
    BoxProps,
    FormPropsType
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const translate = useTranslate();

    const { mutate: updatePassword, isLoading } =
        useUpdatePassword<UpdatePasswordFormTypes>();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const content = (
        <Box {...contentProps}>
            <h1 style={{ textAlign: "center" }}>
                {translate("pages.updatePassword.title", "Update Password")}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updatePassword({
                        password: newPassword,
                        confirmPassword,
                    });
                }}
                {...formProps}
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
                            "pages.updatePassword.fields.password",
                            "New Password",
                        )}
                    </label>
                    <input
                        name="password"
                        type="password"
                        required
                        size={20}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label>
                        {translate(
                            "pages.updatePassword.fields.confirmPassword",
                            "Confirm New Password",
                        )}
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        size={20}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        type="submit"
                        disabled={isLoading}
                        value={translate(
                            "pages.updatePassword.buttons.submit",
                            "Update",
                        )}
                    />
                </div>
            </form>
        </Box>
    );

    return (
        <Box {...wrapperProps}>
            {renderContent ? renderContent(content) : content}
        </Box>
    );
};
