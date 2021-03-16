import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";
// import { useHistory, useParams } from "react-router-dom";

import { useTranslate } from "@hooks";
// import { ResourceRouterParams } from "@interfaces";

type ExportButtonProps = ButtonProps & {
    resourceName?: string;
};

export const ExportButton: FC<ExportButtonProps> = ({
    resourceName,
    ...rest
}) => {
    // const history = useHistory();
    const translate = useTranslate();

    console.log("resourceName", resourceName);

    // const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    return (
        <Button
            // onClick={(): void =>
            //     history.push(
            //         `/resources/${resourceName ?? routeResourceName}/create`,
            //     )
            // }
            type="default"
            icon={<ExportOutlined />}
            {...rest}
        >
            {translate("common:buttons.export", "Export")}
        </Button>
    );
};
