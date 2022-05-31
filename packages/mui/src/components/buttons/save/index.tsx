import React from "react";

import { useTranslate } from "@pankod/refine-core";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { SvgIconProps } from "@mui/material";

export type SaveButtonProps = LoadingButtonProps & {
    hideText?: boolean;
    svgIconProps?: SvgIconProps;
};

/**
 * `<SaveButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    svgIconProps,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <LoadingButton
            startIcon={!hideText && <SaveOutlinedIcon {...svgIconProps} />}
            {...rest}
        >
            {hideText ? (
                <SaveOutlinedIcon {...svgIconProps} />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </LoadingButton>
    );
};
