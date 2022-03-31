import React from "react";
import { Card, PageHeader, PageHeaderProps, Space, Spin } from "antd";
import {
    useNavigation,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    ResourceRouterParams,
    userFriendlyResourceName,
    BaseKey,
} from "@pankod/refine-core";

import {
    EditButton,
    DeleteButton,
    RefreshButton,
    ListButton,
} from "@components";

export interface ShowProps {
    title?: string;
    canEdit?: boolean;
    canDelete?: boolean;
    actionButtons?: React.ReactNode;
    isLoading?: boolean;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
    recordItemId?: BaseKey;
}

/**
 * `<Show>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/basic-views/show} for more details.
 */
export const Show: React.FC<ShowProps> = ({
    title,
    canEdit,
    canDelete,
    actionButtons,
    isLoading = false,
    children,
    pageHeaderProps,
    resource: resourceFromProps,
    recordItemId,
}) => {
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

    return (
        <PageHeader
            ghost={false}
            onBack={routeFromAction ? goBack : undefined}
            title={
                title ??
                translate(
                    `${resource.name}.titles.show`,
                    `Show ${userFriendlyResourceName(
                        resource.label ?? resource.name,
                        "singular",
                    )}`,
                )
            }
            extra={
                <Space key="extra-buttons" wrap>
                    {!recordItemId && (
                        <ListButton
                            data-testid="show-list-button"
                            resourceNameOrRouteName={resource.route}
                        />
                    )}
                    {isEditButtonVisible && (
                        <EditButton
                            disabled={isLoading}
                            data-testid="show-edit-button"
                            resourceNameOrRouteName={resource.route}
                            recordItemId={id}
                        />
                    )}
                    {isDeleteButtonVisible && (
                        <DeleteButton
                            resourceNameOrRouteName={resource.route}
                            data-testid="show-delete-button"
                            recordItemId={id}
                            onSuccess={() =>
                                list(resource.route ?? resource.name)
                            }
                        />
                    )}
                    <RefreshButton
                        resourceNameOrRouteName={resource.route}
                        recordItemId={id}
                    />
                </Space>
            }
            {...pageHeaderProps}
        >
            <Spin spinning={isLoading}>
                <Card
                    bordered={false}
                    actions={actionButtons ? [actionButtons] : undefined}
                >
                    {children}
                </Card>
            </Spin>
        </PageHeader>
    );
};
