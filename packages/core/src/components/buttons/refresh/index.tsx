import React, { FC } from "react";
import { Button, ButtonProps } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import { useOne, useResourceWithRoute, useTranslate } from "@hooks";
import { MetaDataQuery, ResourceRouterParams } from "../../../interfaces";

type RefreshButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: string;
    hideText?: boolean;
    metaData?: MetaDataQuery;
};

/**
 * `<RefreshButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-references/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/api-references/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: FC<RefreshButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    metaData,
    children,
    ...rest
}) => {
    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const resource = resourceWithRoute(resourceName);

    const { refetch, isFetching } = useOne({
        resource: resource.name,
        id: `${recordItemId ?? idFromRoute}`,
        queryOptions: {
            enabled: false,
        },
        metaData,
    });

    return (
        <Button
            icon={<RedoOutlined spin={isFetching} />}
            onClick={() => refetch()}
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.refresh", "Refresh"))}
        </Button>
    );
};
