import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";

import { useOne } from "@hooks";
import { MatchResourceName } from "@interfaces";

type RefreshButtonProps = ButtonProps & {
    resourceName?: string;
    itemId?: string | number;
};

export const RefreshButton: FC<RefreshButtonProps> = ({
    resourceName,
    itemId,
    ...rest
}) => {
    const match = useRouteMatch("/resources/:routeResourceName");

    const {
        params: { routeResourceName },
    } = (match as unknown) as MatchResourceName;

    const { refetch, isFetching } = useOne(
        resourceName ?? routeResourceName,
        `${itemId}`,
        { enabled: false },
    );

    return (
        <Button
            type="default"
            size="small"
            icon={<RedoOutlined spin={isFetching} />}
            onClick={() => refetch()}
            {...rest}
        >
            Refresh
        </Button>
    );
};
