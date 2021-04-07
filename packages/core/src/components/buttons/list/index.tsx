import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import humanizeString from "humanize-string";

import { useNavigation, useTranslate } from "@hooks";
import { ResourceRouterParams } from "../../../interfaces";

type ListButtonProps = ButtonProps & {
    resourceName?: string;
};

export const ListButton: FC<ListButtonProps> = ({
    resourceName: propResourceName,
    ...rest
}) => {
    const { list } = useNavigation();
    const translate = useTranslate();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void => list(resourceName, "push")}
            type="default"
            icon={<BarsOutlined />}
            {...rest}
        >
            {translate(
                `common.resources.${resourceName}.title`,
                humanizeString(resourceName),
            )}
        </Button>
    );
};
