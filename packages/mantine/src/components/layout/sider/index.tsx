import React, { useState } from "react";
import {
  CanAccess,
  type ITreeMenu,
  useIsExistAuthentication,
  useLink,
  useLogout,
  useMenu,
  useActiveAuthProvider,
  useRefineContext,
  useRouterContext,
  useRouterType,
  useTitle,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import {
  ActionIcon,
  Box,
  Drawer,
  Navbar,
  NavLink,
  type NavLinkStylesNames,
  type NavLinkStylesParams,
  ScrollArea,
  MediaQuery,
  Button,
  Tooltip,
  type TooltipProps,
  type Styles,
} from "@mantine/core";
import {
  IconList,
  IconMenu2,
  IconChevronRight,
  IconChevronLeft,
  IconPower,
  IconDashboard,
} from "@tabler/icons-react";
import type { RefineLayoutSiderProps } from "../types";

import { RefineTitle as DefaultTitle } from "@components";

const defaultNavIcon = <IconList size={18} />;

export const Sider: React.FC<RefineLayoutSiderProps> = ({
  render,
  meta,
  Title: TitleFromProps,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;

  const { defaultOpenKeys, menuItems, selectedKey } = useMenu({ meta });
  const TitleFromContext = useTitle();
  const isExistAuthentication = useIsExistAuthentication();
  const t = useTranslate();
  const { hasDashboard } = useRefineContext();
  const authProvider = useActiveAuthProvider();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const drawerWidth = () => {
    if (collapsed) return 80;
    return 200;
  };

  const commonNavLinkStyles: Styles<NavLinkStylesNames, NavLinkStylesParams> = {
    root: {
      display: "flex",
      color: "white",
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "unset",
      },
      "&[data-active]": {
        backgroundColor: "#ffffff1a",
        color: "white",
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "#ffffff1a",
        },
      },
      justifyContent: collapsed && !opened ? "center" : "flex-start",
    },
    icon: {
      marginRight: collapsed && !opened ? 0 : 12,
    },
    body: {
      display: collapsed && !opened ? "none" : "flex",
    },
  };

  const commonTooltipProps: Partial<TooltipProps> = {
    disabled: !collapsed || opened,
    position: "right",
    withinPortal: true,
    withArrow: true,
    arrowSize: 8,
    arrowOffset: 12,
    offset: 4,
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item) => {
      const { icon, label, route, name, children } = item;

      const isSelected = item.key === selectedKey;
      const isParent = children.length > 0;

      const additionalLinkProps = isParent
        ? {}
        : { component: Link as any, to: route };

      return (
        <CanAccess
          key={item.key}
          resource={name}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Tooltip label={label} {...commonTooltipProps}>
            <NavLink
              key={item.key}
              label={collapsed && !opened ? null : label}
              icon={icon ?? defaultNavIcon}
              active={isSelected}
              childrenOffset={collapsed && !opened ? 0 : 12}
              defaultOpened={defaultOpenKeys.includes(item.key || "")}
              styles={commonNavLinkStyles}
              {...additionalLinkProps}
            >
              {isParent && renderTreeView(children, selectedKey)}
            </NavLink>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems, selectedKey);

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        label={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <NavLink
          key="dashboard"
          label={
            collapsed && !opened ? null : t("dashboard.title", "Dashboard")
          }
          icon={<IconDashboard size={18} />}
          component={Link as any}
          to="/"
          active={selectedKey === "/"}
          styles={commonNavLinkStyles}
        />
      </Tooltip>
    </CanAccess>
  ) : null;

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <NavLink
        key="logout"
        label={collapsed && !opened ? null : t("buttons.logout", "Logout")}
        icon={<IconPower size={18} />}
        onClick={handleLogout}
        styles={commonNavLinkStyles}
      />
    </Tooltip>
  );

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  return (
    <>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box sx={{ position: "fixed", top: 64, left: 0, zIndex: 1199 }}>
          <ActionIcon
            color="white"
            size={36}
            sx={{
              borderRadius: "0 6px 6px 0",
              backgroundColor: "#2A132E",
              color: "white",
              "&:hover": {
                backgroundColor: "#2A132E",
              },
            }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <IconMenu2 />
          </ActionIcon>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          size={200}
          zIndex={1200}
          withCloseButton={false}
          styles={{
            drawer: {
              overflow: "hidden",
              backgroundColor: "#2A132E",
            },
          }}
        >
          <Navbar.Section px="xs">
            <RenderToTitle collapsed={false} />
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
        </Drawer>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Box
          sx={{
            width: drawerWidth(),
            transition: "width 200ms ease, min-width 200ms ease",
            flexShrink: 0,
          }}
        />
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Navbar
          width={{ base: drawerWidth() }}
          sx={{
            overflow: "hidden",
            transition: "width 200ms ease, min-width 200ms ease",
            backgroundColor: "#2A132E",
            position: "fixed",
            top: 0,
            height: "100vh",
          }}
        >
          <Navbar.Section px="xs">
            <RenderToTitle collapsed={collapsed} />
          </Navbar.Section>
          <Navbar.Section grow mt="sm" component={ScrollArea} mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
          <Navbar.Section>
            <Button
              sx={{
                background: "rgba(0,0,0,.5)",
                borderRadius: 0,
                borderTop: "1px solid #ffffff1a",
              }}
              size="md"
              variant="gradient"
              fullWidth
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </Button>
          </Navbar.Section>
        </Navbar>
      </MediaQuery>
    </>
  );
};
