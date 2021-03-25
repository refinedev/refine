import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

import { useTranslate } from "@hooks";
import { ResourceRouterParams } from "@interfaces";

type ShowButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const ShowButton: FC<ShowButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    ...rest
}) => {
    const history = useHistory();
    const translate = useTranslate();

    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    return (
        <Button
            onClick={(): void =>
                history.push(
                    `/resources/${resourceName}/show/${
                        recordItemId ?? idFromRoute
                    }`,
                )
            }
            type="default"
            icon={<EyeOutlined />}
            {...rest}
        >
            {translate("common:buttons.show", "Show")}
        </Button>
    );
};
