import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

import { useTranslate } from "@hooks";
import { ResourceRouterParams } from "@interfaces";

type CreateButtonProps = ButtonProps & {
                                resourceName?: string;
                                isModalShown?: () => void;
};

export const CreateButton: FC<CreateButtonProps> = ({
    resourceName,
    isModalShown,
    ...rest
}) => {
    const history = useHistory();
    const translate = useTranslate();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const onButtonClick = () => {
        isModalShown
            ? isModalShown()
            : history.push(
                  `/resources/${resourceName ?? routeResourceName}/create`,
              );
    };

    return (
        <Button
            onClick={onButtonClick}
            type="default"
            icon={<PlusSquareOutlined />}
            {...rest}
        >
            {translate("common:buttons.create", "Create")}
        </Button>
    );
};
