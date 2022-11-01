import React from "react";
import { LoginPageProps, LoginFormTypes } from "@pankod/refine-core";
import { useLogin, useTranslate, useRouterContext } from "@pankod/refine-core";
import {
    Box,
    Spacer,
    Heading,
    Link,
    Button,
    Text,
    Stack,
    BoxProps,
} from "@chakra-ui/react";

import {
    Card,
    CardProps,
    Divider,
    Form,
    Field,
    FormLayout,
    FormProps,
    SubmitButton,
    SubmitHandler,
} from "@saas-ui/react";

import { layoutStyles, cardStyles, titleStyles } from "../styles";

type LoginProps = LoginPageProps<BoxProps, CardProps, FormProps>;

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
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const { Link: RouterLink } = useRouterContext();

    const { mutateAsync: login } = useLogin<LoginFormTypes>();

    const onSubmit: SubmitHandler<any> = (values) => {
        if (onSubmitProp) {
            return onSubmitProp(values);
        }
        return login(values);
    };

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    <Stack spacing={8}>
                        {providers.map((provider) => {
                            return (
                                <Button
                                    key={provider.name}
                                    width="full"
                                    leftIcon={
                                        provider.icon as React.ReactElement
                                    }
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
                        label={translate("pages.login.divider", "or")}
                    />
                </>
            );
        }
        return null;
    };

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Heading style={titleStyles}>
                {translate("pages.login.title", "Sign in to your account")}
            </Heading>
            <Spacer h="lg" />
            {renderProviders()}

            <Form
                defaultValues={{
                    email: "",
                    password: "",
                    remember: false,
                }}
                onSubmit={onSubmit}
                {...useFormProps}
            >
                <FormLayout>
                    <Field
                        name="email"
                        label={translate("pages.login.fields.email", "Email")}
                        placeholder={translate(
                            "pages.login.fields.email",
                            "Email",
                        )}
                        rules={{
                            required: "Please enter your email address",
                            pattern: {
                                value: /^\S+@\S+$/,
                                message: translate(
                                    "pages.login.errors.validEmail",
                                    "Invalid email address",
                                ),
                            },
                        }}
                    />
                    <Field
                        name="password"
                        type="password"
                        label={translate(
                            "pages.login.fields.password",
                            "Password",
                        )}
                        placeholder="●●●●●●●●"
                        rules={{ required: "Please enter your password" }}
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
                            <Field
                                name="remember"
                                type="checkbox"
                                label={translate(
                                    "pages.login.buttons.rememberMe",
                                    "Remember me",
                                )}
                                size="xs"
                            />
                        )}
                        {forgotPasswordLink ?? (
                            <Link
                                as={RouterLink}
                                to="/forgot-password"
                                size="xs"
                            >
                                {translate(
                                    "pages.login.buttons.forgotPassword",
                                    "Forgot password?",
                                )}
                            </Link>
                        )}
                    </Box>
                    <SubmitButton width="full" size="md">
                        {translate("pages.login.signin", "Sign in")}
                    </SubmitButton>
                </FormLayout>
            </Form>

            {registerLink ?? (
                <Text mt="xs" size="xs">
                    {translate(
                        "pages.login.buttons.noAccount",
                        "Don’t have an account?",
                    )}{" "}
                    <Link as={RouterLink} to="/register" weight={700}>
                        {translate("pages.login.signup", "Sign up")}
                    </Link>
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
