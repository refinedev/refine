import React from "react";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    HStack,
    IconButton,
    Stack,
    Heading,
} from "@chakra-ui/react";
import { Card, Loader } from "@saas-ui/react";
import {
    ResourceRouterParams,
    useNavigation,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { IconArrowLeft } from "@tabler/icons";

import { SaveButton, SaveButtonProps } from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";
import { Form, UseFormReturn } from "@components/form";

export type CreateProps = RefineCrudCreateProps<SaveButtonProps, BoxProps> & {
    form: UseFormReturn;
};

export const Create: React.FC<CreateProps> = (props) => {
    const {
        children,
        form,
        resource: resourceFromProps,
        footerButtons: footerButtonsFromProps,
        footerButtonProps,
        headerButtons: headerButtonsFromProps,
        headerButtonProps,
        wrapperProps,
        contentProps,
        headerProps,
        goBack: goBackFromProps,
        breadcrumb = <Breadcrumb />,
        title,
    } = props;
    const translate = useTranslate();

    const { goBack } = useNavigation();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, action: routeFromAction } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const {
        saveButtonProps,
        refineCore: { formLoading: isLoading },
    } = form;

    const loadingOverlayVisible =
        isLoading ?? saveButtonProps?.disabled ?? false;

    const defaultFooterButtons = (
        <SaveButton
            {...(isLoading ? { disabled: true } : {})}
            {...saveButtonProps}
        />
    );

    const backIcon = React.isValidElement(goBackFromProps) ? (
        goBackFromProps
    ) : (
        <IconArrowLeft />
    );

    const buttonBack =
        goBackFromProps === (false || null) ? null : (
            <IconButton
                onClick={routeFromAction ? goBack : undefined}
                aria-label="Go back"
                icon={backIcon}
                size="sm"
                variant="ghost"
            />
        );

    const headerButtons = headerButtonsFromProps
        ? typeof headerButtonsFromProps === "function"
            ? headerButtonsFromProps({
                  defaultButtons: null,
              })
            : headerButtonsFromProps
        : null;

    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({ defaultButtons: defaultFooterButtons })
            : footerButtonsFromProps
        : defaultFooterButtons;

    return (
        <Form form={form}>
            <Card p="4" position="relative" variant="solid" {...wrapperProps}>
                <Loader isLoading={loadingOverlayVisible} variant="overlay" />
                <HStack spacing="4" alignItems="flex-start" {...headerProps}>
                    <Stack spacing="4">
                        {breadcrumb}
                        <HStack spacing="4">
                            {buttonBack}
                            {title ?? (
                                <Heading as="h3" transform="capitalize">
                                    {translate(
                                        `${resource.name}.titles.create`,
                                        `Create ${userFriendlyResourceName(
                                            resource.label ?? resource.name,
                                            "singular",
                                        )}`,
                                    )}
                                </Heading>
                            )}
                        </HStack>
                    </Stack>
                    <HStack spacing="4" {...headerButtonProps}>
                        {headerButtons}
                    </HStack>
                </HStack>
                <Box pt="8" {...contentProps}>
                    {children}
                </Box>
                <HStack
                    alignItems="right"
                    spacing="4"
                    mt="8"
                    {...footerButtonProps}
                >
                    {footerButtons}
                </HStack>
            </Card>
        </Form>
    );
};
