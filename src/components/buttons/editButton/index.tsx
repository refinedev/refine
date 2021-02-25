import React, { FC } from "react"
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { MatchResourceName } from "@interfaces";

type EditButtonProps = ButtonProps & {
    resourceName?: string;
    itemId: string | number;
}

export const EditButton: FC<EditButtonProps> = ({ resourceName, itemId, ...rest }) =>
{
    const history = useHistory();

    const match = useRouteMatch("/resources/:routeResourceName")

    const { params: { routeResourceName } } = match as unknown as MatchResourceName

    return (
        <Button
            onClick={(): void =>
            {
                history.push(
                    `/resources/${resourceName ?? routeResourceName}/edit/${itemId}`,
                );
            }}
            type="default"
            size="small"
            icon={<EditOutlined />}
            {...rest}
        >
            Edit
        </Button>
    )
}