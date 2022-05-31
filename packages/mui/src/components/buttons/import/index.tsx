import React from "react";

import { LoadingButton } from "@mui/lab";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

import { useTranslate, UseImportInputPropsType } from "@pankod/refine-core";
import { SvgIconProps } from "@mui/material";

export type ImportButtonProps = {
    inputProps: UseImportInputPropsType;
    hideText?: boolean;
    loading?: boolean;
    svgIconProps?: SvgIconProps;
};

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses Material UI {@link https://mui.com/components/buttons/  `<Button>`} .
 *
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
    inputProps,
    hideText = false,
    loading = false,
    svgIconProps,
    children,
}) => {
    const translate = useTranslate();

    return (
        <label htmlFor="contained-button-file">
            <input {...inputProps} id="contained-button-file" multiple hidden />
            <LoadingButton
                component="span"
                startIcon={
                    !hideText && <ImportExportOutlinedIcon {...svgIconProps} />
                }
                loading={loading}
            >
                {hideText ? (
                    <ImportExportOutlinedIcon {...svgIconProps} />
                ) : (
                    children ?? translate("buttons.import", "Import")
                )}
            </LoadingButton>
        </label>
    );
};
