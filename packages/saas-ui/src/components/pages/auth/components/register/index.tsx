import React from "react";
import { RegisterPageProps, RegisterFormTypes } from "@pankod/refine-core";
import {
    useTranslate,
    useRouterContext,
    useRegister,
} from "@pankod/refine-core";
import {
    Box,
    Spacer,
    Heading,
    Link,
    Button,
    Text,
    BoxProps,
    HStack,
    Stack,
} from "@chakra-ui/react";

import {
    Card,
    CardProps,
    Divider,
    Form,
    FormLayout,
    Field,
    FormProps,
    SubmitHandler,
    SubmitButton,
} from "@saas-ui/react";

import { layoutStyles, cardStyles, titleStyles } from "../styles";

type RegisterProps = RegisterPageProps<BoxProps, CardProps, FormProps>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
    loginLink,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
    providers,
}) => {
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const { Link: RouterLink } = useRouterContext();

    const { mutateAsync: register } = useRegister<RegisterFormTypes>();

    const onSubmit: SubmitHandler<any> = (values) => {
        onSubmitProp?.(values);
        register(values);
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
                                        register({
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
                {translate("pages.register.title", "Sign up for your account")}
            </Heading>
            <Spacer h="lg" />
            {renderProviders()}

            <Form
                defaultValues={{ email: "", password: "" }}
                onSubmit={onSubmit((values: any) => {
                    if (onSubmitProp) {
                        return onSubmitProp(values);
                    }
                    return register(values);
                })}
                {...useFormProps}
            >
                <FormLayout>
                    <Field
                        name="email"
                        type="email"
                        label={translate(
                            "pages.register.fields.email",
                            "Email",
                        )}
                        placeholder={translate(
                            "pages.register.fields.email",
                            "Email",
                        )}
                        rules={{
                            required: translate(
                                "pages.register.errors.validEmail",
                                "Invalid email address",
                            ),
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: translate(
                                    "pages.register.errors.validEmail",
                                    "Invalid email address",
                                ),
                            },
                        }}
                    />
                    <Field
                        name="password"
                        type="password"
                        label={translate(
                            "pages.register.fields.password",
                            "Password",
                        )}
                        placeholder="●●●●●●●●"
                    />
                    {loginLink ?? (
                        <HStack
                            mt="md"
                            alignItems={loginLink ? "start" : "end"}
                        >
                            <Text size="xs">
                                {translate(
                                    "pages.register.buttons.haveAccount",
                                    "Have an account?",
                                )}{" "}
                                <Link as={RouterLink} to="/login" weight={700}>
                                    {translate(
                                        "pages.register.signin",
                                        "Sign in",
                                    )}
                                </Link>
                            </Text>
                        </HStack>
                    )}
                    <SubmitButton mt="lg" width="full" size="md">
                        {translate("pages.register.buttons.submit", "Sign up")}
                    </SubmitButton>
                </FormLayout>
            </Form>
        </Card>
    );

    return (
        <Box style={layoutStyles} {...(wrapperProps ?? {})}>
            {renderContent ? renderContent(CardContent) : CardContent}
        </Box>
    );
};
