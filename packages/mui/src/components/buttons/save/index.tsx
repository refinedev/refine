import React from "react";

import { useTranslate } from "@pankod/refine-core";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";

export type SaveButtonProps = LoadingButtonProps & {
    hideText?: boolean;
};

/**
 * `<SaveButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return (
        <LoadingButton startIcon={!hideText && <SaveOutlinedIcon />} {...rest}>
            {hideText ? (
                <SaveOutlinedIcon />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </LoadingButton>
    );
};
