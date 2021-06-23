import React from "react";
import { Row, Col, PageHeader, PageHeaderProps } from "antd";
import { useParams } from "react-router-dom";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { CreateButton } from "@components";
import { userFriendlyResourceName } from "@definitions";
import { ResourceRouterParams, CreateButtonProps } from "../../../interfaces";

export interface ListProps {
    canCreate?: boolean;
    Aside?: React.ReactNode;
    title?: string;
    createButtonProps?: CreateButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
}

export const List: React.FC<ListProps> = ({
    canCreate,
    Aside,
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

    const isCreateButtonVisible =
        canCreate ?? (resource.canCreate || createButtonProps);

    const defaultExtra = isCreateButtonVisible && (
        <CreateButton
            size="middle"
            resourceName={resource.name}
            data-testid="list-create-button"
            {...createButtonProps}
        />
    );
    return (
        <Row gutter={[16, 16]}>
            <Col flex="1 1 200px">
                <PageHeader
                    ghost={false}
                    title={
                        title ??
                        translate(
                            `${resource.name}.titles.list`,
                            userFriendlyResourceName(resource.name, "plural"),
                        )
                    }
                    extra={defaultExtra}
                    {...pageHeaderProps}
                >
                    {children}
                </PageHeader>
            </Col>

            {Aside && <Col flex="0 1 300px">{Aside}</Col>}
        </Row>
    );
};
