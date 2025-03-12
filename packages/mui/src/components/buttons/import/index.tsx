import React from "react";
import { useImportButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import LoadingButton from "@mui/lab/LoadingButton";
import ImportExportOutlined from "@mui/icons-material/ImportExportOutlined";

import type { ImportButtonProps } from "../types";

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/api-reference/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses Material UI {@link https://mui.com/material-ui/react-button  `<Button>`} and native html {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input  `<input>`} element.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
  inputProps,
  hideText = false,
  loading = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useImportButton();

  const { sx, ...restProps } = rest;

  return (
    <label htmlFor="contained-button-file">
      <input {...inputProps} id="contained-button-file" multiple hidden />
      <LoadingButton
        component="span"
        startIcon={!hideText && <ImportExportOutlined {...svgIconProps} />}
        loadingPosition={hideText ? "center" : "start"}
        loading={loading}
        sx={{ minWidth: 0, ...sx }}
        data-testid={RefineButtonTestIds.ImportButton}
        className={RefineButtonClassNames.ImportButton}
        {...restProps}
      >
        {hideText ? (
          <ImportExportOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children ?? label
        )}
      </LoadingButton>
    </label>
  );
};
