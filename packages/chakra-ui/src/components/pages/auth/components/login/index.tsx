import React from "react";
import {
    LoginPageProps,
    LoginFormTypes,
    useRouterContext,
    useLogin,
    useTranslate,
    BaseRecord,
    HttpError,
} from "@pankod/refine-core";
import {
    Box,
    Heading,
    BoxProps,
    VStack,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Link as ChakraLink,
    FormErrorMessage,
    HStack,
    Checkbox,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "@pankod/refine-react-hook-form";

import { layoutProps, cardProps } from "../styles";
import { FormPropsType } from "../..";

type LoginProps = LoginPageProps<
    BoxProps,
    BoxProps,
    FormPropsType<LoginFormTypes>
>;

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
    const { onSubmit, ...useFormProps } = formProps || {};

    const translate = useTranslate();
    const { mutate: login } = useLogin<LoginFormTypes>();
    const { Link } = useRouterContext();
    const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
        ...useFormProps,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    <VStack>
                        {providers.map((provider) => (
                            <Button
                                key={provider.name}
                                colorScheme="green"
                                width="full"
                                leftIcon={<>{provider?.icon}</>}
                                onClick={() =>
                                    login({
                                        providerName: provider.name,
                                    })
                                }
                            >
                                {provider.label ?? (
                                    <label>{provider.label}</label>
                                )}
                            </Button>
                        ))}
                    </VStack>
                    <Divider my="6" />
                </>
            );
        }
        return null;
    };

    const allContentProps = { ...cardProps, ...contentProps };
    const content = (
        <Box bg="chakra-body-bg" {...allContentProps}>
            <Heading mb="8" textAlign="center" size="lg">
                {translate("pages.login.title", "Sign in to your account")}
            </Heading>
            {renderProviders()}
            <form
                onSubmit={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }

                    return login(data);
                })}
            >
                <FormControl mb="3" isInvalid={!!errors?.email}>
                    <FormLabel>
                        {translate("pages.login.fields.email", "Email")}
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

                <FormControl mb="3" isInvalid={!!errors?.password}>
                    <FormLabel>
                        {translate("pages.login.fields.password", "Password")}
                    </FormLabel>
                    <Input
                        id="title"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.password?.message}`}
                    </FormErrorMessage>
                </FormControl>

                <Box mb="3">
                    <HStack justifyContent="space-between">
                        {rememberMe ?? (
                            <Box>
                                <Checkbox {...register("remember")}>
                                    {translate(
                                        "pages.login.buttons.rememberMe",
                                        "Remember me",
                                    )}
                                </Checkbox>
                            </Box>
                        )}
                        {forgotPasswordLink ?? (
                            <ChakraLink
                                as={Link}
                                color="green"
                                to="/forgot-password"
                            >
                                {translate(
                                    "pages.login.buttons.forgotPassword",
                                    "Forgot password?",
                                )}
                            </ChakraLink>
                        )}
                    </HStack>
                </Box>

                <Button mb="3" type="submit" width="full" colorScheme="green">
                    {translate("pages.login.signin", "Sign in")}
                </Button>

                {registerLink ?? (
                    <Box>
                        <span>
                            {translate(
                                "pages.login.buttons.noAccount",
                                "Don’t have an account?",
                            )}
                        </span>
                        <ChakraLink
                            color="green"
                            ml="1"
                            as={Link}
                            to="/register"
                        >
                            {translate("pages.login.register", "Sign up")}
                        </ChakraLink>
                    </Box>
                )}
            </form>
        </Box>
    );

    const allWrapperProps = { ...layoutProps, ...wrapperProps };
    return (
        <FormProvider {...methods}>
            <Box {...allWrapperProps}>
                {renderContent ? renderContent(content) : content}
            </Box>
        </FormProvider>
    );
};
