import React, { useContext } from "react";
import { Button } from "antd";
import { BarsOutlined } from "@ant-design/icons";
import {
  useCan,
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useResource,
  useRouterContext,
  useRouterType,
  useLink,
  pickNotDeprecated,
  AccessControlContext,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

import { ListButtonProps } from "../types";

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
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const { listUrl: generateListUrl } = useNavigation();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const getUserFriendlyName = useUserFriendlyName();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const translate = useTranslate();

  const { resource, identifier } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName,
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "list",
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

  const listUrl = resource ? generateListUrl(resource, meta) : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <ActiveLink
      to={listUrl}
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
        icon={<BarsOutlined />}
        disabled={data?.can === false}
        title={createButtonDisabledTitle()}
        data-testid={RefineButtonTestIds.ListButton}
        className={RefineButtonClassNames.ListButton}
        {...rest}
      >
        {!hideText &&
          (children ??
            translate(
              `${
                identifier ??
                resourceNameFromProps ??
                propResourceNameOrRouteName
              }.titles.list`,
              getUserFriendlyName(
                resource?.meta?.label ??
                  resource?.label ??
                  identifier ??
                  pickNotDeprecated(
                    resourceNameFromProps,
                    propResourceNameOrRouteName,
                  ),
                "plural",
              ),
            ))}
      </Button>
    </ActiveLink>
  );
};
