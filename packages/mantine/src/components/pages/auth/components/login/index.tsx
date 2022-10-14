import React from "react";
import { LoginPageProps, LoginFormTypes } from "@pankod/refine-core";
import { useLogin, useTranslate, useRouterContext } from "@pankod/refine-core";
import {
    Box,
    Card,
    Checkbox,
    PasswordInput,
    Space,
    TextInput,
    Title,
    Anchor,
    Button,
    Text,
    Divider,
    Stack,
    BoxProps,
    CardProps,
} from "@mantine/core";

import { FormContext } from "@contexts/form-context";
import { layoutStyles, cardStyles, titleStyles } from "../styles";
import { FormPropsType } from "../..";

type LoginProps = LoginPageProps<BoxProps, CardProps, FormPropsType>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
    providers,
    registerLink,
    forgotPasswordLink,
    rememberMe,
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
            password: "",
            remember: false,
        },
        validate: {
            email: (value: any) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : translate(
                          "pages.login.errors.validEmail",
                          "Invalid email address",
                      ),
            password: (value: any) => value === "",
        },
        ...useFormProps,
    });
    const { onSubmit, getInputProps } = form;

    const { mutate: login, isLoading } = useLogin<LoginFormTypes>();

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    <Stack spacing={8}>
                        {providers.map((provider) => {
                            return (
                                <Button
                                    key={provider.name}
                                    fullWidth
                                    leftIcon={provider.icon}
                                    onClick={() =>
                                        login({
                                            providerName: provider.name,
                                        })
                                    }
                                >
                                    {provider.label}
                                </Button>
                            );
                        })}
                    </Stack>
                    <Divider
                        my="md"
                        labelPosition="center"
                        label={translate("pages.login.divider", "or")}
                    />
                </>
            );
        }
        return null;
    };

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title style={titleStyles}>
                {translate("pages.login.title", "Sign in to your account")}
            </Title>
            <Space h="lg" />
            {renderProviders()}
            <FormProvider form={form}>
                <form
                    onSubmit={onSubmit((values: any) => {
                        if (onSubmitProp) {
                            return onSubmitProp(values);
                        }
                        return login(values);
                    })}
                >
                    <TextInput
                        name="email"
                        label={translate("pages.login.fields.email", "Email")}
                        placeholder={translate(
                            "pages.login.fields.email",
                            "Email",
                        )}
                        {...getInputProps("email")}
                    />
                    <PasswordInput
                        name="password"
                        mt="md"
                        label={translate(
                            "pages.login.fields.password",
                            "Password",
                        )}
                        placeholder="●●●●●●●●"
                        {...getInputProps("password")}
                    />
                    <Box
                        mt="md"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {rememberMe ?? (
                            <Checkbox
                                label={translate(
                                    "pages.login.buttons.rememberMe",
                                    "Remember me",
                                )}
                                size="xs"
                                {...getInputProps("remember", {
                                    type: "checkbox",
                                })}
                            />
                        )}
                        {forgotPasswordLink ?? (
                            <Anchor
                                component={Link}
                                to="/forgot-password"
                                size="xs"
                            >
                                {translate(
                                    "pages.login.buttons.forgotPassword",
                                    "Forgot password?",
                                )}
                            </Anchor>
                        )}
                    </Box>
                    <Button
                        mt="lg"
                        fullWidth
                        size="md"
                        type="submit"
                        loading={isLoading}
                    >
                        {translate("pages.login.signin", "Sign in")}
                    </Button>
                </form>
            </FormProvider>

            {registerLink ?? (
                <Text mt="xs" size="xs">
                    {translate(
                        "pages.login.buttons.noAccount",
                        "Don’t have an account?",
                    )}{" "}
                    <Anchor component={Link} to="/register" weight={700}>
                        {translate("pages.login.signup", "Sign up")}
                    </Anchor>
                </Text>
            )}
        </Card>
    );

    return (
        <Box style={layoutStyles} {...(wrapperProps ?? {})}>
            {renderContent ? renderContent(CardContent) : CardContent}
        </Box>
    );
};
