import React, { useContext } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  useCan,
  useNavigation,
  useTranslate,
  useResource,
  useRouterContext,
  useRouterType,
  useLink,
  AccessControlContext,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { EditButtonProps } from "../types";

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
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const { editUrl: generateEditUrl } = useNavigation();

  const { id, resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName,
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "edit",
    params: { id: recordItemId ?? id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const createButtonDisabledTitle = () => {
    if (data?.can) return "";
    if (data?.reason) return data.reason;

    return translate(
      "buttons.notAccessTitle",
      "You don't have permission to access",
    );
  };

  const editUrl =
    resource && (recordItemId ?? id)
      ? generateEditUrl(resource, recordItemId! ?? id!, meta)
      : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <ActiveLink
      to={editUrl}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (data?.can === false) {
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
        icon={<EditOutlined />}
        disabled={data?.can === false}
        title={createButtonDisabledTitle()}
        data-testid={RefineButtonTestIds.EditButton}
        className={RefineButtonClassNames.EditButton}
        {...rest}
      >
        {!hideText && (children ?? translate("buttons.edit", "Edit"))}
      </Button>
    </ActiveLink>
  );
};
