import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row, Space } from "antd";
import pluralize from "pluralize";

import { ResourceRouterParams } from "../../../interfaces";
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
    isLoading?: boolean;
}

export const Show: React.FC<ShowProps> = ({
    aside,
    title,
    canEdit,
    canDelete,
    actionButtons,
    isLoading,
    children,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1">
                <Card
                    title={
                        title ?? `Show ${pluralize.singular(routeResourceName)}`
                    }
                    loading={isLoading}
                    extra={
                        <Row>
                            <Space key="extra-buttons">
                                {actionButtons ?? (
                                    <>
                                        <ListButton />
                                        {canEdit && (
                                            <EditButton disabled={isLoading} />
                                        )}
                                        {canDelete && (
                                            <DeleteButton
                                                disabled={isLoading}
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
