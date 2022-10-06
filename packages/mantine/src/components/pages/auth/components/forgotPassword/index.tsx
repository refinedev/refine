import React from "react";
import {
    ForgotPasswordPageProps,
    ForgotPasswordFormTypes,
} from "@pankod/refine-core";
import { useLogin, useTranslate, useRouterContext } from "@pankod/refine-core";
import {
    Box,
    Card,
    Space,
    TextInput,
    Title,
    Anchor,
    Button,
    Text,
    BoxProps,
    CardProps,
    Group,
} from "@mantine/core";

import { useForm } from "@hooks/form";
import { layoutStyles, cardStyles, titleStyles } from "../styles";
import { FormPropsType } from "../..";

type ResetPassworProps = ForgotPasswordPageProps<
    BoxProps,
    CardProps,
    FormPropsType
>;

/**
 * The forgotPassword type is a page that allows users to reset their passwords. You can use this page to reset your password.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ResetPassworProps> = ({
    loginLink,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { getInputProps, onSubmit } = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value: any) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : translate(
                          "pages.resetPassword.errors.validEmail",
                          "Invalid email address",
                      ),
        },
        ...useFormProps,
    });

    const { mutate: forgotPassword, isLoading } =
        useLogin<ForgotPasswordFormTypes>();

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title style={titleStyles}>
                {translate(
                    "pages.resetPassword.title",
                    "Forgot your password?",
                )}
            </Title>
            <Space h="lg" />
            <form
                onSubmit={onSubmit((values) => {
                    if (onSubmitProp) {
                        return onSubmitProp(values);
                    }
                    return forgotPassword(values);
                })}
                {...formProps}
            >
                <TextInput
                    label={translate(
                        "pages.resetPassword.fields.email",
                        "Email",
                    )}
                    placeholder={translate(
                        "pages.resetPassword.fields.email",
                        "Email",
                    )}
                    {...getInputProps("email")}
                />

                {loginLink ?? (
                    <Group mt="md" position={loginLink ? "left" : "right"}>
                        <Text size="xs">
                            {translate(
                                "pages.login.resetPassword.haveAccount",
                                "Have an account? ",
                            )}{" "}
                            <Anchor component={Link} to="/login" weight={700}>
                                {translate(
                                    "pages.resetPassword.signin",
                                    "Sign in",
                                )}
                            </Anchor>
                        </Text>
                    </Group>
                )}
                <Button
                    mt="lg"
                    fullWidth
                    size="md"
                    type="submit"
                    loading={isLoading}
                >
                    {translate(
                        "pages.resetPassword.buttons.submit",
                        "Send reset instructions",
                    )}
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
