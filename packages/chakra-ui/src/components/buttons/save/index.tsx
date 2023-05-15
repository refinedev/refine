import React from "react";
import { useTranslate } from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconDeviceFloppy } from "@tabler/icons";

import { SaveButtonProps } from "../types";

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
            colorScheme="green"
            aria-label={translate("buttons.save", "Save")}
            data-testid={RefineButtonTestIds.SaveButton}
            className={RefineButtonClassNames.SaveButton}
            {...rest}
        >
            <IconDeviceFloppy size={20} {...svgIconProps} />
        </IconButton>
    ) : (
        <Button
            colorScheme="green"
            leftIcon={<IconDeviceFloppy size={20} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.SaveButton}
            className={RefineButtonClassNames.SaveButton}
            {...rest}
        >
            {children ?? translate("buttons.save", "Save")}
        </Button>
    );
};
