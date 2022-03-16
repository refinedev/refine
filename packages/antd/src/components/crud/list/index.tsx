import React, { ReactNode } from "react";
import { PageHeader, PageHeaderProps } from "antd";
import {
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    userFriendlyResourceName,
    ResourceRouterParams,
} from "@pankod/refine-core";

import { CreateButton, CreateButtonProps } from "../../../components";

export interface ListProps {
    canCreate?: boolean;
    title?: ReactNode;
    createButtonProps?: CreateButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
}

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/list} for more details.
 */
export const List: React.FC<ListProps> = ({
    canCreate,
    title,
    children,
    createButtonProps,
    pageHeaderProps,
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
            size="middle"
            resourceNameOrRouteName={resource.route}
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
                    userFriendlyResourceName(
                        resource.label ?? resource.name,
                        "plural",
                    ),
                )
            }
            extra={defaultExtra}
            {...pageHeaderProps}
        >
            {children}
        </PageHeader>
    );
};
