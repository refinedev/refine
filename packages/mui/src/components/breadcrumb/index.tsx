import React from "react";
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useRefineContext,
  useResource,
  useRouterContext,
  useRouterType,
} from "@refinedev/core";
import type { RefineBreadcrumbProps } from "@refinedev/ui-types";

import { Box, Breadcrumbs, Typography, Link } from "@mui/material";

import type {
  BreadcrumbsProps as MuiBreadcrumbProps,
  LinkProps,
} from "@mui/material";

import { HomeOutlined } from "@mui/icons-material";

export type BreadcrumbProps = RefineBreadcrumbProps<MuiBreadcrumbProps>;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
}) => {
  const { breadcrumbs } = useBreadcrumb({ meta });
  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;

  const { hasDashboard } = useRefineContext();
  const { resources } = useResource();

  const rootRouteResource = matchResourceFromRoute("/", resources);

  if (breadcrumbs.length === 0) return null;

  const LinkRouter = (props: LinkProps & { to?: string }) => (
    <Link {...props} component={ActiveLink} />
  );

  const renderHomeLink = () => {
    if (!showHome || !(hasDashboard || rootRouteResource.found)) return null;

    return (
      <LinkRouter
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        color="inherit"
        to="/"
      >
        {rootRouteResource?.resource?.meta?.icon ?? (
          <HomeOutlined sx={{ fontSize: "18px" }} />
        )}
      </LinkRouter>
    );
  };

  const renderBreadcrumbItem = ({ label, icon: Icon, href }: any) => (
    <Box
      key={label}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {!hideIcons && Icon && <Icon sx={{ fontSize: "16px" }} />}
      {href ? (
        <LinkRouter
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          }}
          color="inherit"
          to={href}
          variant="subtitle1"
          marginLeft={0.5}
        >
          {label}
        </LinkRouter>
      ) : (
        <Typography variant="body2">{label}</Typography>
      )}
    </Box>
  );

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ ...breadcrumbProps?.sx }}
      {...breadcrumbProps}
    >
      {renderHomeLink()}
      {breadcrumbs.map(renderBreadcrumbItem)}
    </Breadcrumbs>
  );
};
