import * as React from "react";
import { RefineLoginPageProps } from "@pankod/refine-ui-types";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
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
} from "@pankod/refine-core";

import refine from "../../../assets/images/refine.svg";

type ILoginForm = {
    username: string;
    password: string;
    remember?: boolean;
};

export const LoginPage: React.FC<RefineLoginPageProps> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, ILoginForm>();

    const { mutate: login, isLoading } = useLogin<ILoginForm>();
    const translate = useTranslate();

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
                        <div>
                            <img src={refine} alt="Refine Logo" />
                        </div>
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
                                            {...register("username", {
                                                required: true,
                                            })}
                                            id="username"
                                            margin="normal"
                                            size="small"
                                            fullWidth
                                            label={translate(
                                                "pages.login.username",
                                                "Username",
                                            )}
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
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
                                            <Link
                                                href="#"
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
                                        </Box>
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
                                        <Box style={{ marginTop: 8 }}>
                                            <Typography variant="subtitle2">
                                                {translate(
                                                    "pages.login.noAccount",
                                                    "Don’t have an account?",
                                                )}{" "}
                                                <Link
                                                    underline="none"
                                                    href="#"
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
