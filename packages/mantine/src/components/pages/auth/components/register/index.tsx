import React from "react";
import { RegisterPageProps, RegisterFormTypes } from "@pankod/refine-core";
import { useLogin, useTranslate, useRouterContext } from "@pankod/refine-core";
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
} from "@mantine/core";

import { useForm } from "@hooks/form";
import { layoutStyles, cardStyles, titleStyles } from "../styles";

type RegisterProps = RegisterPageProps<
    BoxProps,
    CardProps,
    React.DetailedHTMLProps<
        React.FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    >
>;

/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 */
export const RegisterPage: React.FC<RegisterProps> = ({
    loginLink,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const { getInputProps, onSubmit } = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value)
                    ? null
                    : translate(
                          "pages.register.errors.validEmail",
                          "Invalid email address",
                      ),
            password: (value) => value === "",
        },
    });

    const { mutate: register, isLoading } = useLogin<RegisterFormTypes>();

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Title style={titleStyles}>
                {translate("pages.register.title", "Sign up for your account")}
            </Title>
            <Space h="lg" />
            <form
                onSubmit={onSubmit((values) => register(values))}
                {...formProps}
            >
                <TextInput
                    label={translate("pages.register.fields.email", "Email")}
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
                                "Have an account? ",
                            )}{" "}
                            <Anchor component={Link} to="/login" weight={700}>
                                {translate("pages.register.signin", "Sign in")}
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
        </Card>
    );

    return (
        <Box style={layoutStyles} {...(wrapperProps ?? {})}>
            {renderContent ? renderContent(CardContent) : CardContent}
        </Box>
    );
};
