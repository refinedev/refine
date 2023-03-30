import React from "react";
import {
    UpdatePasswordPageProps,
    UpdatePasswordFormTypes,
    useActiveAuthProvider,
} from "@refinedev/core";
import { useUpdatePassword, useTranslate } from "@refinedev/core";
import {
    Box,
    Card,
    Space,
    TextInput,
    Title,
    Button,
    BoxProps,
    CardProps,
    useMantineTheme,
} from "@mantine/core";

import { FormContext } from "@contexts/form-context";
import {
    layoutStyles,
    cardStyles,
    titleStyles,
    pageTitleStyles,
} from "../styles";
import { FormPropsType } from "../..";
import { ThemedTitle } from "@components";

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
    title,
}) => {
    const theme = useMantineTheme();
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

    const authProvider = useActiveAuthProvider();
    const { mutate: updatePassword, isLoading } =
        useUpdatePassword<UpdatePasswordFormTypes>({
            v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
        });

    const PageTitle =
        title === false ? null : (
            <div style={pageTitleStyles}>
                {title ?? <ThemedTitle collapsed={false} />}
            </div>
        );

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title
                style={titleStyles}
                color={theme.colorScheme === "dark" ? "brand.5" : "brand.8"}
            >
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
            {renderContent ? (
                renderContent(CardContent, PageTitle)
            ) : (
                <>
                    {PageTitle}
                    {CardContent}
                </>
            )}
        </Box>
    );
};
