import React from "react";
import {
    useTranslate,
    useUpdatePassword,
    UpdatePasswordFormTypes,
    UpdatePasswordPageProps,
    BaseRecord,
    HttpError,
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

import { layoutProps, cardProps } from "../styles";
import { FormPropsType } from "../..";

type UpdatePasswordProps = UpdatePasswordPageProps<
    BoxProps,
    BoxProps,
    FormPropsType<UpdatePasswordFormTypes>
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const { mutate } = useUpdatePassword<UpdatePasswordFormTypes>();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
        ...useFormProps,
    });

    const allContentProps = { ...cardProps, ...contentProps };
    const content = (
        <Box bg="chakra-body-bg" {...allContentProps}>
            <Heading mb="8" textAlign="center" size="lg">
                {translate("pages.updatePassword.title", "Update Password")}
            </Heading>
            <form
                onSubmit={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }

                    return mutate(data);
                })}
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
                            validate: (val: any) => {
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

                <Button mb="3" type="submit" width="full" colorScheme="green">
                    {translate("pages.updatePassword.buttons.submit", "Update")}
                </Button>
            </form>
        </Box>
    );

    const allWrapperProps = { ...layoutProps, ...wrapperProps };
    return (
        <Box {...allWrapperProps}>
            {renderContent ? renderContent(content) : content}
        </Box>
    );
};
