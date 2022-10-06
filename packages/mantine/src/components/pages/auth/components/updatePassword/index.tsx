import React from "react";
import {
    UpdatePasswordPageProps,
    UpdatePasswordFormTypes,
} from "@pankod/refine-core";
import { useLogin, useTranslate } from "@pankod/refine-core";
import {
    Box,
    Card,
    Space,
    TextInput,
    Title,
    Button,
    BoxProps,
    CardProps,
} from "@mantine/core";

import { useForm } from "@hooks/form";
import { layoutStyles, cardStyles, titleStyles } from "../styles";

type UpdatePassworProps = UpdatePasswordPageProps<
    BoxProps,
    CardProps,
    React.DetailedHTMLProps<
        React.FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    >
>;

/**
 * **refine** has update password page form which is served on `/update-password` route when the `authProvider` configuration is provided.
 *
 */
export const UpdatePasswordPage: React.FC<UpdatePassworProps> = ({
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const translate = useTranslate();

    const { getInputProps, onSubmit } = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: {
            confirmPassword: (value, values) =>
                value !== values.password
                    ? translate(
                          "pages.updatePassword.errors.confirmPasswordNotMatch",
                          "Passwords do not match",
                      )
                    : null,
        },
    });

    const { mutate: updatePassword, isLoading } =
        useLogin<UpdatePasswordFormTypes>();

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title style={titleStyles}>
                {translate("pages.updatePassword.title", "Set New Password")}
            </Title>
            <Space h="lg" />
            <form
                onSubmit={onSubmit((values) => updatePassword(values))}
                {...formProps}
            >
                <TextInput
                    type="password"
                    label={translate(
                        "pages.updatePassword.fields.password",
                        "New Password",
                    )}
                    placeholder="●●●●●●●●"
                    {...getInputProps("password")}
                />
                <TextInput
                    mt="md"
                    type="password"
                    label={translate(
                        "pages.updatePassword.fields.confirmPassword",
                        "Confirm New Password",
                    )}
                    placeholder="●●●●●●●●"
                    {...getInputProps("confirmPassword")}
                />
                <Button
                    mt="lg"
                    fullWidth
                    size="md"
                    type="submit"
                    loading={isLoading}
                >
                    {translate("pages.updatePassword.buttons.submit", "Update")}
                </Button>
            </form>
        </Card>
    );

    return (
        <Box style={layoutStyles} {...(wrapperProps ?? {})}>
            {renderContent ? renderContent(CardContent) : CardContent}
        </Box>
    );
};
