import React from "react";
import { RegisterPageProps, RegisterFormTypes } from "@pankod/refine-core";
import {
    useTranslate,
    useRouterContext,
    useRegister,
} from "@pankod/refine-core";
import {
    Box,
    Card,
    PasswordInput,
    Space,
    TextInput,
    Title,
    Anchor,
    Button,
    Text,
    BoxProps,
    CardProps,
    Group,
    Stack,
    Divider,
} from "@mantine/core";

import { FormContext } from "@contexts/form-context";
import { layoutStyles, cardStyles, titleStyles } from "../styles";
import { FormPropsType } from "../..";

type RegisterProps = RegisterPageProps<BoxProps, CardProps, FormPropsType>;

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
    const { useForm, FormProvider } = FormContext;
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value: any) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : translate(
                          "pages.register.errors.validEmail",
                          "Invalid email address",
                      ),
            password: (value: any) => value === "",
        },
        ...useFormProps,
    });
    const { onSubmit, getInputProps } = form;

    const { mutate: register, isLoading } = useRegister<RegisterFormTypes>();

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
                {translate("pages.register.title", "Sign up for your account")}
            </Title>
            <Space h="lg" />
            {renderProviders()}
            <FormProvider form={form}>
                <form
                    onSubmit={onSubmit((values: any) => {
                        if (onSubmitProp) {
                            return onSubmitProp(values);
                        }
                        return register(values);
                    })}
                >
                    <TextInput
                        label={translate(
                            "pages.register.fields.email",
                            "Email",
                        )}
                        placeholder={translate(
                            "pages.register.fields.email",
                            "Email",
                        )}
                        {...getInputProps("email")}
                    />
                    <PasswordInput
                        mt="md"
                        label={translate(
                            "pages.register.fields.password",
                            "Password",
                        )}
                        placeholder="●●●●●●●●"
                        {...getInputProps("password")}
                    />
                    {loginLink ?? (
                        <Group mt="md" position={loginLink ? "left" : "right"}>
                            <Text size="xs">
                                {translate(
                                    "pages.register.buttons.haveAccount",
                                    "Have an account?",
                                )}{" "}
                                <Anchor
                                    component={Link}
                                    to="/login"
                                    weight={700}
                                >
                                    {translate(
                                        "pages.register.signin",
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
                        {translate("pages.register.buttons.submit", "Sign up")}
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
