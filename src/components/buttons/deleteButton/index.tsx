import React, { FC } from "react"
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";

import { useDelete } from "@hooks";
import { MatchResourceName } from "@interfaces";

type DeleteButtonProps = ButtonProps & {
    resourceName?: string;
    itemId: string | number;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ resourceName, itemId, ...rest }) =>
{
    const match = useRouteMatch("/resources/:routeResourceName")

    const { params: { routeResourceName } } = match as unknown as MatchResourceName

    const { mutate, isLoading } = useDelete(resourceName ?? routeResourceName);

    return (
        <Popconfirm
            key="delete"
            okText="Delete"
            okType="danger"
            title="Are you sure?"
            okButtonProps={{ disabled: isLoading }}
            onConfirm={(): void =>
            {
                mutate({ id: itemId });
            }}
        >
            <Button
                type="default"
                size="small"
                danger
                icon={<DeleteOutlined />}
                {...rest}
            >
                Delete
                </Button>
        </Popconfirm>
    )
}