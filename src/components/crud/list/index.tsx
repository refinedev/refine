import React from "react";
import { Card, Row, Col, Space } from "antd";
import humanizeString from "humanize-string";
import { useParams } from "react-router-dom";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { OptionalComponent } from "@definitions";
import { CreateButton, ExportButton } from "@components";
import { ResourceRouterParams } from "@interfaces";

export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    aside?: React.FC;
    title?: string;
    canExport?: boolean;
}

export const List: React.FC<ListProps> = ({
    canCreate,
    aside,
    title,
    canExport,
    children,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);
    const translate = useTranslate();

    return (
        <Row gutter={[16, 16]}>
            <Col flex="1 1 200px">
                <Card
                    bodyStyle={{ padding: 0, flex: 1 }}
                    title={
                        title ??
                        translate(
                            `common:resources.${resource.name}.title`,
                            humanizeString(resource.name),
                        )
                    }
                    extra={
                        <Space direction="horizontal">
                            {canExport && <ExportButton size="middle" />}
                            {canCreate && <CreateButton size="middle" />}
                        </Space>
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
