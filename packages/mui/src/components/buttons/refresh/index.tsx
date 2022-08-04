import React from "react";
import { useOne, useTranslate, useResource } from "@pankod/refine-core";
import {
    RefineButtonTestIds,
    RefineRefreshButtonProps,
} from "@pankod/refine-ui-types";
import { ButtonProps, SvgIconProps } from "@mui/material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { LoadingButton } from "@mui/lab";

export type RefreshButtonProps = RefineRefreshButtonProps<
    ButtonProps,
    {
        svgIconProps?: SvgIconProps;
    }
>;

/**
 * `<RefreshButton>` uses uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} component
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    metaData,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

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

    const { sx, ...restProps } = rest;

    return (
        <LoadingButton
            startIcon={!hideText && <RefreshOutlinedIcon {...svgIconProps} />}
            loading={isFetching}
            loadingPosition={hideText ? "center" : "start"}
            onClick={(e) => (onClick ? onClick(e) : refetch())}
            sx={{ minWidth: 0, ...sx }}
            data-testid={RefineButtonTestIds.RefreshButton}
            {...restProps}
        >
            {hideText ? (
                <RefreshOutlinedIcon fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.refresh", "Refresh")
            )}
        </LoadingButton>
    );
};
