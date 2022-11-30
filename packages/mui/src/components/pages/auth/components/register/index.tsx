import * as React from "react";
import { RegisterFormTypes, RegisterPageProps } from "@pankod/refine-core";
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
    Divider,
    Link as MuiLink,
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useTranslate,
    useRouterContext,
    useRegister,
} from "@pankod/refine-core";

import { layoutStyles, titleStyles } from "../styles";
import { FormPropsType } from "../../index";

type RegisterProps = RegisterPageProps<
    BoxProps,
    CardContentProps,
    FormPropsType
>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    providers,
    formProps,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
        ...useFormProps,
    });

    const { mutate: registerMutate, isLoading } =
        useRegister<RegisterFormTypes>();
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
                                    registerMutate({
                                        providerName: provider.name,
                                    })
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
                    {translate(
                        "pages.register.title",
                        "Sign up for your account",
                    )}
                </Typography>
                {renderProviders()}
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        if (onSubmit) {
                            return onSubmit(data);
                        }

                        return registerMutate(data);
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
                        <Box display="flex" justifyContent="flex-end">
                            <Typography variant="body2" component="span">
                                {translate(
                                    "pages.login.buttons.haveAccount",
                                    "Have an account?",
                                )}
                            </Typography>
                            <MuiLink
                                ml="6px"
                                variant="body2"
                                component={Link}
                                underline="none"
                                to="/login"
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
                            my: "8px",
                            color: "white",
                        }}
                        disabled={isLoading}
                    >
                        {translate("pages.register.signup", "Sign up")}
                    </Button>
                </Box>
            </CardContent>
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
                {renderContent ? renderContent(Content) : Content}
            </Container>
        </Box>
    );
};
