import React, { FC } from "react"
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { MatchResourceName } from "@interfaces";

type CreateButtonProps = ButtonProps & {
    resourceName?: string
}

export const CreateButton: FC<CreateButtonProps> = ({resourceName, ...rest}) => {
    const history = useHistory();

    const match = useRouteMatch("/resources/:routeResourceName")

    const {params: {routeResourceName}} = match as unknown as MatchResourceName

    return (
        <Button
            onClick={(): void =>
                history.push(
                    `/resources/${resourceName ?? routeResourceName}/create`,
                )
            }
            type="default"
            icon={<PlusSquareOutlined />}
            {...rest}
        >
            Create
        </Button>
    )
}