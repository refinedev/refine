import React from "react";
import { useParams, Prompt } from "react-router-dom";
import { Card, Button, Row, Space, ButtonProps } from "antd";
import pluralize from "pluralize";
import { SaveOutlined } from "@ant-design/icons";

import { MutationMode } from "../../../interfaces";
import {
    useTranslate,
    useResourceWithRoute,
    useMutationMode,
    useWarnAboutChange,
} from "@hooks";
import { ResourceRouterParams } from "@interfaces";
import { DeleteButton, RefreshButton, ListButton } from "@components";

export interface EditProps {
    title?: string;
    actionButtons?: React.ReactNode;
    saveButtonProps?: ButtonProps;
    mutationMode?: MutationMode;
    warnWhenUnsavedChanges?: boolean;
    warnWhen?: boolean;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    warnWhen,
    children,
}) => {
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

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
                                htmlType="submit"
                                type="primary"
                                icon={<SaveOutlined />}
                                {...saveButtonProps}
                            >
                                {translate("common:buttons.save", "Save")}
                            </Button>
                        </>
                    )}
                </Space>,
            ]}
        >
            <>
                <Prompt
                    when={warnWhen}
                    message="Are you sure you want to leave? You have with unsaved changes."
                />
                {children}
            </>
        </Card>
    );
};
