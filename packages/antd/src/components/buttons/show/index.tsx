import React, { useContext } from "react";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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

import { ShowButtonProps } from "../types";

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
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const { showUrl: generateShowUrl } = useNavigation();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const translate = useTranslate();

  const { id, resource } = useResource(
    resourceNameFromProps ?? propResourceNameOrRouteName,
  );

  const { data } = useCan({
    resource: resource?.name,
    action: "show",
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

  const showUrl =
    resource && (recordItemId || id)
      ? generateShowUrl(resource, recordItemId! ?? id!, meta)
      : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <ActiveLink
      to={showUrl}
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
        icon={<EyeOutlined />}
        disabled={data?.can === false}
        title={createButtonDisabledTitle()}
        data-testid={RefineButtonTestIds.ShowButton}
        className={RefineButtonClassNames.ShowButton}
        {...rest}
      >
        {!hideText && (children ?? translate("buttons.show", "Show"))}
      </Button>
    </ActiveLink>
  );
};
