import * as React from "react";
import {
    ForgotPasswordPageProps,
    ForgotPasswordFormTypes,
} from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    BoxProps,
    CardContentProps,
    Link as MuiLink,
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useTranslate,
    useRouterContext,
    useForgotPassword,
} from "@pankod/refine-core";

import { layoutStyles, titleStyles } from "../styles";
import { FormPropsType } from "../../index";

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
    const { Link } = useRouterContext();

    const Content = (
        <Card {...(contentProps ?? {})}>
            <CardContent sx={{ paddingX: "32px" }}>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                    color="primary"
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
                    gap="16px"
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
                    />
                    {loginLink ?? (
                        <Box textAlign="right">
                            <Typography variant="body2" component="span">
                                {translate(
                                    "pages.register.buttons.haveAccount",
                                    "Have an account?",
                                )}
                            </Typography>{" "}
                            <MuiLink
                                variant="body2"
                                component={Link}
                                underline="none"
                                to="/register"
                                fontWeight="bold"
                            >
                                {translate("pages.login.signin", "Sign in")}
                            </MuiLink>
                        </Box>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: "8px",
                        }}
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
                    {renderContent ? renderContent(Content) : Content}
                </Container>
            </Box>
        </>
    );
};
