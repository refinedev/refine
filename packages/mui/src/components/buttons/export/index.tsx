import React from "react";
import { useTranslate } from "@pankod/refine-core";

import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { SvgIconProps } from "@mui/material";

export type ExportButtonProps = LoadingButtonProps & {
    hideText?: boolean;
    loading?: boolean;
    svgIconProps?: SvgIconProps;
};

/**
 * `<ExportButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
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
            sx={{ minWidth: 0, ...sx }}
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
