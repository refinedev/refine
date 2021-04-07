import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type ShowButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const ShowButton: FC<ShowButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    ...rest
}) => {
    const { show } = useNavigation();
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void =>
                show(resourceName, "push", recordItemId ?? idFromRoute)
            }
            type="default"
            icon={<EyeOutlined />}
            {...rest}
        >
            {translate("common:buttons.show", "Show")}
        </Button>
    );
};
