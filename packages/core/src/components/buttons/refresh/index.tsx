import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useOne, useResourceWithRoute, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type RefreshButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const RefreshButton: FC<RefreshButtonProps> = ({
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

    const resource = useResourceWithRoute(resourceName);

    const { refetch, isFetching } = useOne(
        resource.name,
        `${recordItemId ?? idFromRoute}`,
        { enabled: false },
    );

    return (
        <Button
            type="default"
            icon={<RedoOutlined spin={isFetching} />}
            onClick={() => refetch()}
            {...rest}
        >
            {translate("common:buttons.refresh", "Refresh")}
        </Button>
    );
};
