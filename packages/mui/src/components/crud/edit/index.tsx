import React from "react";

import {
    useResourceWithRoute,
    useMutationMode,
    useNavigation,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    MutationMode,
    ResourceRouterParams,
    BaseKey,
} from "@pankod/refine-core";

import {
    Card,
    ButtonProps,
    CardHeader,
    IconButton,
    CardContent,
    CardActions,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    DeleteButton,
    RefreshButton,
    ListButton,
    SaveButton,
} from "@components";
import { DeleteButtonProps } from "@components";

export interface EditProps {
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
    recordItemId?: BaseKey;
    canDelete?: boolean;
    deleteButtonProps?: DeleteButtonProps;
    resource?: string;
    isLoading?: boolean;
    cardProps?: CardProps;
    cardHeaderProps?: CardHeaderProps;
    cardContentProps?: CardContentProps;
    cardActionsProps?: CardActionsProps;
}

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const Edit: React.FC<EditProps> = ({
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
    canDelete,
    resource: resourceFromProps,
    isLoading = false,
    cardProps,
    cardHeaderProps,
    cardContentProps,
    cardActionsProps,
}) => {
    const translate = useTranslate();

    const { goBack, list } = useNavigation();

    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { useParams } = useRouterContext();

    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible =
        canDelete ?? (resource.canDelete || deleteButtonProps);

    const id = recordItemId ?? idFromRoute;

    return (
        <Card {...cardProps}>
            <CardHeader
                title={translate(
                    `${resource.name}.titles.edit`,
                    `Edit ${userFriendlyResourceName(
                        resource.label ?? resource.name,
                        "singular",
                    )}`,
                )}
                avatar={
                    <IconButton onClick={routeFromAction ? goBack : undefined}>
                        <ArrowBackIcon />
                    </IconButton>
                }
                action={
                    <>
                        {!recordItemId && (
                            <ListButton
                                data-testid="edit-list-button"
                                resourceNameOrRouteName={resource.route}
                            />
                        )}
                        <RefreshButton
                            resourceNameOrRouteName={resource.route}
                            recordItemId={id}
                        />
                    </>
                }
                {...cardHeaderProps}
            />
            <CardContent {...cardContentProps}>{children}</CardContent>
            <CardActions
                sx={{ display: "flex", justifyContent: "flex-end" }}
                {...cardActionsProps}
            >
                {actionButtons ?? (
                    <>
                        {isDeleteButtonVisible && (
                            <DeleteButton
                                data-testid="edit-delete-button"
                                mutationMode={mutationMode}
                                onSuccess={() => {
                                    list(resource.route ?? resource.name);
                                }}
                                {...deleteButtonProps}
                            />
                        )}
                        <SaveButton loading={isLoading} {...saveButtonProps} />
                    </>
                )}
            </CardActions>
        </Card>
    );
};
