import React from "react";
import {
    useTranslate,
    useUpdatePassword,
    UpdatePasswordFormTypes,
    UpdatePasswordPageProps,
} from "@pankod/refine-core";
import {
    Box,
    BoxProps,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@pankod/refine-react-hook-form";

import { layoutStyles, cardStyles } from "../styles";
import { FormPropsType } from "../..";

type UpdatePasswordProps = UpdatePasswordPageProps<
    BoxProps,
    BoxProps,
    FormPropsType
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const translate = useTranslate();
    const { mutate } = useUpdatePassword<UpdatePasswordFormTypes>();
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm<UpdatePasswordFormTypes>();

    const content = (
        <Box style={cardStyles} {...contentProps}>
            <Heading mb="8" textAlign="center" size="lg">
                {translate("pages.updatePassword.title", "Update Password")}
            </Heading>
            <form
                onSubmit={handleSubmit((data) => mutate(data))}
                {...formProps}
            >
                <FormControl mb="3" isInvalid={!!errors?.password}>
                    <FormLabel>
                        {translate(
                            "pages.updatePassword.fields.password",
                            "New Password",
                        )}
                    </FormLabel>
                    <Input
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.password?.message}`}
                    </FormErrorMessage>
                </FormControl>

                <FormControl mb="3" isInvalid={!!errors?.confirmPassword}>
                    <FormLabel>
                        {translate(
                            "pages.updatePassword.fields.confirmPassword",
                            "Confirm New Password",
                        )}
                    </FormLabel>
                    <Input
                        type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (val: string) => {
                                if (watch("password") != val) {
                                    return translate(
                                        "pages.updatePassword.errors.confirmPasswordNotMatch",
                                        "Passwords do not match",
                                    );
                                }
                                return;
                            },
                        })}
                    />
                    <FormErrorMessage>
                        {`${errors.confirmPassword?.message}`}
                    </FormErrorMessage>
                </FormControl>

                <Button mb="3" type="submit" width="full" colorScheme="primary">
                    {translate("pages.updatePassword.buttons.submit", "Update")}
                </Button>
            </form>
        </Box>
    );

    return (
        <Box style={layoutStyles} {...wrapperProps}>
            {renderContent ? renderContent(content) : content}
        </Box>
    );
};
