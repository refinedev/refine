import React, { ReactNode } from "react";

import {
    useResourceWithRoute,
    useTranslate,
    useRouterContext,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";

import { Card, CardHeader, CardContent } from "@mui/material";

import { CreateButton, CreateButtonProps } from "@components";

export interface ListProps {
    canCreate?: boolean;
    title?: ReactNode;
    createButtonProps?: CreateButtonProps;
    resource?: string;
}

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 */
export const List: React.FC<ListProps> = ({
    canCreate,
    title,
    children,
    createButtonProps,
    resource: resourceFromProps,
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
        <Card>
            <CardHeader
                title={
                    title ??
                    translate(
                        `${resource.name}.titles.list`,
                        userFriendlyResourceName(
                            resource.label ?? resource.name,
                            "plural",
                        ),
                    )
                }
                action={defaultExtra}
            />
            <CardContent>{children}</CardContent>
        </Card>
    );
};
