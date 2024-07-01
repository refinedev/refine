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
  useMantineTheme,
  Flex,
} from "@mantine/core";
import {
  IconList,
  IconMenu2,
  IconIndentDecrease,
  IconIndentIncrease,
  IconPower,
  IconDashboard,
} from "@tabler/icons-react";
import type { RefineThemedLayoutSiderProps } from "../types";

import { ThemedTitle as DefaultTitle } from "@components";

const defaultNavIcon = <IconList size={20} />;

/**
 * @deprecated It is recommended to use the improved `ThemedLayoutV2`. Review migration guidelines. https://refine.dev/docs/api-reference/mantine/components/mantine-themed-layout/#migrate-themedlayout-to-themedlayoutv2
 */
export const ThemedSider: React.FC<RefineThemedLayoutSiderProps> = ({
  render,
  meta,
  Title: TitleFromProps,
}) => {
  const theme = useMantineTheme();
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

  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2];

  const commonNavLinkStyles: Styles<NavLinkStylesNames, NavLinkStylesParams> = {
    root: {
      display: "flex",
      marginTop: "12px",
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
              pl={collapsed || opened ? "12px" : "18px"}
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
          icon={<IconDashboard size={20} />}
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
        icon={<IconPower size={20} />}
        pl={collapsed || opened ? "12px" : "18px"}
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
        <Box sx={{ position: "fixed", top: 16, left: 16, zIndex: 1199 }}>
          <ActionIcon
            color="gray"
            variant="filled"
            size={32}
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
            },
          }}
        >
          <Navbar.Section
            pl={8}
            sx={{
              height: "64px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <RenderToTitle collapsed={false} />
          </Navbar.Section>
          <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
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
            position: "fixed",
            top: 0,
            height: "100vh",
            borderRight: 0,
            zIndex: 199,
          }}
        >
          <Flex
            h="64px"
            pl={collapsed ? 0 : "16px"}
            align="center"
            justify={collapsed ? "center" : "flex-start"}
            sx={{
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <RenderToTitle collapsed={collapsed} />
          </Flex>
          <Navbar.Section
            grow
            component={ScrollArea}
            mx="-xs"
            px="xs"
            sx={{
              ".mantine-ScrollArea-viewport": {
                borderRight: `1px solid ${borderColor}`,
                borderBottom: `1px solid ${borderColor}`,
              },
            }}
          >
            {renderSider()}
          </Navbar.Section>
          <Navbar.Section
            sx={{
              borderRadius: 0,
              borderRight: `1px solid ${borderColor}`,
            }}
          >
            <Button
              variant="subtle"
              color="gray"
              size="md"
              fullWidth
              sx={{
                border: "none",
              }}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? (
                <IconIndentIncrease size={16} />
              ) : (
                <IconIndentDecrease size={16} />
              )}
            </Button>
          </Navbar.Section>
        </Navbar>
      </MediaQuery>
    </>
  );
};
