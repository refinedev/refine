import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { MatchRoute } from "@interfaces";

type ShowButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const ShowButton: FC<ShowButtonProps> = ({
    resourceName,
    recordItemId,
    ...rest
}) => {
    const history = useHistory();

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

    return (
        <Button
            onClick={(): void =>
                history.push(
                    `/resources/${resourceName ?? routeResourceName}/show/${
                        recordItemId ?? idFromRoute
                    }`,
                )
            }
            size="small"
            type="default"
            icon={<EyeOutlined />}
            {...rest}
        >
            Show
        </Button>
    );
};
