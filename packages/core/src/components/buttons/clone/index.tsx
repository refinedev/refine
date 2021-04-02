import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

import { useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type CloneButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const CloneButton: FC<CloneButtonProps> = ({
    resourceName,
    recordItemId,
    ...rest
}) => {
    const history = useHistory();
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const onButtonClick = () => {
        history.push(
            `/resources/${resourceName ?? routeResourceName}/create/${
                recordItemId ?? idFromRoute
            }`,
        );
    };

    return (
        <Button
            onClick={onButtonClick}
            type="default"
            icon={<PlusSquareOutlined />}
            {...rest}
        >
            {translate("common:buttons.clone", "Clone")}
        </Button>
    );
};
