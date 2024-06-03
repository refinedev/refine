import React from "react";
import {
  useBreadcrumb,
  useLink,
  useRefineContext,
  useRouterContext,
  useRouterType,
  useResource,
  matchResourceFromRoute,
} from "@refinedev/core";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";

import {
  Breadcrumb as AntdBreadcrumb,
  type BreadcrumbProps as AntdBreadcrumbProps,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";

export type BreadcrumbProps = RefineBreadcrumbProps<AntdBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
}) => {
  const routerType = useRouterType();
  const { breadcrumbs } = useBreadcrumb({
    meta,
  });
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const { hasDashboard } = useRefineContext();

  const { resources } = useResource();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  if (breadcrumbs.length === 1) {
    return null;
  }

  const breadCrumbItems = breadcrumbs.map(({ label, icon, href }) => ({
    key: `breadcrumb-item-${label}`,
    title: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {!hideIcons && icon}
        {href ? (
          <ActiveLink to={href}>{label}</ActiveLink>
        ) : (
          <span>{label}</span>
        )}
      </div>
    ),
  }));

  const getBreadcrumbItems = () => {
    if (showHome && (hasDashboard || rootRouteResource.found)) {
      return [
        {
          key: "breadcrumb-item-home",
          title: (
            <ActiveLink to="/">
              {/* @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66 */}
              {rootRouteResource?.resource?.meta?.icon ?? <HomeOutlined />}
            </ActiveLink>
          ),
        },
        ...breadCrumbItems,
      ];
    }

    return breadCrumbItems;
  };

  return <AntdBreadcrumb items={getBreadcrumbItems()} {...breadcrumbProps} />;
};
