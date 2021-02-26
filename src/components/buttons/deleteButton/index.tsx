import React, { FC } from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";

import { useDelete } from "@hooks";
import { MatchRoute, DeleteOneResponse } from "@interfaces";

type DeleteButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
    onDelete?: (value: DeleteOneResponse) => void;
};

export const DeleteButton: FC<DeleteButtonProps> = ({
    resourceName,
    recordItemId,
    onDelete,
    ...rest
}) => {
    const match = useRouteMatch({
        path: [
            "/resources/:resourceName/:action/:id",
            "/resources/:resourceName",
            "/*",
        ],
    });

    const {
        params: { resourceName: routeResourceName, id: idFromRoute },
    } = (match as unknown) as MatchRoute;

    const { mutateAsync, isLoading } = useDelete(
        resourceName ?? routeResourceName,
    );

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
                        onDelete && onDelete(value);
                    },
                );
            }}
        >
            <Button type="default" danger icon={<DeleteOutlined />} {...rest}>
                Delete
            </Button>
        </Popconfirm>
    );
};
