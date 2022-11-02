import React from "react";
import {
    useTranslate,
    useRouterContext,
    useForgotPassword,
    ForgotPasswordFormTypes,
    ForgotPasswordPageProps,
    BaseRecord,
    HttpError,
} from "@pankod/refine-core";
import {
    Box,
    BoxProps,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "@pankod/refine-react-hook-form";

import { layoutProps, cardProps } from "../styles";
import { FormPropsType } from "../..";

type ForgotPasswordProps = ForgotPasswordPageProps<
    BoxProps,
    BoxProps,
    FormPropsType<ForgotPasswordFormTypes>
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const { mutate } = useForgotPassword<ForgotPasswordFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
        ...useFormProps,
    });

    const allContentProps = { ...cardProps, ...contentProps };
    const content = (
        <Box bg="chakra-body-bg" {...allContentProps}>
            <Heading mb="8" textAlign="center" size="lg">
                {translate(
                    "pages.forgotPassword.title",
                    "Forgot your password?",
                )}
            </Heading>

            <form
                onSubmit={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }

                    return mutate(data);
                })}
            >
                <FormControl mb="3" isInvalid={!!errors?.email}>
                    <FormLabel>
                        {translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                    </FormLabel>
                    <Input
                        id="title"
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: translate(
                                    "pages.login.errors.validEmail",
                                    "Invalid email address",
                                ),
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.email?.message}`}
                    </FormErrorMessage>
                </FormControl>

                {loginLink ?? (
                    <Box mb="3" display="flex" justifyContent="flex-end">
                        <span>
                            {translate(
                                "pages.register.buttons.haveAccount",
                                "Have an account?",
                            )}
                        </span>
                        <ChakraLink color="green" ml="1" as={Link} to="/login">
                            {translate("pages.login.signin", "Sign in")}
                        </ChakraLink>
                    </Box>
                )}

                <Button mb="3" type="submit" width="full" colorScheme="green">
                    {translate(
                        "pages.forgotPassword.buttons.submit",
                        "Send reset instructions",
                    )}
                </Button>
            </form>
        </Box>
    );

    const allWrapperProps = { ...layoutProps, ...wrapperProps };
    return (
        <Box {...allWrapperProps}>
            {renderContent ? renderContent(content) : content}
        </Box>
    );
};
