import React from "react";
import { useTranslate } from "@refinedev/core";
import {
    RefineButtonClassNames,
    RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Button } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import { SaveButtonProps } from "../types";

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

    const { variant, styles, ...commonProps } = rest;

    return hideText ? (
        <ActionIcon
            {...(variant
                ? {
                      variant: mapButtonVariantToActionIconVariant(variant),
                  }
                : { variant: "filled", color: "primary" })}
            data-testid={RefineButtonTestIds.SaveButton}
            className={RefineButtonClassNames.SaveButton}
            {...commonProps}
        >
            <IconDeviceFloppy size={18} {...svgIconProps} />
        </ActionIcon>
    ) : (
        <Button
            variant="filled"
            leftIcon={<IconDeviceFloppy size={18} {...svgIconProps} />}
            data-testid={RefineButtonTestIds.SaveButton}
            className={RefineButtonClassNames.SaveButton}
            {...rest}
        >
            {children ?? translate("buttons.save", "Save")}
        </Button>
    );
};
