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
}) => {
    const translate = useTranslate();
    const { goBack, list } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(routeResourceName);

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
                        {!recordItemId && <ListButton />}
                        <RefreshButton recordItemId={recordItemId} />
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
                                            list(resource.route ?? resource.name)
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
