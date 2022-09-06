import * as React from "react";
// import { RefineLoginPageProps } from "@pankod/refine-ui-types";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useTranslate,
    useRouterContext,
    useResetPassword,
} from "@pankod/refine-core";

type IResetPasswordForm = {
    email: string;
};

export const ResetPasswordPage: React.FC<any> = ({
    submitButton,
    loginLink,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, IResetPasswordForm>();

    const { mutate: reset, isLoading } = useResetPassword<IResetPasswordForm>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    return (
        <>
            <Box
                component="div"
                sx={{
                    background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
                    backgroundSize: "cover",
                }}
            >
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box mt={4}>
                            <Card>
                                <CardContent sx={{ paddingX: "32px" }}>
                                    <Typography
                                        component="h1"
                                        variant="h5"
                                        align="center"
                                        sx={{
                                            fontWeight: "700",
                                            margin: "12px 0",
                                        }}
                                    >
                                        {translate(
                                            "pages.resetPassword.title",
                                            "Forgot your password?",
                                        )}
                                    </Typography>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit((data) => {
                                            reset(data);
                                        })}
                                        gap="16px"
                                    >
                                        <TextField
                                            {...register("email", {
                                                required: true,
                                            })}
                                            id="email"
                                            margin="normal"
                                            size="small"
                                            fullWidth
                                            label={translate(
                                                "pages.resetPassword.email",
                                                "Email",
                                            )}
                                            name="email"
                                            type="email"
                                            error={!!errors.email}
                                            autoComplete="email"
                                        />
                                        {submitButton ?? (
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
                                                    "pages.resetPassword.signup",
                                                    "Sign up",
                                                )}
                                            </Button>
                                        )}
                                        {loginLink ?? (
                                            <Box style={{ marginTop: 8 }}>
                                                <Typography variant="subtitle2">
                                                    {translate(
                                                        "pages.register.haveAccount",
                                                        "Do you have an account?",
                                                    )}{" "}
                                                    <Link
                                                        underline="none"
                                                        to="/login"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {translate(
                                                            "pages.resetPassword.submit",
                                                            "Send reset link",
                                                        )}
                                                    </Link>
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
