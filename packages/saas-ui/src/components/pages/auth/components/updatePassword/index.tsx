import React from "react";
import {
    UpdatePasswordPageProps,
    UpdatePasswordFormTypes,
} from "@pankod/refine-core";
import { useUpdatePassword, useTranslate } from "@pankod/refine-core";
import { Box, Spacer, Heading, BoxProps } from "@chakra-ui/react";

import {
    Card,
    CardProps,
    Form,
    FormLayout,
    Field,
    FormProps,
    SubmitHandler,
    SubmitButton,
} from "@saas-ui/react";

import { layoutStyles, cardStyles, titleStyles } from "../styles";

type UpdatePassworProps = UpdatePasswordPageProps<
    BoxProps,
    CardProps,
    FormProps
>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePassworProps> = ({
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
}) => {
    const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
    const translate = useTranslate();

    const onSubmit: SubmitHandler<any> = (values) => {
        if (onSubmitProp) {
            return onSubmitProp(values);
        }
        return updatePassword(values);
    };

    const { mutateAsync: updatePassword } =
        useUpdatePassword<UpdatePasswordFormTypes>();

    const CardContent = (
        <Card style={cardStyles} {...(contentProps ?? {})}>
            <Heading style={titleStyles}>
                {translate("pages.updatePassword.title", "Set New Password")}
            </Heading>
            <Spacer h="lg" />

            <Form
                defaultValues={{
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={onSubmit}
                {...useFormProps}
            >
                <FormLayout>
                    <Field
                        name="password"
                        type="password"
                        label={translate(
                            "pages.updatePassword.fields.password",
                            "New Password",
                        )}
                        placeholder="●●●●●●●●"
                        rules={{ required: true }}
                    />
                    <Field
                        name="confirmPassword"
                        type="password"
                        label={translate(
                            "pages.updatePassword.fields.confirmPassword",
                            "Confirm New Password",
                        )}
                        placeholder="●●●●●●●●"
                        rules={{ required: true }}
                    />
                    <SubmitButton mt="lg" width="full" size="md">
                        {translate(
                            "pages.updatePassword.buttons.submit",
                            "Update",
                        )}
                    </SubmitButton>
                </FormLayout>
            </Form>
        </Card>
    );

    return (
        <Box style={layoutStyles} {...(wrapperProps ?? {})}>
            {renderContent ? renderContent(CardContent) : CardContent}
        </Box>
    );
};
