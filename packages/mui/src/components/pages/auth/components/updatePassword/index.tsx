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
    useUpdatePassword,
} from "@pankod/refine-core";

type IRegisterForm = {
    password: string;
    confirmPassword?: string;
};

export const UpdatePasswordPage: React.FC<any> = ({ submitButton }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, IRegisterForm>();

    const { mutate: update, isLoading } = useUpdatePassword<IRegisterForm>();
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
                                            "pages.updatePassword.title",
                                            "Finish resetting your password",
                                        )}
                                    </Typography>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit((data) => {
                                            update(data);
                                        })}
                                        gap="16px"
                                    >
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
                                                "pages.register.password",
                                                "Password",
                                            )}
                                            helperText={
                                                errors?.password?.message
                                            }
                                            error={!!errors?.password}
                                            type="password"
                                            placeholder="●●●●●●●●"
                                            autoComplete="current-password"
                                        />

                                        <TextField
                                            {...register("confirmPassword", {
                                                required: true,
                                                validate: (value?: string) => {
                                                    if (
                                                        watch("password") !==
                                                        value
                                                    ) {
                                                        return translate(
                                                            "pages.updatePassword.confirmPasswordNotMatch",
                                                            "The two passwords that you entered do not match!",
                                                        );
                                                    }
                                                    return true;
                                                },
                                            })}
                                            id="confirmPassword"
                                            size="small"
                                            margin="normal"
                                            fullWidth
                                            name="confirmPassword"
                                            label={translate(
                                                "pages.updatePassword.confirmPassword",
                                                "Confirm Password",
                                            )}
                                            helperText={
                                                errors?.confirmPassword?.message
                                            }
                                            error={!!errors?.confirmPassword}
                                            type="password"
                                            placeholder="●●●●●●●●"
                                            autoComplete="current-confirm-password"
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
                                                    "pages.updatePassword.submit",
                                                    "Change Password",
                                                )}
                                            </Button>
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
