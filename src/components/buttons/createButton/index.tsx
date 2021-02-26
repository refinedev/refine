import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { MatchRoute } from "@interfaces";

type CreateButtonProps = ButtonProps & {
    resourceName?: string;
};

export const CreateButton: FC<CreateButtonProps> = ({
    resourceName,
    ...rest
}) => {
    const history = useHistory();

    const match = useRouteMatch({
        path: ["/resources/:resourceName", "/*"],
    });

    const {
        params: { resourceName: routeResourceName },
    } = (match as unknown) as MatchRoute;

    return (
        <Button
            onClick={(): void =>
                history.push(
                    `/resources/${resourceName ?? routeResourceName}/create`,
                )
            }
            size="small"
            type="default"
            icon={<PlusSquareOutlined />}
            {...rest}
        >
            Create
        </Button>
    );
};
