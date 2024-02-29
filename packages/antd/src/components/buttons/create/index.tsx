import React, { useContext } from "react";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import {
  useNavigation,
  useTranslate,
  useCan,
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

import { CreateButtonProps } from "../types";

/**
 * <CreateButton> uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/create-button} for more details.
 */
export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName: propResourceNameOrRouteName,
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

  const { createUrl: generateCreateUrl } = useNavigation();

  const { resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName,
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "create",
    queryOptions: {
      enabled: accessControlEnabled,
    },
    params: {
      resource,
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

  const createUrl = resource ? generateCreateUrl(resource, meta) : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <ActiveLink
      to={createUrl}
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
        icon={<PlusSquareOutlined />}
        disabled={data?.can === false}
        title={createButtonDisabledTitle()}
        data-testid={RefineButtonTestIds.CreateButton}
        className={RefineButtonClassNames.CreateButton}
        type="primary"
        {...rest}
      >
        {!hideText && (children ?? translate("buttons.create", "Create"))}
      </Button>
    </ActiveLink>
  );
};
