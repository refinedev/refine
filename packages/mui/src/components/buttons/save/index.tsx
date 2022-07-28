import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineSaveButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { SvgIconProps } from "@mui/material";

export type SaveButtonProps = RefineSaveButtonProps<
    LoadingButtonProps,
    {
        svgIconProps?: SvgIconProps;
    }
>;

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
            startIcon={!hideText && <SaveOutlinedIcon {...svgIconProps} />}
            sx={{ minWidth: 0, ...sx }}
            variant="contained"
            data-testid={RefineButtonTestIds.SaveButton}
            {...restProps}
        >
            {hideText ? (
                <SaveOutlinedIcon fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </LoadingButton>
    );
};
