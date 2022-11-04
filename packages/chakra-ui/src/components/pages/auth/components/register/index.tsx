import React from "react";
import {
    useTranslate,
    useRouterContext,
    useRegister,
    RegisterPageProps,
    RegisterFormTypes,
    BaseRecord,
    HttpError,
} from "@pankod/refine-core";
import {
    Box,
    BoxProps,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "@pankod/refine-react-hook-form";

import { layoutProps, cardProps } from "../styles";
import { FormPropsType } from "../..";

type RegisterProps = RegisterPageProps<
    BoxProps,
    BoxProps,
    FormPropsType<RegisterFormTypes>
>;

export const RegisterPage: React.FC<RegisterProps> = ({
    providers,
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};

    const { Link } = useRouterContext();
    const translate = useTranslate();
    const { mutate } = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
        ...useFormProps,
    });

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
                                    mutate({
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
                {translate("pages.register.title", "Sign up for your account")}
            </Heading>
            {renderProviders()}
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
                        {translate("pages.register.fields.email", "Email")}
                    </FormLabel>
                    <Input
                        id="title"
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: translate(
                                    "pages.register.errors.validEmail",
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
                        {translate(
                            "pages.register.fields.password",
                            "Password",
                        )}
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

                {loginLink ?? (
                    <Box display="flex" justifyContent="flex-end" mb="3">
                        <span>
                            {translate(
                                "pages.login.buttons.haveAccount",
                                "Have an account?",
                            )}
                        </span>
                        <ChakraLink color="green" ml="1" as={Link} to="/login">
                            {translate("pages.login.signin", "Sign in")}
                        </ChakraLink>
                    </Box>
                )}

                <Button mb="3" type="submit" width="full" colorScheme="green">
                    {translate("pages.register.buttons.submit", "Sign up")}
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
