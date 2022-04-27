import * as React from "react";
import {
    Button,
    CssBaseline,
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
} from "@mui/material";

import { useLogin, useTranslate } from "@pankod/refine-core";

import refine from "../../../assets/images/refine.svg";

export interface ILoginForm {
    username: string;
    password: string;
    remember?: boolean;
}

export const LoginPage: React.FC = () => {
    const { mutate: login, isLoading } = useLogin<ILoginForm>();
    const translate = useTranslate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const payload: ILoginForm = {
            username: data.get("username") as string,
            password: data.get("password") as string,
        };

        login(payload);
    };
    return (
        <div
            style={{
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
                <CssBaseline />
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
                                    variant="h5"
                                    align="center"
                                    color="#626262"
                                >
                                    {translate(
                                        "pages.login.title",
                                        "Sign in your account",
                                    )}
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    noValidate
                                    sx={{ mt: 1 }}
                                >
                                    <TextField
                                        id="username"
                                        margin="normal"
                                        required
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
                                        id="password"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label={translate(
                                            "pages.login.password",
                                            "Password",
                                        )}
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        autoComplete="current-password"
                                    />
                                    <FormControlLabel
                                        id="remember"
                                        control={
                                            <Checkbox
                                                value="remember"
                                                color="primary"
                                            />
                                        }
                                        label={translate(
                                            "pages.login.remember",
                                            "Remember me",
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={isLoading}
                                    >
                                        {translate(
                                            "pages.login.signin",
                                            "Sign in",
                                        )}
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                {translate(
                                                    "pages.login.forgotPassword",
                                                    "Forgot password?",
                                                )}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {translate(
                                                    "pages.login.noAccount",
                                                    "Don’t have an account?",
                                                )}{" "}
                                                {translate(
                                                    "pages.login.signup",
                                                    "Sign up",
                                                )}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};
