import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Row,
    Space,
    ButtonProps,
    PageHeader,
    PageHeaderProps,
} from "antd";
import pluralize from "pluralize";

import { MutationMode, ResourceRouterParams } from "../../../interfaces";
import {
    useResourceWithRoute,
    useMutationMode,
    useNavigation,
    useTranslate,
} from "@hooks";
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
    pageHeaderProps?: PageHeaderProps;
    canDelete?: boolean;
    deleteButtonProps?: DeleteButtonProps;
    resource?: string;
}

export const Edit: React.FC<EditProps> = ({
    title,
    actionButtons,
    saveButtonProps,
    mutationMode: mutationModeProp,
    recordItemId,
    children,
    deleteButtonProps,
    pageHeaderProps,
    canDelete,
    resource: resourceFromProps,
}) => {
    const translate = useTranslate();
    const { push, goBack } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(routeResourceName ?? resourceFromProps);

    const isDeleteButtonVisible = canDelete
        ? canDelete
        : resource.canDelete || deleteButtonProps;

    return (
        <PageHeader
            ghost={false}
            onBack={goBack}
            title={
                title ??
                translate(
                    `common:resources.${resource.name}.Edit`,
                    `Edit ${pluralize.singular(resource.name)}`,
                )
            }
            extra={
                <Row>
                    <Space>
                        {!recordItemId && (
                            <ListButton resourceName={resource.name} />
                        )}
                        <RefreshButton
                            resourceName={resource.name}
                            recordItemId={recordItemId ?? idFromRoute}
                        />
                    </Space>
                </Row>
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
                            <>
                                {isDeleteButtonVisible && (
                                    <DeleteButton
                                        mutationMode={mutationMode}
                                        onSuccess={() => {
                                            return push(
                                                `/resources/${resource.route}`,
                                            );
                                        }}
                                        {...deleteButtonProps}
                                    />
                                )}
                                <SaveButton {...saveButtonProps} />
                            </>
                        )}
                    </Space>,
                ]}
            >
                {children}
            </Card>
        </PageHeader>
    );
};
