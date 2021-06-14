import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type ShowButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
};

export const ShowButton: FC<ShowButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    children,
    ...rest
}) => {
    const { show } = useNavigation();
    const translate = useTranslate();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void =>
                show(resourceName, "push", recordItemId ?? idFromRoute)
            }
            icon={<EyeOutlined />}
            {...rest}
        >
            {children ?? translate("buttons.show", "Show")}
        </Button>
    );
};
