import React from "react";
import {
    useOne,
    useTranslate,
    useResource,
    pickNotDeprecated,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { LoadingButton } from "@mui/lab";
import { RefreshOutlined } from "@mui/icons-material";

import { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    meta,
    metaData,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resource, id } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const translate = useTranslate();

    const { refetch, isFetching } = useOne({
        resource: resource?.name,
        id: recordItemId ?? id ?? "",
        queryOptions: {
            enabled: false,
        },
        meta: pickNotDeprecated(meta, metaData),
        metaData: pickNotDeprecated(meta, metaData),
        liveMode: "off",
        dataProviderName,
    });

    const { sx, ...restProps } = rest;

    return (
        <LoadingButton
            startIcon={!hideText && <RefreshOutlined {...svgIconProps} />}
            loading={isFetching}
            loadingPosition={hideText ? "center" : "start"}
            onClick={(e) => (onClick ? onClick(e) : refetch())}
            sx={{ minWidth: 0, ...sx }}
            data-testid={RefineButtonTestIds.RefreshButton}
            className={RefineButtonClassNames.RefreshButton}
            {...restProps}
        >
            {hideText ? (
                <RefreshOutlined fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.refresh", "Refresh")
            )}
        </LoadingButton>
    );
};
