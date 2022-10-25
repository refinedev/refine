import React from "react";
import { RefineCrudEditProps } from "@pankod/refine-ui-types";
import {
    ResourceRouterParams,
    useMutationMode,
    useNavigation,
    useResourceWithRoute,
    userFriendlyResourceName,
    useRouterContext,
    useTranslate,
} from "@pankod/refine-core";
import {
    Box,
    BoxProps,
    Heading,
    HStack,
    IconButton,
    Stack,
} from "@chakra-ui/react";
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
    BoxProps,
    BoxProps,
    BoxProps,
    BoxProps,
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
        <Box bg="white" borderRadius="md" px="4" py="3" {...wrapperProps}>
            <Box mb="3" {...headerProps}>
                <Stack spacing="xs">
                    {breadcrumb}
                    <HStack spacing="xs">
                        {buttonBack}
                        {title ?? (
                            <Heading as="h3" size="lg">
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
