import React, { FC } from "react";
import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { useDelete, useTranslate, useMutationMode } from "@hooks";
import { MatchRoute, DeleteOneResponse, MutationMode } from "@interfaces";

type DeleteButtonProps = ButtonProps & {
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
    const history = useHistory();
    const translate = useTranslate();
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

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

    const { mutateAsync, isLoading } = useDelete(resourceName, mutationMode);

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
