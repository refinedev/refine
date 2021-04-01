import React from "react";
import { useParams } from "react-router-dom";
import { Card, Space, ButtonProps } from "antd";
import pluralize from "pluralize";

import { useResourceWithRoute, useTranslate } from "@hooks";
import { SaveButton } from "@components";
import { ResourceRouterParams } from "../../../interfaces";

export interface CreateProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
}

export const Create: React.FC<CreateProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    children,
}) => {
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const translate = useTranslate();

    return (
        <Card
            title={
                title ??
                translate(
                    `common:resources.${resource.name}.Create`,
                    `Create ${pluralize.singular(resource.name)}`,
                )
            }
            actions={[
                <Space
                    key="action-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    {actionButtons ?? (
                        <SaveButton {...saveButtonProps} htmlType="submit" />
                    )}
                </Space>,
            ]}
        >
            {children}
        </Card>
    );
};
