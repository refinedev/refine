import React from "react";
import { useTranslate } from "@pankod/refine-core";

import { Button, ButtonProps } from "@mui/material";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

export type ExportButtonProps = ButtonProps & {
    hideText?: boolean;
};

/**
 * `<ExportButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <>
            <Button
                {...rest}
                startIcon={!hideText && <ImportExportOutlinedIcon />}
            >
                {hideText ? (
                    <ImportExportOutlinedIcon />
                ) : (
                    children ?? translate("buttons.export", "Export")
                )}
            </Button>
        </>
    );
};
