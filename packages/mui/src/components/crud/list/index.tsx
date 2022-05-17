import React from "react";

import {
    useResourceWithRoute,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";

import {
    Card,
    CardHeader,
    CardContent,
    CardProps,
    CardHeaderProps,
    CardContentProps,
    Typography,
} from "@mui/material";

import { CreateButton, CreateButtonProps } from "@components";

export interface ListProps {
    canCreate?: boolean;
    createButtonProps?: CreateButtonProps;
    resource?: string;
    cardProps?: CardProps;
    cardHeaderProps?: CardHeaderProps;
    cardContentProps?: CardContentProps;
}

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const List: React.FC<ListProps> = ({
    canCreate,
    children,
    createButtonProps,
    resource: resourceFromProps,
    cardProps,
    cardHeaderProps,
    cardContentProps,
}) => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    const defaultExtra = isCreateButtonVisible && (
        <CreateButton
            resourceNameOrRouteName={resource.route}
            data-testid="list-create-button"
            {...createButtonProps}
        />
    );

    return (
        <Card {...cardProps}>
            <CardHeader
                title={
                    <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                        {translate(
                            `${resource.name}.titles.list`,
                            userFriendlyResourceName(
                                resource.label ?? resource.name,
                                "plural",
                            ),
                        )}
                    </Typography>
                }
                action={defaultExtra}
                {...cardHeaderProps}
            />
            <CardContent {...cardContentProps}>{children}</CardContent>
        </Card>
    );
};
