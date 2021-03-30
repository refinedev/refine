import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

import { MatchRoute, ResourceRouterParams } from "../../../interfaces";
import humanizeString from "humanize-string";
import { useTranslate } from "@hooks";

type ListButtonProps = ButtonProps & {
    resourceName?: string;
};

export const ListButton: FC<ListButtonProps> = ({
    resourceName: propResourceName,
    ...rest
}) => {
    const history = useHistory();
    const translate = useTranslate();

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void => history.push(`/resources/${resourceName}`)}
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
