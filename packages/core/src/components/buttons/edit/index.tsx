import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type EditButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
};

export const EditButton: FC<EditButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    ...rest
}) => {
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const { edit } = useNavigation();

    const id = recordItemId ?? idFromRoute;

    return (
        <Button
            onClick={(): void => {
                edit(resourceName, "push", id);
            }}
            type="default"
            icon={<EditOutlined />}
            {...rest}
        >
            {translate("buttons.edit", "Edit")}
        </Button>
    );
};
