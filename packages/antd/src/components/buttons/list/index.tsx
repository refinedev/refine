import React from "react";
import { Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import { useListButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { ListButtonProps } from "../types";

/**
 * `<ListButton>` is using Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the  {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#list `list`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the list page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/list-button} for more details.
 */
export const ListButton: React.FC<ListButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
  hideText = false,
  accessControl,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, hidden, disabled, LinkComponent } = useListButton({
    resource: resourceNameFromProps ?? propResourceNameOrRouteName,
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
        // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
        icon={<BarsOutlined />}
        disabled={disabled}
        title={title}
        data-testid={RefineButtonTestIds.ListButton}
        className={RefineButtonClassNames.ListButton}
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </LinkComponent>
  );
};
