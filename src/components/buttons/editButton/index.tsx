import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";

import { useTranslate } from "@hooks";
import { MatchRoute } from "@interfaces";

type EditButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string | number;
};

export const EditButton: FC<EditButtonProps> = ({
    resourceName,
    recordItemId,
    ...rest
}) => {
    const history = useHistory();
    const translate = useTranslate();

    const match = useRouteMatch({
        path: [
            "/resources/:resourceName/:action/:id",
            "/resources/:resourceName",
            "/*",
        ],
    });

    const {
        params: { resourceName: routeResourceName, id: idFromRoute },
    } = (match as unknown) as MatchRoute;

    return (
        <Button
            onClick={(): void => {
                history.push(
                    `/resources/${resourceName ?? routeResourceName}/edit/${
                        recordItemId ?? idFromRoute
                    }`,
                );
            }}
            type="default"
            icon={<EditOutlined />}
            {...rest}
        >
            {translate("common:buttons.edit", "Edit")}
        </Button>
    );
};
