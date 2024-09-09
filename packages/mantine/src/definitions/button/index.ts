import type { ActionIconVariant, ButtonVariant } from "@mantine/core";

export const mapButtonVariantToActionIconVariant = (
  variant?: ButtonVariant,
  defaultVariant?: ActionIconVariant,
): ActionIconVariant | undefined => {
  if (variant) {
    return variant;
  }
  if (defaultVariant) {
    return defaultVariant;
  }
  return "default";
};
