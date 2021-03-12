import React, { createElement, FC } from "react";
import { useParams } from "react-router-dom";
import { Card, CardProps, Col, Row, Space } from "antd";
import pluralize from "pluralize";

import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { useOne, useResourceWithRoute } from "@hooks";
import {
    EditButton,
    DeleteButton,
    RefreshButton,
    ListButton,
} from "@components";

export type ShowProps = CardProps & {
    aside?: FC<{ record?: BaseRecord }>;
    component?: FC<{ record?: BaseRecord }>;
    canEdit?: boolean;
    canDelete?: boolean;
    actionButtons?: React.ReactNode;
};

export const Show: React.FC<ShowProps> = ({
    aside,
    component,
    canEdit,
    canDelete,
    actionButtons,
    children,
    ...rest
}) => {
    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const useOneResource = useOne();

    const { data, isLoading } = useOneResource(resource.name, idFromRoute);

    const record = data?.data;

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                resourceName: resource.name,
                record,
            });
        }
        return child;
    });

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1">
                {component ? (
                    React.createElement(
                        component,
                        {
                            record,
                        },
                        childrenWithProps,
                    )
                ) : (
                    <Card
                        title={`Show ${pluralize.singular(resource.name)}`}
                        loading={isLoading}
                        extra={
                            <Row>
                                <Space key="extra-buttons">
                                    {actionButtons ?? (
                                        <>
                                            <ListButton />
                                            {canEdit && <EditButton />}
                                            {canDelete && <DeleteButton />}
                                            <RefreshButton />
                                        </>
                                    )}
                                </Space>
                            </Row>
                        }
                        {...rest}
                    >
                        {childrenWithProps}
                    </Card>
                )}
            </Col>
            <Col>
                {aside &&
                    createElement(aside, {
                        record,
                    })}
            </Col>
        </Row>
    );
};

export { ShowSimple } from "./showSimple";
export { ShowTab, Tab } from "./showTab";
