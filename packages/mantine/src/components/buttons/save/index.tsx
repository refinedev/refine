import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineSaveButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps } from "@mantine/core";
import { FileCheck, IconProps } from "tabler-icons-react";

export type SaveButtonProps = RefineSaveButtonProps<
    ButtonProps,
    {
        svgIconProps?: IconProps;
    }
>;

/**
 * `<SaveButton>` uses Mantine {@link https://mantine.dev/core/button/ `<Button> `}.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/buttons/save-button} for more details.
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
        <Button
            leftIcon={!hideText && <FileCheck {...svgIconProps} />}
            sx={{ minWidth: 0, ...sx }}
            data-testid={RefineButtonTestIds.SaveButton}
            {...restProps}
        >
            {hideText ? (
                <FileCheck fontSize="small" {...svgIconProps} />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </Button>
    );
};
