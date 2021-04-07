import React from "react";
import { Card, Row, Col } from "antd";
import humanizeString from "humanize-string";
import { useParams } from "react-router-dom";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { OptionalComponent } from "@definitions";
import { CreateButton } from "@components";
import { ResourceRouterParams, CreateButtonProps } from "../../../interfaces";

export interface ListProps {
    resourceName: string;
    canCreate?: boolean;
    actionButtons?: React.FC;
    aside?: React.FC;
    title?: string;
    canExport?: boolean;
    createButtonProps?: CreateButtonProps;
}

export const List: React.FC<ListProps> = ({
    canCreate,
    aside,
    title,
    actionButtons,
    children,
    createButtonProps,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const defaultExtra = canCreate && (
        <CreateButton size="middle" {...createButtonProps} />
    );

    const renderExtra = () => {
        if (actionButtons) {
            return actionButtons;
        }

        return defaultExtra;
    };

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
                    extra={renderExtra()}
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
