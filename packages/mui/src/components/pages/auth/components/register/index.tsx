import * as React from "react";
import {
    RefineRegisterFormTypes,
    RefineRegisterPageProps,
} from "@pankod/refine-ui-types";
import { useForm, UseFormReturnType } from "@pankod/refine-react-hook-form";
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
    useRegister,
} from "@pankod/refine-core";

import { layoutStyles, titleStyles } from "../styles";

type RegisterProps = RefineRegisterPageProps<
    BoxProps,
    CardContentProps,
    UseFormReturnType
>;

/**
 * **refine** has register page form which is served on `/register` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/mui-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    formProps,
    renderContent,
    onSubmit,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, RefineRegisterFormTypes>();

    const { mutate: registerMutate, isLoading } =
        useRegister<RefineRegisterFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();
    const CardContent = (
        <Card {...(contentProps ?? {})}>
            <MuiCardContent>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                >
                    {translate(
                        "pages.register.title",
                        "Sign up for your account",
                    )}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) =>
                        (onSubmit ?? registerMutate)(data),
                    )}
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
                        label={translate("pages.register.email", "Email")}
                        error={!!errors.email}
                        helperText={
                            errors["email"] ? errors["email"].message : ""
                        }
                        name="email"
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
                            "pages.register.fields.password",
                            "Password",
                        )}
                        helperText={
                            errors["password"] ? errors["password"].message : ""
                        }
                        error={!!errors.password}
                        type="password"
                        placeholder="●●●●●●●●"
                        autoComplete="current-password"
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
                                        "pages.login.buttons.haveAccount",
                                        "Have an account?",
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
                        {translate("pages.register.signup", "Sign up")}
                    </Button>
                </Box>
            </MuiCardContent>
        </Card>
    );

    return (
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
    );
};
