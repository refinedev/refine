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
    Spacer,
    Heading,
    Link,
    Button,
    Text,
    BoxProps,
    HStack,
} from "@chakra-ui/react";

import {
    Card,
    CardProps,
    Form,
    FormLayout,
    Field,
    FormProps,
    SubmitHandler,
    SubmitButton,
} from "@saas-ui/react";

import { layoutStyles, cardStyles, titleStyles } from "../styles";
import { FormPropsType } from "../..";

type ResetPassworProps = ForgotPasswordPageProps<
    BoxProps,
    CardProps,
    FormProps
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
    const { Link: RouterLink } = useRouterContext();

    const { mutateAsync: forgotPassword } =
        useForgotPassword<ForgotPasswordFormTypes>();

    const onSubmit: SubmitHandler<any> = (values) => {
        if (onSubmitProp) {
            return onSubmitProp(values);
        }
        return forgotPassword(values);
    };

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Heading style={titleStyles}>
                {translate(
                    "pages.forgotPassword.title",
                    "Forgot your password?",
                )}
            </Heading>
            <Spacer h="lg" />

            <Form
                defaultValues={{ email: "" }}
                {...useFormProps}
                onSubmit={onSubmit}
            >
                <FormLayout>
                    <Field
                        name="email"
                        type="email"
                        label={translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                        placeholder={translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                        rules={{
                            required: translate(
                                "pages.forgotPassword.errors.validEmail",
                                "Invalid email address",
                            ),
                            pattern: {
                                value: /^\S+@\S+$/,
                                message: translate(
                                    "pages.forgotPassword.errors.validEmail",
                                    "Invalid email address",
                                ),
                            },
                        }}
                    />

                    {loginLink ?? (
                        <HStack
                            mt="md"
                            alignItems={loginLink ? "left" : "right"}
                        >
                            <Text size="xs">
                                {translate(
                                    "pages.login.forgotPassword.haveAccount",
                                    "Have an account?",
                                )}{" "}
                                <Link as={RouterLink} to="/login" weight={700}>
                                    {translate(
                                        "pages.forgotPassword.signin",
                                        "Sign in",
                                    )}
                                </Link>
                            </Text>
                        </HStack>
                    )}
                    <SubmitButton mt="lg" width="full" size="md">
                        {translate(
                            "pages.forgotPassword.buttons.submit",
                            "Send reset instructions",
                        )}
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
