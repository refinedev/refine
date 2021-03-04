import React, { createElement, FC } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { Card, CardProps, Col, Row, Space } from "antd";
import pluralize from "pluralize";

import { BaseRecord, MatchRoute } from "@interfaces";
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
    const match = useRouteMatch({
        path: [
            "/resources/:resourceName/:action/:id",
            "/resources/:resourceName",
            "/*",
        ],
    });

    const {
        params: { resourceName: routeResourceName, id },
    } = (match as unknown) as MatchRoute;

    const resource = useResourceWithRoute(routeResourceName);

    const { data, isLoading } = useOne(resource.name, id);

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
