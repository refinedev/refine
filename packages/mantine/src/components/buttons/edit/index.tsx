import React from "react";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses Mantine {@link https://mantine.dev/core/button `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  recordItemId,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useEditButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    accessControl,
    meta,
  });

  if (hidden) return null;

  const { variant, styles, vars, ...commonProps } = rest;

  return (
    <Anchor
      component={LinkComponent as any}
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {hideText ? (
        <ActionIcon
          title={title}
          disabled={disabled}
          aria-label={label}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          variant={mapButtonVariantToActionIconVariant(variant, "default")}
          {...commonProps}
        >
          <IconPencil size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          variant={variant || "filled"}
          disabled={disabled}
          leftSection={<IconPencil size={18} {...svgIconProps} />}
          title={title}
          vars={vars}
          data-testid={RefineButtonTestIds.EditButton}
          className={RefineButtonClassNames.EditButton}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
