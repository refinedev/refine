import React from "react";
import { useCreateButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import Button from "@mui/material/Button";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";

import type { CreateButtonProps } from "../types";

/**
 * <CreateButton> uses Material UI {@link https://mui.com/components/buttons/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/create-button} for more details.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...props
}) => {
  const { to, label, title, disabled, hidden, LinkComponent } = useCreateButton(
    {
      resource: resourceNameFromProps ?? resourceNameOrRouteName,
      meta,
      accessControl,
    },
  );
  const isDisabled = disabled || props.disabled;
  const isHidden = hidden || props.hidden;

  if (isHidden) return null;

  const { sx, ...restProps } = props;

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
        variant="contained"
        sx={{ minWidth: 0, ...sx }}
        data-testid={RefineButtonTestIds.CreateButton}
        className={RefineButtonClassNames.CreateButton}
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
