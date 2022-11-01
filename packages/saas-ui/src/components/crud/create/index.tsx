import React from "react";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";
import {
    Box,
    BoxProps,
    HStack,
    IconButton,
    Stack,
    Heading,
    Icon,
    As,
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

export type CreateProps = RefineCrudCreateProps<SaveButtonProps, BoxProps>;

export const Create: React.FC<CreateProps> = (props) => {
    const {
        children,
        saveButtonProps,
        isLoading,
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
                aria-label="Go back"
                onClick={routeFromAction ? goBack : undefined}
                icon={<Icon as={backIcon as unknown as As} />}
            ></IconButton>
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
        <Card p="md" {...wrapperProps}>
            <Loader visible={loadingOverlayVisible} />
            <HStack align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    <HStack spacing="xs">
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
                <HStack spacing="xs" {...headerButtonProps}>
                    {headerButtons}
                </HStack>
            </HStack>
            <Box pt="sm" {...contentProps}>
                {children}
            </Box>
            <HStack
                alignItems="right"
                spacing="xs"
                mt="md"
                {...footerButtonProps}
            >
                {footerButtons}
            </HStack>
        </Card>
    );
};
