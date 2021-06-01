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
} from "../../../interfaces";

export type DeleteButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
    onSuccess?: (value: DeleteOneResponse) => void;
    mutationMode?: MutationMode;
};

export const DeleteButton: FC<DeleteButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    ...rest
}) => {
    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const resource = resourceWithRoute(resourceName);

    const { mutateAsync, isLoading } = useDelete(resource.name, mutationMode);

    return (
        <Popconfirm
            key="delete"
            okText="Delete"
            okType="danger"
            title="Are you sure?"
            okButtonProps={{ disabled: isLoading }}
            onConfirm={(): void => {
                mutateAsync({ id: recordItemId ?? idFromRoute }).then(
                    (value) => {
                        onSuccess && onSuccess(value);
                    },
                );
            }}
        >
            <Button
                type="default"
                danger
                loading={isLoading}
                icon={<DeleteOutlined />}
                {...rest}
            >
                {translate("buttons.delete", "Delete")}
            </Button>
        </Popconfirm>
    );
};
