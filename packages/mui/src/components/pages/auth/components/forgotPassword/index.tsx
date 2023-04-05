import {
    Box,
    BoxProps,
    Button,
    Card,
    CardContent,
    CardContentProps,
    Container,
    Link as MuiLink,
    TextField,
    Typography,
} from "@mui/material";
import {
    ForgotPasswordFormTypes,
    ForgotPasswordPageProps,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";

import {
    BaseRecord,
    HttpError,
    useForgotPassword,
    useLink,
    useRouterContext,
    useRouterType,
    useTranslate,
} from "@refinedev/core";

import { ThemedTitle } from "@components";
import { FormPropsType } from "../../index";
import { layoutStyles, titleStyles } from "../styles";

type ForgotPasswordProps = ForgotPasswordPageProps<
    BoxProps,
    CardContentProps,
    FormPropsType
>;

/**
 * The forgotPassword type is a page that allows users to reset their passwords. You can use this page to reset your password.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
    title,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
        ...useFormProps,
    });

    const { mutate, isLoading } = useForgotPassword<ForgotPasswordFormTypes>();
    const translate = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

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
                {title ?? (
                    <ThemedTitle
                        collapsed={false}
                        wrapperStyles={{
                            gap: "8px",
                        }}
                    />
                )}
            </div>
        );

    const Content = (
        <Card {...(contentProps ?? {})}>
            <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                    color="primary"
                    fontWeight={700}
                >
                    {translate(
                        "pages.forgotPassword.title",
                        "Forgot your password?",
                    )}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        if (onSubmit) {
                            return onSubmit(data);
                        }

                        return mutate(data);
                    })}
                >
                    <TextField
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
                        id="email"
                        margin="normal"
                        fullWidth
                        label={translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                        name="email"
                        type="email"
                        error={!!errors.email}
                        autoComplete="email"
                        sx={{
                            m: 0,
                        }}
                    />
                    {loginLink ?? (
                        <Box textAlign="right" sx={{ mt: "24px" }}>
                            <Typography
                                variant="body2"
                                component="span"
                                fontSize="12px"
                            >
                                {translate(
                                    "pages.register.buttons.haveAccount",
                                    "Have an account?",
                                )}
                            </Typography>{" "}
                            <MuiLink
                                variant="body2"
                                component={ActiveLink}
                                underline="none"
                                to="/login"
                                fontWeight="bold"
                                fontSize="12px"
                                color="primary.light"
                            >
                                {translate("pages.login.signin", "Sign in")}
                            </MuiLink>
                        </Box>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: "24px" }}
                        disabled={isLoading}
                    >
                        {translate(
                            "pages.forgotPassword.buttons.submit",
                            "Send reset instructions",
                        )}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <>
            <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    {renderContent ? (
                        renderContent(Content, PageTitle)
                    ) : (
                        <>
                            {PageTitle}
                            {Content}
                        </>
                    )}
                </Container>
            </Box>
        </>
    );
};
