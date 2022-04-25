import React from "react";

import { Button, ButtonProps } from "@mui/material";
import { useTranslate } from "@pankod/refine-core";
import { styled } from "@mui/material/styles";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";

export type ImportButtonProps = {
    buttonProps: ButtonProps;
    hideText?: boolean;
};

/**
 * `<ImportButton>` is compatible with the {@link `useImport`} hook and is meant to be used as it's upload button.
 * It uses Material UI {@link https://mui.com/components/buttons/  `<Button>`} .
 *
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
    buttonProps,
    hideText = false,
    children,
}) => {
    const translate = useTranslate();

    const Input = styled("input")({
        display: "none",
    });

    return (
        <label htmlFor="import-button">
            <Input
                data-testid="import-input"
                id="contained-button-file"
                multiple
                type="file"
            />
            <Button
                startIcon={!hideText && <ImportExportOutlinedIcon />}
                {...buttonProps}
            >
                {hideText ? (
                    <ImportExportOutlinedIcon />
                ) : (
                    children ?? translate("buttons.import", "Import")
                )}
            </Button>
        </label>
    );
};
