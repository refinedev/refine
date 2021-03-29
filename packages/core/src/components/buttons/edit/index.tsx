import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

import { useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type EditButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const EditButton: FC<EditButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    ...rest
}) => {
    const history = useHistory();
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void => {
                history.push(
                    `/resources/${resourceName}/edit/${
                        recordItemId ?? idFromRoute
                    }`,
                );
            }}
            type="default"
            icon={<EditOutlined />}
            {...rest}
        >
            {translate("common:buttons.edit", "Edit")}
        </Button>
    );
};
