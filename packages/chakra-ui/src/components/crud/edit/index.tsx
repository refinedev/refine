import React from "react";

import {
    ResourceRouterParams,
    useMutationMode,
    useNavigation,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { Box, Heading, HStack, IconButton, Spinner } from "@chakra-ui/react";

// We use @tabler/icons for icons but you can use any icon library you want.
import { IconArrowLeft } from "@tabler/icons";

import {
    DeleteButton,
    ListButton,
    RefreshButton,
    SaveButton,
    Breadcrumb,
} from "@components";
import { EditProps } from "../types";

export const Edit: React.FC<EditProps> = (props) => {
    const {
        children,
        resource: resourceFromProps,
        recordItemId,
        deleteButtonProps,
        mutationMode: mutationModeFromProps,
        saveButtonProps,
        canDelete,
        dataProviderName,
        isLoading,
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

    const { goBack, list } = useNavigation();

    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeFromProps ?? mutationModeContext;

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible =
        canDelete ?? (resource.canDelete || deleteButtonProps);

    const id = recordItemId ?? idFromRoute;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={resource.route}
                />
            )}
            <RefreshButton
                {...(isLoading ? { disabled: true } : {})}
                resourceNameOrRouteName={resource.route}
                recordItemId={id}
                dataProviderName={dataProviderName}
            />
        </>
    );

    const defaultFooterButtons = (
        <>
            {isDeleteButtonVisible && (
                <DeleteButton
                    {...(isLoading ? { disabled: true } : {})}
                    mutationMode={mutationMode}
                    onSuccess={() => {
                        list(resource.route ?? resource.name);
                    }}
                    dataProviderName={dataProviderName}
                    {...deleteButtonProps}
                />
            )}
            <SaveButton
                {...(isLoading ? { disabled: true } : {})}
                {...saveButtonProps}
            />
        </>
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
                  defaultButtons: defaultHeaderButtons,
              })
            : headerButtonsFromProps
        : defaultHeaderButtons;

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
                    `${resource.name}.titles.edit`,
                    `Edit ${userFriendlyResourceName(
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
                    <HStack spacing={2}>
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
                mt={8}
                {...footerButtonProps}
            >
                {footerButtons}
            </Box>
        </Box>
    );
};
