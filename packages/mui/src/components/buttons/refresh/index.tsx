import React from "react";
import { useRefreshButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";

import type { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses uses Material UI {@link https://mui.com/material-ui/react-button `<Button>`} component
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
  const {
    onClick: onRefresh,
    loading,
    label,
  } = useRefreshButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    dataProviderName,
  });

  const { sx, ...restProps } = rest;

  return (
    <LoadingButton
      startIcon={!hideText && <RefreshOutlined {...svgIconProps} />}
      loading={loading}
      loadingPosition={hideText ? "center" : "start"}
      onClick={onClick ? onClick : onRefresh}
      sx={{ minWidth: 0, ...sx }}
      data-testid={RefineButtonTestIds.RefreshButton}
      className={RefineButtonClassNames.RefreshButton}
      {...restProps}
    >
      {hideText ? (
        <RefreshOutlined fontSize="small" {...svgIconProps} />
      ) : (
        children ?? label
      )}
    </LoadingButton>
  );
};
