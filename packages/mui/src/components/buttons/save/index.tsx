import React from "react";
import { useTranslate } from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { LoadingButton } from "@mui/lab";
import { SaveOutlined } from "@mui/icons-material";

import { SaveButtonProps } from "../types";

/**
 * `<SaveButton>` uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    svgIconProps,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    const { sx, ...restProps } = rest;

    return (
        <LoadingButton
            startIcon={!hideText && <SaveOutlined {...svgIconProps} />}
            sx={{ minWidth: 0, ...sx }}
            variant="contained"
            data-testid={RefineButtonTestIds.SaveButton}
            className={RefineButtonClassNames.SaveButton}
            {...restProps}
        >
            {hideText ? (
                <SaveOutlined fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </LoadingButton>
    );
};
