import React, { FC } from "react"
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

type EditButtonProps = ButtonProps & {
    resourceName: string;
    itemId: string | number;
}

export const EditButton: FC<EditButtonProps> = ({ resourceName, itemId, ...rest }) =>
{
    const history = useHistory();

    return (
        <Button
            onClick={(): void =>
            {
                history.push(
                    `/resources/${resourceName}/edit/${itemId}`,
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