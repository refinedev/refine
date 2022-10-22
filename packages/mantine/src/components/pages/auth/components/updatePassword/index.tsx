import React from "react";
import {
    UpdatePasswordPageProps,
    UpdatePasswordFormTypes,
} from "@pankod/refine-core";
import { useUpdatePassword, useTranslate } from "@pankod/refine-core";
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

import { FormContext } from "@contexts/form-context";
import { layoutStyles, cardStyles, titleStyles } from "../styles";
import { FormPropsType } from "../..";

type UpdatePassworProps = UpdatePasswordPageProps<
    BoxProps,
    CardProps,
    FormPropsType
>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePassworProps> = ({
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const { useForm, FormProvider } = FormContext;
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validate: {
            password: (value: any) => value === "",
            confirmPassword: (value: any, values: any) =>
                value !== values.password
                    ? translate(
                          "pages.updatePassword.errors.confirmPasswordNotMatch",
                          "Passwords do not match",
                      )
                    : null,
        },
        ...useFormProps,
    });
    const { getInputProps, onSubmit } = form;

    const { mutate: updatePassword, isLoading } =
        useUpdatePassword<UpdatePasswordFormTypes>();

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title style={titleStyles}>
                {translate("pages.updatePassword.title", "Set New Password")}
            </Title>
            <Space h="lg" />
            <FormProvider form={form}>
                <form
                    onSubmit={onSubmit((values: any) => {
                        if (onSubmitProp) {
                            return onSubmitProp(values);
                        }
                        return updatePassword(values);
                    })}
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
                        {translate(
                            "pages.updatePassword.buttons.submit",
                            "Update",
                        )}
                    </Button>
                </form>
            </FormProvider>
        </Card>
    );

    return (
        <Box style={layoutStyles} {...(wrapperProps ?? {})}>
            {renderContent ? renderContent(CardContent) : CardContent}
        </Box>
    );
};
