import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { MutationMode } from "../../../interfaces";
import { useTranslate, useResourceWithRoute, useMutationMode } from "@hooks";
import { ResourceRouterParams } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    children,
}) => {
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
                        <ListButton />
                        <RefreshButton />
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
                            <DeleteButton mutationMode={mutationMode} />
                            <Button
                                {...saveButtonProps}
                                htmlType="submit"
                                type="primary"
                                icon={<SaveOutlined />}
                            >
                                {translate("common:buttons.save", "Save")}
                            </Button>
                        </>
                    )}
                </Space>,
            ]}
        >
            {children}
        </Card>
    );
};
