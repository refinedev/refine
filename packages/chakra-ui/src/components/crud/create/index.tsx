import React from "react";
import {
    ResourceRouterParams,
    useNavigation,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { Box, Heading, HStack, IconButton, Spinner } from "@chakra-ui/react";

// We use @tabler/icons for icons but you can use any icon library you want.
import { IconArrowLeft } from "@tabler/icons";

import { Breadcrumb, SaveButton } from "@components";
import { CreateProps } from "../types";

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
                variant="ghost"
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

    const renderTitle = () => {
        if (title) {
            if (typeof title === "string" || typeof title === "number") {
                return (
                    <Heading as="h3" size="lg">
                        {title}
                    </Heading>
                );
            }

            return title;
        }

        return (
            <Heading as="h3" size="lg">
                {translate(
                    `${resource.name}.titles.create`,
                    `Create ${userFriendlyResourceName(
                        resource.label ?? resource.name,
                        "singular",
                    )}`,
                )}
            </Heading>
        );
    };

    return (
        <Box
            position="relative"
            bg="chakra-body-bg"
            borderRadius="md"
            px="4"
            py="3"
            {...wrapperProps}
        >
            {isLoading && (
                <Spinner
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                />
            )}
            <Box
                mb="3"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
                gap="3"
                {...headerProps}
            >
                <Box minW={200}>
                    {breadcrumb}
                    <HStack>
                        {buttonBack}
                        {renderTitle()}
                    </HStack>
                </Box>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent={{ base: "flex-start", md: "flex-end" }}
                    gap="2"
                    {...headerButtonProps}
                >
                    {headerButtons}
                </Box>
            </Box>
            <Box opacity={isLoading ? 0.5 : undefined} {...contentProps}>
                {children}
            </Box>
            <Box
                display="flex"
                justifyContent="flex-end"
                gap="2"
                mt="8"
                {...footerButtonProps}
            >
                {footerButtons}
            </Box>
        </Box>
    );
};
