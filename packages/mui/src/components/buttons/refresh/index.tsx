import React from "react";
import {
    useTranslate,
    useResource,
    useInvalidate,
    queryKeys,
    pickDataProvider,
} from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";

import { RefreshButtonProps } from "../types";

import { useQueryClient } from "@tanstack/react-query";

/**
 * `<RefreshButton>` uses uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/api-reference/core/hooks/invalidate/useInvalidate `useInvalidate`} hook.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resource: resourceNameFromProps,
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    meta: _meta,
    metaData: _metaData,
    ...rest
}) => {
    const translate = useTranslate();

    const queryClient = useQueryClient();
    const invalidates = useInvalidate();

    const { resources, identifier, id } = useResource(
        resourceNameFromProps ?? resourceNameOrRouteName,
    );

    const isInvalidating = !!queryClient.isFetching({
        queryKey: queryKeys(
            identifier,
            pickDataProvider(identifier, dataProviderName, resources),
        ).detail(recordItemId ?? id),
    });

    const handleInvalidate = () => {
        invalidates({
            id: recordItemId ?? id,
            invalidates: ["detail"],
            dataProviderName,
            resource: identifier,
        });
    };

    const { sx, ...restProps } = rest;

    return (
        <LoadingButton
            startIcon={!hideText && <RefreshOutlined {...svgIconProps} />}
            loading={isInvalidating}
            loadingPosition={hideText ? "center" : "start"}
            onClick={(e) => {
                onClick ? onClick(e) : handleInvalidate();
            }}
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
