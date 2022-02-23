import React from "react";
import { Button, ButtonProps } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import {
    useOne,
    useResourceWithRoute,
    useRouterContext,
    useTranslate,
    MetaDataQuery,
    ResourceRouterParams,
    BaseKey,
} from "@pankod/refine-core";

export type RefreshButtonProps = ButtonProps & {
    resourceName?: string;
    recordItemId?: BaseKey;
    hideText?: boolean;
    metaData?: MetaDataQuery;
    dataProviderName?: string;
};

/**
 * `<RefreshButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    metaData,
    dataProviderName,
    children,
    ...rest
}) => {
    const translate = useTranslate();
    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceName = propResourceName ?? routeResourceName;

    const resource = resourceWithRoute(resourceName);

    const id = recordItemId ?? idFromRoute;

    const { refetch, isFetching } = useOne({
        resource: resource.name,
        id,
        queryOptions: {
            enabled: false,
        },
        metaData,
        liveMode: "off",
        dataProviderName,
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
