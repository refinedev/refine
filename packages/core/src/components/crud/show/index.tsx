import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, PageHeader, PageHeaderProps, Row, Space } from "antd";
import pluralize from "pluralize";

import { ResourceRouterParams } from "../../../interfaces";
import { OptionalComponent } from "@definitions";
import {
    EditButton,
    DeleteButton,
    RefreshButton,
    ListButton,
} from "@components";
import { useNavigation, useResourceWithRoute, useTranslate } from "@hooks";

export interface ShowProps {
    aside?: FC;
    title?: string;
    canEdit?: boolean;
    canDelete?: boolean;
    actionButtons?: React.ReactNode;
    isLoading?: boolean;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
    recordItemId?: string | number;
}

export const Show: React.FC<ShowProps> = ({
    aside,
    title,
    canEdit,
    canDelete,
    actionButtons,
    isLoading,
    children,
    pageHeaderProps,
    resource: resourceFromProps,
    recordItemId,
}) => {
    const translate = useTranslate();

    const { goBack, list } = useNavigation();

    const resourceWithRoute = useResourceWithRoute();
    const {
        resource: routeResourceName,
        action: routeFromAction,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(resourceFromProps ?? routeResourceName);

    const isDeleteButtonVisible = canDelete ?? resource.canDelete;
    const isEditButtonVisible = canEdit ?? resource.canEdit;

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1 1 200px">
                <PageHeader
                    ghost={false}
                    onBack={routeFromAction ? goBack : undefined}
                    title={
                        title ??
                        translate(
                            `${resource.name}.titles.show`,
                            `Show ${pluralize.singular(resource.name)}`,
                        )
                    }
                    extra={
                        <Row>
                            <Space key="extra-buttons">
                                {!recordItemId && (
                                    <ListButton
                                        data-testid="show-list-button"
                                        resourceName={resource.name}
                                    />
                                )}
                                {isEditButtonVisible && (
                                    <EditButton
                                        disabled={isLoading}
                                        data-testid="show-edit-button"
                                        resourceName={resource.name}
                                        recordItemId={
                                            recordItemId ?? idFromRoute
                                        }
                                    />
                                )}
                                {isDeleteButtonVisible && (
                                    <DeleteButton
                                        resourceName={resource.name}
                                        data-testid="show-delete-button"
                                        recordItemId={
                                            recordItemId ?? idFromRoute
                                        }
                                        onSuccess={() =>
                                            list(
                                                resource.route ?? resource.name,
                                            )
                                        }
                                    />
                                )}
                                <RefreshButton
                                    resourceName={resource.name}
                                    recordItemId={recordItemId ?? idFromRoute}
                                />
                            </Space>
                        </Row>
                    }
                    {...pageHeaderProps}
                >
                    <Card
                        loading={isLoading}
                        actions={actionButtons ? [actionButtons] : undefined}
                    >
                        {children}
                    </Card>
                </PageHeader>
            </Col>

            {aside && (
                <Col flex="0 1 300px">
                    <OptionalComponent optional={aside} />
                </Col>
            )}
        </Row>
    );
};
