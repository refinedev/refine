import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";

import { MutationMode, ResourceRouterParams } from "../../../interfaces";
import { useTranslate, useResourceWithRoute, useMutationMode } from "@hooks";
import {
    DeleteButton,
    RefreshButton,
    ListButton,
    DeleteButtonProps,
    SaveButton,
} from "@components";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
    recordItemId?: string | number;
    deleteButtonProps?: DeleteButtonProps;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
}) => {
    const history = useHistory();
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);
    const translate = useTranslate();

    return (
        <Card
            title={title ?? `Edit ${pluralize.singular(resource.name)}`}
            extra={
                <Row>
                    <Space>
                        {!recordItemId && <ListButton />}
                        <RefreshButton recordItemId={recordItemId} />
                    </Space>
                </Row>
            }
            actions={[
                <Space
                    key="action-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    {actionButtons ?? (
                        <>
                            <DeleteButton
                                {...deleteButtonProps}
                                mutationMode={mutationMode}
                                onSuccess={() => {
                                    return history.push(
                                        `/resources/${resource.name}`,
                                    );
                                }}
                            />
                            <SaveButton {...saveButtonProps} />
                        </>
                    )}
                </Space>,
            ]}
        >
            {children}
        </Card>
    );
};
