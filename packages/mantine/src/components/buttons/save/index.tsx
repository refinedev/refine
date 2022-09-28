import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineSaveButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { Button, ButtonProps } from "@mantine/core";
import { IconFileCheck, TablerIconProps } from "@tabler/icons";

export type SaveButtonProps = RefineSaveButtonProps<
    ButtonProps,
    {
        svgIconProps?: TablerIconProps;
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

    return (
        <Button
            variant="filled"
            leftIcon={
                !hideText && <IconFileCheck size={16} {...svgIconProps} />
            }
            data-testid={RefineButtonTestIds.SaveButton}
            {...rest}
        >
            {hideText ? (
                <IconFileCheck size={16} {...svgIconProps} />
            ) : (
                children ?? translate("buttons.save", "Save")
            )}
        </Button>
    );
};
