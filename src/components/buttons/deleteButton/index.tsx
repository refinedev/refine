import React, { FC } from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { useDelete, useTranslate } from "@hooks";
import { MatchRoute, DeleteOneResponse } from "@interfaces";

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

    const resourceName = propResourceName ?? routeResourceName;

    const { mutateAsync, isLoading } = useDelete(resourceName);

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
