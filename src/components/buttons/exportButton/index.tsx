import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useList, useTranslate } from "@hooks";
import { ResourceRouterParams, Sort, Filters } from "@interfaces";

type ExportButtonProps = ButtonProps & {
    resourceName?: string;
    sorter?: Sort;
    filters?: Filters;
    maxItemCount?: number;
    pageSize?: number;
};

export const ExportButton: FC<ExportButtonProps> = ({
    resourceName,
    sorter,
    filters,
    maxItemCount,
    pageSize = 20,
    ...rest
}) => {
    const translate = useTranslate();

    let { resource } = useParams<ResourceRouterParams>();

    if (resourceName) {
        resource = resourceName;
    }

    const { data, refetch } = useList(resource, {
        pagination: { current: 1, pageSize: 20 },
        filters,
        sort: sorter,
    });

    console.log("data", data);

    return (
        <Button
            onClick={() => {
                console.log("resource", resource);
            }}
            type="default"
            icon={<ExportOutlined />}
            {...rest}
        >
            {translate("common:buttons.export", "Export")}
        </Button>
    );
};
