import React from "react";
import { RefineCrudShowProps } from "@pankod/refine-ui-types";
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

import {
    DeleteButton,
    EditButton,
    ListButton,
    RefreshButton,
} from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";

export type ShowProps = RefineCrudShowProps<BoxProps>;

export const Show: React.FC<ShowProps> = (props) => {
    const {
        children,
        resource: resourceFromProps,
        recordItemId,
        canDelete,
        canEdit,
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

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible = canDelete ?? resource.canDelete;

    const isEditButtonVisible = canEdit ?? resource.canEdit;

    const id = recordItemId ?? idFromRoute;

    const loadingOverlayVisible = isLoading ?? false;

    const defaultHeaderButtons = (
        <>
            {!recordItemId && (
                <ListButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={resource.route}
                />
            )}
            {isEditButtonVisible && (
                <EditButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                />
            )}
            {isDeleteButtonVisible && (
                <DeleteButton
                    {...(isLoading ? { disabled: true } : {})}
                    resourceNameOrRouteName={resource.route}
                    recordItemId={id}
                    onSuccess={() => list(resource.route ?? resource.name)}
                    dataProviderName={dataProviderName}
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
                  defaultButtons: defaultHeaderButtons,
              })
            : headerButtonsFromProps
        : defaultHeaderButtons;

    const footerButtons = footerButtonsFromProps
        ? typeof footerButtonsFromProps === "function"
            ? footerButtonsFromProps({ defaultButtons: null })
            : footerButtonsFromProps
        : null;

    return (
        <Card p="4" position="relative" variant="solid" {...wrapperProps}>
            <Loader isLoading={loadingOverlayVisible} variant="overlay" />
            <HStack spacing="4" alignItems="flex-start" {...headerProps}>
                <Stack spacing="4" flex="1">
                    {breadcrumb}
                    <HStack spacing="4">
                        {buttonBack}
                        {title ?? (
                            <Heading as="h3" transform="capitalize">
                                {translate(
                                    `${resource.name}.titles.show`,
                                    `Show ${userFriendlyResourceName(
                                        resource.label ?? resource.name,
                                        "singular",
                                    )}`,
                                )}
                            </Heading>
                        )}
                    </HStack>
                </Stack>
                <HStack spacing="2" {...headerButtonProps}>
                    {headerButtons}
                </HStack>
            </HStack>
            <Box pt="8" {...contentProps}>
                {children}
            </Box>
            <HStack
                alignItems="right"
                spacing="4"
                mt="4"
                {...footerButtonProps}
            >
                {footerButtons}
            </HStack>
        </Card>
    );
};
