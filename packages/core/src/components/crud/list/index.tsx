import React from "react";
import { Card, Row, Col, PageHeader, PageHeaderProps } from "antd";
import humanizeString from "humanize-string";
import { useParams } from "react-router-dom";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { OptionalComponent } from "@definitions";
import { CreateButton } from "@components";
import { ResourceRouterParams, CreateButtonProps } from "../../../interfaces";

export interface ListProps {
    canCreate?: boolean;
    aside?: React.FC;
    title?: string;
    createButtonProps?: CreateButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
}

export const List: React.FC<ListProps> = ({
    canCreate = true,
    aside,
    title,
    children,
    createButtonProps,
    pageHeaderProps,
    resource: resourceFromProps,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName ?? resourceFromProps);

    const defaultExtra = canCreate &&
        (createButtonProps || resource.canCreate) && (
            <CreateButton size="middle" {...createButtonProps} />
        );

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1 1 200px">
                <PageHeader
                    ghost={false}
                    title={
                        title ??
                        translate(
                            `${resource.name}.listTitle`,
                            humanizeString(resource.name),
                        )
                    }
                    extra={defaultExtra}
                    {...pageHeaderProps}
                >
                    {children}
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
