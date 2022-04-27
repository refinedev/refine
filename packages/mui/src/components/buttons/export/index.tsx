import React from "react";
import { useTranslate } from "@pankod/refine-core";

import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";

export type ExportButtonProps = LoadingButtonProps & {
    hideText?: boolean;
    loading?: boolean;
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
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <LoadingButton
            {...rest}
            loading={loading}
            startIcon={!hideText && <ImportExportOutlinedIcon />}
        >
            {hideText ? (
                <ImportExportOutlinedIcon />
            ) : (
                children ?? translate("LoadingButtons.export", "Export")
            )}
        </LoadingButton>
    );
};
