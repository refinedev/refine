import * as React from "react";
import { LoginPageProps, LoginFormTypes } from "@pankod/refine-core";
import { FormProvider, useForm } from "@pankod/refine-react-hook-form";
import {
    Button,
    BoxProps,
    Box,
    Checkbox,
    Container,
    Card,
    CardContent,
    CardContentProps,
    FormControlLabel,
    TextField,
    Typography,
    Divider,
    Link as MuiLink,
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useLogin,
    useTranslate,
    useRouterContext,
} from "@pankod/refine-core";
import { layoutStyles, titleStyles } from "../styles";

import { FormPropsType } from "../../index";
type LoginProps = LoginPageProps<BoxProps, CardContentProps, FormPropsType>;

/**
 * login will be used as the default type of the <AuthPage> component. The login page will be used to log in to the system.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
    providers,
    registerLink,
    forgotPasswordLink,
    rememberMe,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
        ...useFormProps,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const { mutate: login, isLoading } = useLogin<LoginFormTypes>();
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    {providers.map((provider: any) => {
                        return (
                            <Button
                                key={provider.name}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    my: "8px",
                                    textTransform: "none",
                                }}
                                onClick={() =>
                                    login({ providerName: provider.name })
                                }
                                startIcon={provider.icon}
                            >
                                {provider.label}
                            </Button>
                        );
                    })}
                    <Divider style={{ fontSize: 12 }}>
                        {translate("pages.login.divider", "or")}
                    </Divider>
                </>
            );
        }
        return null;
    };

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
                    {translate("pages.login.title", "Sign in to your account")}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        if (onSubmit) {
                            return onSubmit(data);
                        }

                        return login(data);
                    })}
                    gap="16px"
                >
                    {renderProviders()}
                    <TextField
                        {...register("email", {
                            required: true,
                        })}
                        id="email"
                        margin="normal"
                        fullWidth
                        label={translate("pages.login.fields.email", "Email")}
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
                        margin="normal"
                        fullWidth
                        name="password"
                        label={translate(
                            "pages.login.fields.password",
                            "Password",
                        )}
                        helperText={errors?.password?.message}
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
                        {rememberMe ?? (
                            <FormControlLabel
                                sx={{
                                    span: {
                                        fontSize: "14px",
                                        color: "text.secondary",
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
                                    "pages.login.buttons.rememberMe",
                                    "Remember me",
                                )}
                            />
                        )}
                        {forgotPasswordLink ?? (
                            <MuiLink
                                variant="body2"
                                component={Link}
                                underline="none"
                                to="/forgot-password"
                            >
                                {translate(
                                    "pages.login.buttons.forgotPassword",
                                    "Forgot password?",
                                )}
                            </MuiLink>
                        )}
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: "8px",
                        }}
                        disabled={isLoading}
                    >
                        {translate("pages.login.signin", "Sign in")}
                    </Button>
                    {registerLink ?? (
                        <Box style={{ marginTop: 8 }}>
                            <Typography variant="body2" component="span">
                                {translate(
                                    "pages.login.buttons.noAccount",
                                    "Don’t have an account?",
                                )}
                            </Typography>
                            <MuiLink
                                ml="8px"
                                variant="body2"
                                component={Link}
                                underline="none"
                                to="/register"
                                fontWeight="bold"
                            >
                                {translate("pages.login.signup", "Sign up")}
                            </MuiLink>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <FormProvider {...methods}>
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {renderContent ? renderContent(Content) : Content}
                    </Box>
                </Container>
            </Box>
        </FormProvider>
    );
};
