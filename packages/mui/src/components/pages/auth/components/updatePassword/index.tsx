import * as React from "react";
import {
    UpdatePasswordFormTypes,
    UpdatePasswordPageProps,
    useActiveAuthProvider,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
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
} from "@mui/material";

import {
    BaseRecord,
    HttpError,
    useTranslate,
    useUpdatePassword,
} from "@refinedev/core";

import { layoutStyles, titleStyles } from "../styles";
import { FormPropsType } from "../../index";
import { ThemedTitle } from "@components";

type UpdatePasswordProps = UpdatePasswordPageProps<
    BoxProps,
    CardContentProps,
    FormPropsType
>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
    title = undefined,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
        ...useFormProps,
    });

    const authProvider = useActiveAuthProvider();
    const { mutate: update, isLoading } =
        useUpdatePassword<UpdatePasswordFormTypes>({
            v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
        });

    const translate = useTranslate();

    const PageTitle =
        title === false ? null : (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "32px",
                    fontSize: "20px",
                }}
            >
                {title ?? (
                    <ThemedTitle
                        collapsed={false}
                        wrapperStyles={{
                            gap: "8px",
                        }}
                    />
                )}
            </div>
        );

    const Content = (
        <Card {...(contentProps ?? {})}>
            <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                    color="primary"
                    fontWeight={700}
                >
                    {translate(
                        "pages.updatePassword.title",
                        "Set New Password",
                    )}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        if (onSubmit) {
                            return onSubmit(data);
                        }

                        return update(data);
                    })}
                >
                    <TextField
                        {...register("password", {
                            required: true,
                        })}
                        id="password"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={translate(
                            "pages.updatePassword.fields.password",
                            "New Password",
                        )}
                        helperText={errors?.password?.message}
                        error={!!errors?.password}
                        type="password"
                        placeholder="●●●●●●●●"
                        autoComplete="current-password"
                        sx={{
                            m: 0,
                        }}
                    />

                    <TextField
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value?: string) => {
                                if (watch("password") !== value) {
                                    return translate(
                                        "pages.updatePassword.errors.confirmPasswordNotMatch",
                                        "Passwords do not match",
                                    );
                                }
                                return true;
                            },
                        })}
                        id="confirmPassword"
                        margin="normal"
                        fullWidth
                        name="confirmPassword"
                        label={translate(
                            "pages.updatePassword.fields.confirmPassword",
                            "Confirm New Password",
                        )}
                        helperText={errors?.confirmPassword?.message}
                        error={!!errors?.confirmPassword}
                        type="password"
                        placeholder="●●●●●●●●"
                        autoComplete="current-confirm-password"
                        sx={{
                            mb: 0,
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: "24px",
                        }}
                        disabled={isLoading}
                    >
                        {translate(
                            "pages.updatePassword.buttons.submit",
                            "Update",
                        )}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <>
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
                    {renderContent ? (
                        renderContent(Content, PageTitle)
                    ) : (
                        <>
                            {PageTitle}
                            {Content}
                        </>
                    )}
                </Container>
            </Box>
        </>
    );
};
