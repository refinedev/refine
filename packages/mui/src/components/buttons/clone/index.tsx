import React from "react";
import { useCloneButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";

import type { CloneButtonProps } from "../types";

/**
 * `<CloneButton>` uses Material UI {@link https://mui.com/components/buttons/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/clone-button} for more details.
 *
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
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
  const { to, label, title, hidden, disabled, LinkComponent } = useCloneButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    meta,
    accessControl,
  });

  const isDisabled = disabled || rest.disabled;
  const isHidden = hidden || rest.hidden;

  if (isHidden) return null;

  const { sx, ...restProps } = rest;

  return (
    <LinkComponent
      to={to}
      replace={false}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      style={{ textDecoration: "none" }}
    >
      <Button
        disabled={isDisabled}
        startIcon={!hideText && <AddBoxOutlined {...svgIconProps} />}
        title={title}
        sx={{ minWidth: 0, ...sx }}
        data-testid={RefineButtonTestIds.CloneButton}
        className={RefineButtonClassNames.CloneButton}
        {...restProps}
      >
        {hideText ? (
          <AddBoxOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children ?? label
        )}
      </Button>
    </LinkComponent>
  );
};
