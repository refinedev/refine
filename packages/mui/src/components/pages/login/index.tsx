import * as React from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    useTheme,
} from "@mui/material";

import { useLogin, useTranslate } from "@pankod/refine-core";

import refine from "../../../assets/images/refine.svg";

interface ILoginForm {
    username: string;
    password: string;
    remember?: boolean;
}

export const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>();

    const { mutate: login, isLoading } = useLogin<ILoginForm>();
    const translate = useTranslate();

    const onSubmit: any = (data: ILoginForm) => login(data);

    const { typography, palette } = useTheme();

    return (
        <Box
            sx={{
                background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
                backgroundSize: "cover",
                height: "100vh",
                color: "white",
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
                                    fontFamily={typography.fontFamily}
                                    component="h1"
                                    variant="h4"
                                    align="center"
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "30px",
                                        letterSpacing: "-0.04px",
                                        lineHeight: "38px",
                                        color: palette.text.secondary,
                                    }}
                                >
                                    <Box
                                        component="span"
                                        color={palette.primary.main}
                                    >
                                        {translate(
                                            "pages.login.title",
                                            "Sign in ",
                                        )}
                                    </Box>
                                    <Box component="span">
                                        {translate(
                                            "pages.login.title",
                                            "your account",
                                        )}
                                    </Box>
                                </Typography>

                                <Box
                                    component="form"
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                    sx={{ mt: 1 }}
                                    autoComplete="off"
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
                                        helperText={errors?.password?.message}
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
                                                    color: palette.text
                                                        .secondary,
                                                },
                                            }}
                                            color="secondary"
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    id="remember"
                                                    {...register("remember")}
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
                                                color: palette.text.secondary,
                                                textDecoration: "none",
                                            }}
                                        >
                                            {translate(
                                                "pages.login.forgotPassword",
                                                "Forgot?",
                                            )}
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
                                                color: palette.text.secondary,
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
                                                color: palette.primary.main,
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
                                                color: palette.text.secondary,
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
    );
};
