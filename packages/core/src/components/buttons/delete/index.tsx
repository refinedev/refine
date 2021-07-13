import React, { FC } from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import {
    useDelete,
    useResourceWithRoute,
    useTranslate,
    useMutationMode,
} from "@hooks";
import {
    DeleteOneResponse,
    ResourceRouterParams,
    MutationMode,
    SuccessErrorNotification,
} from "../../../interfaces";

export type DeleteButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
    onSuccess?: (value: DeleteOneResponse) => void;
    mutationMode?: MutationMode;
} & SuccessErrorNotification;

export const DeleteButton: FC<DeleteButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    children,
    successNotification,
    errorNotification,
    ...rest
}) => {
    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const resource = resourceWithRoute(resourceName);

    const { mutate, isLoading, variables } = useDelete();

    const id = recordItemId ?? idFromRoute;

    return (
        <Popconfirm
            key="delete"
            okText={translate("buttons.delete", "Delete")}
            cancelText={translate("buttons.cancel", "Cancel")}
            okType="danger"
            title={translate("buttons.confirm", "Are you sure?")}
            okButtonProps={{ disabled: isLoading }}
            onConfirm={(): void => {
                mutate(
                    {
                        id: id,
                        resource: resource.name,
                        mutationMode,
                        successNotification,
                        errorNotification,
                    },
                    {
                        onSuccess: (value) => {
                            onSuccess && onSuccess(value);
                        },
                    },
                );
            }}
        >
            <Button
                danger
                loading={id === variables?.id && isLoading}
                icon={<DeleteOutlined />}
                {...rest}
            >
                {children ?? translate("buttons.delete", "Delete")}
            </Button>
        </Popconfirm>
    );
};
