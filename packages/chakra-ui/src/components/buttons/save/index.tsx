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
 * `<SaveButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `}.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    svgIconProps,
    children,
    ...rest
}) => {
    const translate = useTranslate();

    return hideText ? (
        <IconButton
            variant="outline"
            aria-label={translate("buttons.save", "Save")}
            data-testid={RefineButtonTestIds.SaveButton}
            {...rest}
        >
            <IconDeviceFloppy size={18} {...svgIconProps} />
        </IconButton>
    ) : (
        <Button
            colorScheme="primary"
            leftIcon={<IconDeviceFloppy size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.SaveButton}
            {...rest}
        >
            {children ?? translate("buttons.save", "Save")}
        </Button>
    );
};
