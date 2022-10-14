import React from "react";
import {
    ForgotPasswordPageProps,
    ForgotPasswordFormTypes,
} from "@pankod/refine-core";
import {
    useTranslate,
    useRouterContext,
    useForgotPassword,
} from "@pankod/refine-core";
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

import { FormContext } from "@contexts/form-context";
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
    const { useForm, FormProvider } = FormContext;
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value: any) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : translate(
                          "pages.forgotPassword.errors.validEmail",
                          "Invalid email address",
                      ),
        },
        ...useFormProps,
    });
    const { getInputProps, onSubmit } = form;

    const { mutate: forgotPassword, isLoading } =
        useForgotPassword<ForgotPasswordFormTypes>();

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title style={titleStyles}>
                {translate(
                    "pages.forgotPassword.title",
                    "Forgot your password?",
                )}
            </Title>
            <Space h="lg" />
            <FormProvider form={form}>
                <form
                    onSubmit={onSubmit((values: any) => {
                        if (onSubmitProp) {
                            return onSubmitProp(values);
                        }
                        return forgotPassword(values);
                    })}
                >
                    <TextInput
                        label={translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                        placeholder={translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                        {...getInputProps("email")}
                    />

                    {loginLink ?? (
                        <Group mt="md" position={loginLink ? "left" : "right"}>
                            <Text size="xs">
                                {translate(
                                    "pages.login.forgotPassword.haveAccount",
                                    "Have an account?",
                                )}{" "}
                                <Anchor
                                    component={Link}
                                    to="/login"
                                    weight={700}
                                >
                                    {translate(
                                        "pages.forgotPassword.signin",
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
                            "pages.forgotPassword.buttons.submit",
                            "Send reset instructions",
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
