import React, { FC } from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";

import { useDelete } from "@hooks";
import { MatchRoute } from "@interfaces";

type DeleteButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const DeleteButton: FC<DeleteButtonProps> = ({
    resourceName,
    recordItemId,
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

    const { mutate, isLoading } = useDelete(resourceName ?? routeResourceName);

    return (
        <Popconfirm
            key="delete"
            okText="Delete"
            okType="danger"
            title="Are you sure?"
            okButtonProps={{ disabled: isLoading }}
            onConfirm={(): void => {
                mutate({ id: recordItemId ?? idFromRoute });
            }}
        >
            <Button type="default" danger icon={<DeleteOutlined />} {...rest}>
                Delete
            </Button>
        </Popconfirm>
    );
};
