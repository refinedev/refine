import * as React from "react";
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

export const LoginPage: React.FC = () => {
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
                                <CardContent>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        align="center"
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "30px",
                                            letterSpacing: "-0.04px",
                                            lineHeight: "38px",
                                            color: "text.primary",
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            color="primary.main"
                                        >
                                            {translate(
                                                "pages.login.title",
                                                "Sign in ",
                                            )}
                                        </Box>
                                        <Box
                                            component="span"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            {translate(
                                                "pages.login.title",
                                                "your account",
                                            )}
                                        </Box>
                                    </Typography>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit((data) => {
                                            login(data);
                                        })}
                                    >
                                        <TextField
                                            {...register("username", {
                                                required: true,
                                            })}
                                            id="username"
                                            margin="normal"
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
                                                        "Forgot?",
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
                                                height: "64px",
                                                color: "white",
                                            }}
                                            disabled={isLoading}
                                        >
                                            {translate(
                                                "pages.login.signin",
                                                "Sign in",
                                            )}
                                        </Button>
                                        <Link
                                            href="#"
                                            sx={{
                                                textDecoration: "none",
                                                display: "flex",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    letterSpacing: "-0.04px",
                                                    lineHeight: "38px",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {translate(
                                                    "pages.login.noAccount",
                                                    "Don’t have an account? ",
                                                )}{" "}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "12px",
                                                    letterSpacing: "-0.04px",
                                                    lineHeight: "38px",
                                                    color: "primary.main",
                                                    marginLeft: "2px",
                                                }}
                                            >
                                                {translate(
                                                    "pages.login.signup",
                                                    " Sign up",
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "12px",
                                                    letterSpacing: "-0.04px",
                                                    lineHeight: "38px",
                                                    color: "text.secondary",
                                                    marginLeft: "2px",
                                                }}
                                            >
                                                {translate(
                                                    "pages.login.noAccount",
                                                    "here ",
                                                )}{" "}
                                            </Typography>
                                        </Link>
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
