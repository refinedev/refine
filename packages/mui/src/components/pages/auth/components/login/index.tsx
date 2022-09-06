import * as React from "react";
// import { RefineLoginPageProps } from "@pankod/refine-ui-types";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useLogin,
    useTranslate,
    useRouterContext,
} from "@pankod/refine-core";

type ILoginForm = {
    email?: string;
    password?: string;
    remember?: boolean;
    providerName?: string;
};

export const LoginPage: React.FC<any> = ({
    providers,
    submitButton,
    registerLink,
    resetPasswordLink,
    remember,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, ILoginForm>();

    const { mutate: login, isLoading } = useLogin<ILoginForm>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const renderProviders = () => {
        if (providers) {
            return providers.map((provider: any) => {
                return (
                    <Button
                        key={provider.name}
                        fullWidth
                        variant="contained"
                        sx={{
                            my: "8px",
                            color: "white",
                        }}
                        onClick={() => login({ providerName: provider.name })}
                    >
                        {provider.label}
                    </Button>
                );
            });
        }
        return null;
    };

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
                            {renderProviders()}
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
                                            "pages.login.title",
                                            "Sign in your account",
                                        )}
                                    </Typography>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit((data) => {
                                            login(data);
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
                                                "pages.login.email",
                                                "Email",
                                            )}
                                            error={!!errors.email}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                        />
                                        <TextField
                                            {...register("password", {
                                                required: true,
                                            })}
                                            id="password"
                                            size="small"
                                            margin="normal"
                                            fullWidth
                                            name="password"
                                            label={translate(
                                                "pages.login.password",
                                                "Password",
                                            )}
                                            helperText={
                                                errors?.password?.message
                                            }
                                            error={!!errors.password}
                                            type="password"
                                            placeholder="●●●●●●●●"
                                            autoComplete="current-password"
                                        />

                                        <Box
                                            component="div"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            {remember && (
                                                <FormControlLabel
                                                    sx={{
                                                        span: {
                                                            fontSize: "12px",
                                                            color: "text.secondary",
                                                        },
                                                    }}
                                                    color="secondary"
                                                    control={
                                                        <Checkbox
                                                            size="small"
                                                            id="remember"
                                                            {...register(
                                                                "remember",
                                                            )}
                                                        />
                                                    }
                                                    label={translate(
                                                        "pages.login.remember",
                                                        "Remember me",
                                                    )}
                                                />
                                            )}
                                            {resetPasswordLink ?? (
                                                <Link
                                                    to="/reset-password"
                                                    sx={{
                                                        fontSize: "12px",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        {translate(
                                                            "pages.login.forgotPassword",
                                                            "Forgot password?",
                                                        )}
                                                    </Typography>
                                                </Link>
                                            )}
                                        </Box>
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
                                                    "pages.login.signin",
                                                    "Sign in",
                                                )}
                                            </Button>
                                        )}
                                        {registerLink ?? (
                                            <Box style={{ marginTop: 8 }}>
                                                <Typography variant="subtitle2">
                                                    {translate(
                                                        "pages.login.noAccount",
                                                        "Don’t have an account?",
                                                    )}{" "}
                                                    <Link
                                                        underline="none"
                                                        to="/register"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {translate(
                                                            "pages.login.signup",
                                                            "Sign up",
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
