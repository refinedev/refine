import React, { FC } from "react"
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

type MatchType = {
    params: {
        resourceName: string;
    }
}
type CreateButtonProps = ButtonProps & {
    resourceName?: string
}

export const CreateButton: FC<CreateButtonProps> = ({resourceName, ...rest}) => {
    const history = useHistory();

    const match = useRouteMatch("/resources/:resourceName")

    const {params: {resourceName: routeResourceName}} = match as unknown as MatchType

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