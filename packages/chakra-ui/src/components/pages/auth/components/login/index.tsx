import React from "react";
import {
    LoginPageProps,
    LoginFormTypes,
    useRouterType,
    useLink,
    useRouterContext,
    useLogin,
    useTranslate,
    BaseRecord,
    HttpError,
    useActiveAuthProvider,
} from "@refinedev/core";
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
    useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";

import { layoutProps, cardProps } from "../styles";
import { FormPropsType } from "../..";
import { ThemedTitle } from "@components";

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
    title,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};

    const authProvider = useActiveAuthProvider();
    const { mutate: login } = useLogin<LoginFormTypes>({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const translate = useTranslate();
    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const Link = routerType === "legacy" ? LegacyLink : NewLink;
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
                                variant="outline"
                                width="full"
                                leftIcon={<>{provider?.icon}</>}
                                fontSize="sm"
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

    const importantTextColor = useColorModeValue("brand.500", "brand.200");

    const PageTitle =
        title === false ? null : (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "32px",
                    fontSize: "20px",
                }}
            >
                {title ?? <ThemedTitle collapsed={false} />}
            </div>
        );

    const allContentProps = { ...cardProps, ...contentProps };
    const content = (
        <Box
            bg="chakra-body-bg"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            backgroundColor={useColorModeValue("white", "gray.800")}
            {...allContentProps}
        >
            <Heading
                mb="8"
                textAlign="center"
                fontSize="2xl"
                color={importantTextColor}
            >
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
                <FormControl mt="6" isInvalid={!!errors?.email}>
                    <FormLabel htmlFor="email">
                        {translate("pages.login.fields.email", "Email")}
                    </FormLabel>
                    <Input
                        id="email"
                        placeholder="Email"
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

                <FormControl mt="6" isInvalid={!!errors?.password}>
                    <FormLabel htmlFor="password">
                        {translate("pages.login.fields.password", "Password")}
                    </FormLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.password?.message}`}
                    </FormErrorMessage>
                </FormControl>

                {rememberMe ?? (
                    <Checkbox {...register("remember")} mt="6">
                        {translate(
                            "pages.login.buttons.rememberMe",
                            "Remember me",
                        )}
                    </Checkbox>
                )}

                <Button mt="6" type="submit" width="full" colorScheme="brand">
                    {translate("pages.login.signin", "Sign in")}
                </Button>

                <Box mt="6">
                    <HStack justifyContent="space-between" fontSize="12px">
                        {forgotPasswordLink ?? (
                            <ChakraLink
                                as={Link}
                                color={importantTextColor}
                                to="/forgot-password"
                            >
                                {translate(
                                    "pages.login.buttons.forgotPassword",
                                    "Forgot password?",
                                )}
                            </ChakraLink>
                        )}
                        {registerLink ?? (
                            <Box>
                                <span>
                                    {translate(
                                        "pages.login.buttons.noAccount",
                                        "Don’t have an account?",
                                    )}
                                </span>
                                <ChakraLink
                                    color={importantTextColor}
                                    ml="1"
                                    as={Link}
                                    fontWeight="bold"
                                    to="/register"
                                >
                                    {translate(
                                        "pages.login.register",
                                        "Sign up",
                                    )}
                                </ChakraLink>
                            </Box>
                        )}
                    </HStack>
                </Box>
            </form>
        </Box>
    );

    const allWrapperProps = { ...layoutProps, ...wrapperProps };
    return (
        <FormProvider {...methods}>
            <Box {...allWrapperProps}>
                {renderContent ? (
                    renderContent(content, PageTitle)
                ) : (
                    <>
                        {PageTitle}
                        {content}
                    </>
                )}
            </Box>
        </FormProvider>
    );
};
