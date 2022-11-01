import React from "react";
import { RefineCrudEditProps } from "@pankod/refine-ui-types";
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
    useMutationMode,
    useNavigation,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import { IconArrowLeft } from "@tabler/icons";

import {
    DeleteButton,
    DeleteButtonProps,
    ListButton,
    RefreshButton,
    SaveButton,
    SaveButtonProps,
} from "@components/buttons";
import { Breadcrumb } from "@components/breadcrumb";

export type EditProps = RefineCrudEditProps<
    SaveButtonProps,
    DeleteButtonProps,
    BoxProps
>;

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

    const loadingOverlayVisible =
        isLoading ?? saveButtonProps?.disabled ?? false;

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

    const icon = React.isValidElement(goBackFromProps) ? (
        goBackFromProps
    ) : (
        <IconArrowLeft />
    );

    const buttonBack =
        goBackFromProps === (false || null) ? null : (
            <IconButton
                onClick={routeFromAction ? goBack : undefined}
                aria-label="Go back"
                icon={icon}
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
            ? footerButtonsFromProps({ defaultButtons: defaultFooterButtons })
            : footerButtonsFromProps
        : defaultFooterButtons;

    return (
        <Card p="md" {...wrapperProps}>
            <Loader visible={loadingOverlayVisible} />
            <HStack {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    <HStack spacing="xs">
                        {buttonBack}
                        {title ?? (
                            <Heading as="h3" transform="capitalize">
                                {translate(
                                    `${resource.name}.titles.edit`,
                                    `Edit ${userFriendlyResourceName(
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
