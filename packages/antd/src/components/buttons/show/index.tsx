import React from "react";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useShowButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { ShowButtonProps } from "../types";

/**
 * `<ShowButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#show `show`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the show page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/show-button} for more details.
 */
export const ShowButton: React.FC<ShowButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  recordItemId,
  hideText = false,
  accessControl,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, hidden, disabled, LinkComponent } = useShowButton({
    resource: resourceNameFromProps ?? propResourceNameOrRouteName,
    id: recordItemId,
    accessControl,
    meta,
  });

  if (hidden) return null;

  return (
    <LinkComponent
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
      <Button
        icon={<EyeOutlined />}
        disabled={disabled}
        title={title}
        data-testid={RefineButtonTestIds.ShowButton}
        className={RefineButtonClassNames.ShowButton}
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </LinkComponent>
  );
};
