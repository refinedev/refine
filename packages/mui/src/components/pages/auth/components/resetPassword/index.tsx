import * as React from "react";
import {
    RefineResetPasswordPageProps,
    RefineResetPasswordFormTypes,
} from "@pankod/refine-ui-types";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Card,
    CardContent as MuiCardContent,
    BoxProps,
    CardContentProps,
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useTranslate,
    useRouterContext,
    useResetPassword,
} from "@pankod/refine-core";

import { layoutStyles, titleStyles } from "../styles";

type ResetPasswordProps = RefineResetPasswordPageProps<
    BoxProps,
    CardContentProps
>;

/**
 * **refine** has reset password page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/mui-auth-page/#reset-password} for more details.
 */

export const ResetPasswordPage: React.FC<ResetPasswordProps> = ({
    onSubmit,
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, RefineResetPasswordFormTypes>();

    const { mutate: reset, isLoading } =
        useResetPassword<RefineResetPasswordFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const CardContent = (
        <Card {...(contentProps ?? {})}>
            <MuiCardContent sx={{ paddingX: "32px" }}>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                >
                    {translate(
                        "pages.resetPassword.title",
                        "Forgot your password?",
                    )}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => (onSubmit ?? reset)(data))}
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
                        size="small"
                        fullWidth
                        label={translate(
                            "pages.resetPassword.fields.email",
                            "Email",
                        )}
                        name="email"
                        type="email"
                        error={!!errors.email}
                        autoComplete="email"
                    />
                    {loginLink ?? (
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    marginTop: 1,
                                    marginLeft: "auto",
                                }}
                            >
                                <Typography variant="subtitle2">
                                    {translate(
                                        "pages.register.buttons.haveAccount",
                                        "Have an account? ",
                                    )}{" "}
                                    <Link
                                        underline="none"
                                        to="/login"
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {translate(
                                            "pages.login.signin",
                                            "Sign in",
                                        )}
                                    </Link>
                                </Typography>
                            </Box>
                        </div>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            my: "8px",
                            color: "white",
                        }}
                        disabled={isLoading}
                    >
                        {translate(
                            "pages.resetPassword.buttons.submit",
                            "Send reset instructions",
                        )}
                    </Button>
                </Box>
            </MuiCardContent>
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
                    {renderContent ? renderContent(CardContent) : CardContent}
                </Container>
            </Box>
        </>
    );
};
