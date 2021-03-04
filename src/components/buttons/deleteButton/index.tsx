import React, { FC } from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

import { useDelete, useResourceWithRoute, useTranslate } from "@hooks";
import { DeleteOneResponse, ResourceRouterParams } from "@interfaces";

type DeleteButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
    onSuccess?: (value: DeleteOneResponse) => void;
};

export const DeleteButton: FC<DeleteButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    onSuccess,
    ...rest
}) => {
    const history = useHistory();

    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const resource = useResourceWithRoute(resourceName);

    const { mutateAsync, isLoading } = useDelete(resource.name);

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
                        onSuccess
                            ? onSuccess(value)
                            : history.push(`/resources/${resourceName}`);
                    },
                );
            }}
        >
            <Button type="default" danger icon={<DeleteOutlined />} {...rest}>
                {translate("common:buttons.delete", "Delete")}
            </Button>
        </Popconfirm>
    );
};
