import React from "react";

import { LoadingButton } from "@mui/lab";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

import { useTranslate, UseImportInputPropsType } from "@pankod/refine-core";

export type ImportButtonProps = {
    inputProps: UseImportInputPropsType;
    hideText?: boolean;
    loading?: boolean;
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
    children,
}) => {
    const translate = useTranslate();

    return (
        <label htmlFor="contained-button-file">
            <input {...inputProps} id="contained-button-file" multiple hidden />
            <LoadingButton
                component="span"
                startIcon={!hideText && <ImportExportOutlinedIcon />}
                loading={loading}
            >
                {hideText ? (
                    <ImportExportOutlinedIcon />
                ) : (
                    children ?? translate("buttons.import", "Import")
                )}
            </LoadingButton>
        </label>
    );
};
