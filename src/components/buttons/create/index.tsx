import React, { FC } from "react"
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

type CreateButtonProps = ButtonProps & {
    resourceName: string
}

export const CreateButton: FC<CreateButtonProps> = ({resourceName}) => {
    const history = useHistory();

    return (
        <Button
            onClick={(): void =>
                history.push(
                    `/resources/${resourceName}/create`,
                )
            }
            type="default"
            icon={<PlusSquareOutlined />}
        >
            Create
        </Button>
    )
}