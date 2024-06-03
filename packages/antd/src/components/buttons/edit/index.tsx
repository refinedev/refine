import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEditButton } from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import type { EditButtonProps } from "../types";

/**
 * `<EditButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button>`} component.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#edit `edit`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful when redirecting the app to the edit page with the record id route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/edit-button} for more details.
 */
export const EditButton: React.FC<EditButtonProps> = ({
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
  const { to, label, title, hidden, disabled, LinkComponent } = useEditButton({
    resource: resourceNameFromProps ?? propResourceNameOrRouteName,
    id: recordItemId,
    meta,
    accessControl,
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
        icon={<EditOutlined />}
        disabled={disabled}
        title={title}
        data-testid={RefineButtonTestIds.EditButton}
        className={RefineButtonClassNames.EditButton}
        {...rest}
      >
        {!hideText && (children ?? label)}
      </Button>
    </LinkComponent>
  );
};
