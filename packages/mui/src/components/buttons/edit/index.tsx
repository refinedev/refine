import React from "react";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import EditOutlined from "@mui/icons-material/EditOutlined";

import type { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses uses Material UI {@link https://mui.com/components/buttons/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/edit-button} for more details.
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
  const { to, label, title, hidden, disabled, LinkComponent } = useEditButton({
    resource: resourceNameFromProps ?? resourceNameOrRouteName,
    id: recordItemId,
    accessControl,
    meta,
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
        startIcon={
          !hideText && (
            <EditOutlined sx={{ selfAlign: "center" }} {...svgIconProps} />
          )
        }
        title={title}
        sx={{ minWidth: 0, ...sx }}
        data-testid={RefineButtonTestIds.EditButton}
        className={RefineButtonClassNames.EditButton}
        {...restProps}
      >
        {hideText ? (
          <EditOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children ?? label
        )}
      </Button>
    </LinkComponent>
  );
};
