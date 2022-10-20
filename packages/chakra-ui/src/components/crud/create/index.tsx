import React from "react";
import { RefineCrudCreateProps } from "@pankod/refine-ui-types";
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
import {
    Box,
    BoxProps,
    Heading,
    HStack,
    IconButton,
    Stack,
} from "@chakra-ui/react";

export type CreateProps = RefineCrudCreateProps<
    SaveButtonProps,
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps
>;

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

    const defaultFooterButtons = (
        <SaveButton
            {...(isLoading ? { disabled: true } : {})}
            {...saveButtonProps}
        />
    );

    const buttonBack =
        goBackFromProps === (false || null) ? null : (
            <IconButton
                aria-label="back"
                variant="outline"
                size="sm"
                onClick={routeFromAction ? goBack : undefined}
            >
                {typeof goBackFromProps !== "undefined" ? (
                    goBackFromProps
                ) : (
                    <IconArrowLeft />
                )}
            </IconButton>
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
        <Box bg="white" borderRadius="md" px="4" py="3" {...wrapperProps}>
            <Box mb="3" align="center" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    <HStack>
                        {buttonBack}
                        {title ?? (
                            <Heading as="h3" size="md">
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
                <Box spacing="xs" {...headerButtonProps}>
                    {headerButtons}
                </Box>
            </Box>
            <Box mb="3" {...contentProps}>
                {children}
            </Box>
            <Box
                display="flex"
                justifyContent="flex-end"
                spacing="xs"
                mt="md"
                {...footerButtonProps}
            >
                {footerButtons}
            </Box>
        </Box>
    );
};
