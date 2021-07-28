import React from "react";
import { PageHeader, PageHeaderProps } from "antd";
import { useParams } from "react-router-dom";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { CreateButton } from "@components";
import { userFriendlyResourceName } from "@definitions";
import { ResourceRouterParams, CreateButtonProps } from "../../../interfaces";

export interface ListProps {
    canCreate?: boolean;
    title?: string;
    createButtonProps?: CreateButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
}

export const List: React.FC<ListProps> = ({
    canCreate,
    title,
    children,
    createButtonProps,
    pageHeaderProps,
    resource: resourceFromProps,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    const defaultExtra = isCreateButtonVisible && (
        <CreateButton
            size="middle"
            resourceName={resource.name}
            data-testid="list-create-button"
            {...createButtonProps}
        />
    );
    return (
        <PageHeader
            ghost={false}
            title={
                title ??
                translate(
                    `${resource.name}.titles.list`,
                    userFriendlyResourceName(resource.name, "plural"),
                )
            }
            extra={defaultExtra}
            {...pageHeaderProps}
        >
            {children}
        </PageHeader>
    );
};
