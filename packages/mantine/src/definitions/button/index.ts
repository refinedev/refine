import { ActionIconVariant, ButtonVariant } from "@mantine/core";

export const mapButtonVariantToActionIconVariant = (
    variant?: ButtonVariant | (string & {}),
    defaultVariant?: ActionIconVariant,
): ActionIconVariant | undefined => {
    switch (variant) {
        case "white":
            return "default";
        default:
            if (defaultVariant) {
                return defaultVariant
            }
            return "default";
    }
};
