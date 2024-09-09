import React from "react";
import { useCreateButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { IconSquarePlus } from "@tabler/icons-react";

import { mapButtonVariantToActionIconVariant } from "@definitions/button";
import type { CreateButtonProps } from "../types";

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useCreateButton(
    {
      resource: resourceNameFromProps ?? resourceNameOrRouteName,
      accessControl,
      meta,
    },
  );

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
          variant={mapButtonVariantToActionIconVariant(variant, "default")}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          {...commonProps}
        >
          <IconSquarePlus size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          disabled={disabled}
          leftSection={<IconSquarePlus size={18} {...svgIconProps} />}
          title={title}
          vars={vars}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          variant={variant || "filled"}
          {...rest}
        >
          {children ?? label}
        </Button>
      )}
    </Anchor>
  );
};
