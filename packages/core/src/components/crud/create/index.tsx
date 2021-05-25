import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Space,
    ButtonProps,
    PageHeader,
    PageHeaderProps,
    Tag,
} from "antd";
import pluralize from "pluralize";

import { useNavigation, useResourceWithRoute, useTranslate } from "@hooks";
import { SaveButton } from "@components";
import { ResourceRouterParams } from "../../../interfaces";

export interface CreateProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    pageHeaderProps?: PageHeaderProps;
    resource?: string;
}

export const Create: React.FC<CreateProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
    pageHeaderProps,
    resource: resourceFromProps,
}) => {
    const { goBack } = useNavigation();
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName ?? resourceFromProps);

    const tags = [];
    if (idFromRoute) {
        tags.push(<Tag color="blue">{translate("tags.clone", "Clone")}</Tag>);
    }

    return (
        <PageHeader
            ghost={false}
            onBack={goBack}
            tags={tags}
            title={
                title ??
                translate(
                    `${resource.name}.titles.create`,
                    `Create ${pluralize.singular(resource.name)}`,
                )
            }
            {...pageHeaderProps}
        >
            <Card
                actions={[
                    <Space
                        key="action-buttons"
                        style={{ float: "right", marginRight: 24 }}
                    >
                        {actionButtons ?? (
                            <SaveButton
                                {...saveButtonProps}
                                htmlType="submit"
                            />
                        )}
                    </Space>,
                ]}
            >
                {children}
            </Card>
        </PageHeader>
    );
};
