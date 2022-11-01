import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
    RefineSaveButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { IconButton, Button, ButtonProps } from "@chakra-ui/react";
import { IconDeviceFloppy, TablerIconProps } from "@tabler/icons";

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

    const icon = <IconDeviceFloppy size={18} {...svgIconProps} />;

    return hideText ? (
        <IconButton
            variant="primary"
            icon={icon}
            aria-label={translate("buttons.save", "Save")}
            data-testid={RefineButtonTestIds.SaveButton}
            {...rest}
        />
    ) : (
        <Button
            variant="primary"
            leftIcon={icon}
            data-testid={RefineButtonTestIds.SaveButton}
            {...rest}
        >
            {children ?? translate("buttons.save", "Save")}
        </Button>
    );
};
