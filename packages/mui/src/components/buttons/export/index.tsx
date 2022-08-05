import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineExportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { SvgIconProps } from "@mui/material";

export type ExportButtonProps = RefineExportButtonProps<
    LoadingButtonProps,
    {
        svgIconProps?: SvgIconProps;
    }
>;

/**
 * `<ExportButton>` uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    loading = false,
    svgIconProps,
    ...rest
}) => {
    const translate = useTranslate();

    const { sx, ...restProps } = rest;

    return (
        <LoadingButton
            {...rest}
            loading={loading}
            startIcon={
                !hideText && <ImportExportOutlinedIcon {...svgIconProps} />
            }
            loadingPosition={hideText ? "center" : "start"}
            sx={{ minWidth: 0, ...sx }}
            data-testid={RefineButtonTestIds.ExportButton}
            {...restProps}
        >
            {hideText ? (
                <ImportExportOutlinedIcon fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.export", "Export")
            )}
        </LoadingButton>
    );
};
