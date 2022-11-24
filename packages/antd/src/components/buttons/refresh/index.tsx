import React from "react";
import { Button } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useOne, useTranslate, useResource } from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";

import { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resourceName: propResourceName,
    resourceNameOrRouteName: propResourceNameOrRouteName,
    recordItemId,
    hideText = false,
    metaData,
    dataProviderName,
    children,
    onClick,
    ...rest
}) => {
    const translate = useTranslate();

    const { resourceName, id } = useResource({
        resourceName: propResourceName,
        resourceNameOrRouteName: propResourceNameOrRouteName,
        recordItemId,
    });

    const { refetch, isFetching } = useOne({
        resource: resourceName,
        id: id ?? "",
        queryOptions: {
            enabled: false,
        },
        metaData,
        liveMode: "off",
        dataProviderName,
    });

    return (
        <Button
            onClick={(e) => (onClick ? onClick(e) : refetch())}
            icon={<RedoOutlined spin={isFetching} />}
            data-testid={RefineButtonTestIds.RefreshButton}
            {...rest}
        >
            {!hideText && (children ?? translate("buttons.refresh", "Refresh"))}
        </Button>
    );
};
