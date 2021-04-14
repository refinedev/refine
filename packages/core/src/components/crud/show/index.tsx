import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Space } from "antd";
import pluralize from "pluralize";

import { ResourceRouterParams } from "../../../interfaces";
import { useOne, useResourceWithRoute } from "@hooks";
import { OptionalComponent } from "@definitions";
import {
    EditButton,
    DeleteButton,
    RefreshButton,
    ListButton,
} from "@components";

export interface ShowProps {
    aside?: FC;
    component?: FC;
    title?: string;
    canEdit?: boolean;
    canDelete?: boolean;
    actionButtons?: React.ReactNode;
}

export const Show: React.FC<ShowProps> = ({
    aside,
    title,
    canEdit,
    canDelete,
    actionButtons,
    children,
}) => {
    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const { isLoading, isFetching } = useOne(resource.name, idFromRoute);

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1">
                <Card
                    title={title ?? `Show ${pluralize.singular(resource.name)}`}
                    loading={isLoading || isFetching}
                    extra={
                        <Row>
                            <Space key="extra-buttons">
                                {actionButtons ?? (
                                    <>
                                        <ListButton />
                                        {canEdit && (
                                            <EditButton disabled={isFetching} />
                                        )}
                                        {canDelete && (
                                            <DeleteButton
                                                disabled={isFetching}
                                            />
                                        )}
                                        <RefreshButton />
                                    </>
                                )}
                            </Space>
                        </Row>
                    }
                >
                    {children}
                </Card>
            </Col>

            {aside && (
                <Col flex="0 1 300px">
                    <OptionalComponent optional={aside} />
                </Col>
            )}
        </Row>
    );
};
