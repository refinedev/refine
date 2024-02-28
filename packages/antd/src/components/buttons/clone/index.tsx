import React, { useContext } from "react";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
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
  RefineButtonTestIds,
  RefineButtonClassNames,
} from "@refinedev/ui-types";

import { CloneButtonProps } from "../types";

/**
 * `<CloneButton>` uses Ant Design's {@link https://ant.design/components/button/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation#clone `clone`} method from {@link https://refine.dev/docs/api-reference/core/hooks/navigation/useNavigation useNavigation} under the hood.
 * It can be useful when redirecting the app to the create page with the record id route of resource.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/buttons/clone-button} for more details.
 */
export const CloneButton: React.FC<CloneButtonProps> = ({
  resourceNameOrRouteName: propResourceNameOrRouteName,
  resource: resourceNameFromProps,
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

  const { cloneUrl: generateCloneUrl } = useNavigation();
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
    action: "create",
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

  const cloneUrl =
    resource && (recordItemId || id)
      ? generateCloneUrl(resource, recordItemId! ?? id!, meta)
      : "";

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <ActiveLink
      to={cloneUrl}
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
        data-testid={RefineButtonTestIds.CloneButton}
        className={RefineButtonClassNames.CloneButton}
        {...rest}
      >
        {!hideText && (children ?? translate("buttons.clone", "Clone"))}
      </Button>
    </ActiveLink>
  );
};
