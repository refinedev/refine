import React, { useContext } from "react";
import {
  Layout,
  Menu,
  Grid,
  Drawer,
  Button,
  theme,
  ConfigProvider,
  type MenuProps,
} from "antd";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  BarsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  type TreeMenuItem,
  useTranslate,
  useLogout,
  useIsExistAuthentication,
  useMenu,
  useLink,
  useWarnAboutChange,
} from "@refinedev/core";

import { drawerButtonStyles } from "./styles";
import type {
  RefineThemedLayoutSiderProps,
  ThemedSiderMenuItem,
} from "../types";
import { ThemedTitle } from "@components";
import { useThemedLayoutContext } from "@hooks";
import { CanAccessMenuItems } from "../../canAccessMenuItems";

type SiderMenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: SiderMenuItem[];
};

/**
 * Tells menu item data returned by `render` apart from elements.
 * Plain objects are never valid React children, so an array holding only objects
 * (or empty slots like `undefined` from `[...menuItems, logoutItem]`) cannot be a legacy element result.
 */
const isMenuItemList = (
  value: unknown,
): value is (ThemedSiderMenuItem | undefined | false)[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      entry === null ||
      entry === undefined ||
      entry === false ||
      (typeof entry === "object" &&
        !Array.isArray(entry) &&
        !React.isValidElement(entry)),
  );

/**
 * Converts menu items back to `<Menu.Item>`/`<Menu.SubMenu>` elements for the element based `items`
 * and `logout` render props.
 */
const toMenuElements = (items: SiderMenuItem[]): React.JSX.Element[] =>
  items.map(({ key, label, icon, style, onClick, children }) =>
    children ? (
      <Menu.SubMenu key={key} icon={icon} title={label}>
        {toMenuElements(children)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={key} icon={icon} style={style} onClick={onClick}>
        {label}
      </Menu.Item>
    ),
  );

export const ThemedSider: React.FC<RefineThemedLayoutSiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
  fixed,
  activeItemDisabled = false,
  siderItemsAreCollapsed = true,
}) => {
  const { token } = theme.useToken();
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  const isExistAuthentication = useIsExistAuthentication();
  const direction = useContext(ConfigProvider.ConfigContext)?.direction;
  const Link = useLink();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const breakpoint = Grid.useBreakpoint();
  const { mutate: mutateLogout } = useLogout();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = TitleFromProps ?? ThemedTitle;

  const buildMenuItems = (
    tree: TreeMenuItem[],
    canAccess: (item: TreeMenuItem) => boolean,
  ): SiderMenuItem[] => {
    return tree.filter(canAccess).map((item: TreeMenuItem) => {
      const { key, name, children, meta, list } = item;
      const parentName = meta?.parent;
      const label = item?.label ?? meta?.label ?? name;
      const icon = meta?.icon;
      const route = list;

      if (children.length > 0) {
        return {
          key,
          icon: icon ?? <UnorderedListOutlined />,
          label,
          children: buildMenuItems(children, canAccess),
        };
      }
      const isSelected = key === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);

      const linkStyle: React.CSSProperties =
        activeItemDisabled && isSelected ? { pointerEvents: "none" } : {};

      return {
        key,
        icon: icon ?? (isRoute && <UnorderedListOutlined />),
        style: linkStyle,
        label: (
          <>
            <Link to={route ?? ""} style={linkStyle}>
              {label}
            </Link>
            {!siderCollapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </>
        ),
      };
    });
  };

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
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

  const logoutItem: SiderMenuItem | undefined = isExistAuthentication
    ? {
        key: "logout",
        onClick: () => handleLogout(),
        icon: <LogoutOutlined />,
        label: translate("buttons.logout", "Logout"),
      }
    : undefined;

  const defaultExpandMenuItems = (() => {
    if (siderItemsAreCollapsed) return [];

    return menuItems.map(({ key }) => key);
  })();

  const menuProps: MenuProps = {
    selectedKeys: selectedKey ? [selectedKey] : [],
    defaultOpenKeys: [...defaultOpenKeys, ...defaultExpandMenuItems],
    mode: "inline",
    style: {
      paddingTop: "8px",
      border: "none",
      overflow: "auto",
      height: "calc(100% - 72px)",
    },
    onClick: () => {
      setMobileSiderOpen(false);
    },
  };

  const renderMenu = () => {
    return (
      <CanAccessMenuItems menuItems={menuItems}>
        {(canAccess) => {
          const items = buildMenuItems(menuItems, canAccess);

          if (render) {
            const rendered = render({
              items: toMenuElements(items),
              logout: logoutItem && toMenuElements([logoutItem])[0],
              collapsed: siderCollapsed,
              menuItems: items,
              logoutItem,
            });

            if (isMenuItemList(rendered)) {
              return (
                <Menu
                  {...menuProps}
                  items={rendered.filter(
                    (item): item is ThemedSiderMenuItem => !!item,
                  )}
                />
              );
            }

            return <Menu {...menuProps}>{rendered}</Menu>;
          }

          return (
            <Menu
              {...menuProps}
              items={logoutItem ? [...items, logoutItem] : items}
            />
          );
        }}
      </CanAccessMenuItems>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          placement={direction === "rtl" ? "right" : "left"}
          closable={false}
          size={200}
          styles={{
            body: {
              padding: 0,
            },
          }}
          mask={{ closable: true }}
        >
          <Layout>
            <Layout.Sider
              style={{
                height: "100vh",
                backgroundColor: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBgElevated}`,
              }}
            >
              <div
                style={{
                  width: "200px",
                  padding: "0 16px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "64px",
                  backgroundColor: token.colorBgElevated,
                }}
              >
                <RenderToTitle collapsed={false} />
              </div>
              {renderMenu()}
            </Layout.Sider>
          </Layout>
        </Drawer>
        <Button
          style={drawerButtonStyles}
          size="large"
          onClick={() => setMobileSiderOpen(true)}
          icon={<BarsOutlined />}
        />
      </>
    );
  };

  if (isMobile) {
    return renderDrawerSider();
  }

  const siderStyles: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBgElevated}`,
  };

  if (fixed) {
    siderStyles.position = "fixed";
    siderStyles.top = 0;
    siderStyles.height = "100vh";
    siderStyles.zIndex = 999;
  }
  const renderClosingIcons = () => {
    const iconProps = { style: { color: token.colorPrimary } };
    const OpenIcon = direction === "rtl" ? RightOutlined : LeftOutlined;
    const CollapsedIcon = direction === "rtl" ? LeftOutlined : RightOutlined;
    const IconComponent = siderCollapsed ? CollapsedIcon : OpenIcon;

    return <IconComponent {...iconProps} />;
  };

  return (
    <>
      {fixed && (
        <div
          style={{
            width: siderCollapsed ? "80px" : "200px",
            transition: "all 0.2s",
          }}
        />
      )}
      <Layout.Sider
        style={siderStyles}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setSiderCollapsed(collapsed);
          }
        }}
        collapsedWidth={80}
        breakpoint="lg"
        trigger={
          <Button
            type="text"
            style={{
              borderRadius: 0,
              height: "100%",
              width: "100%",
              backgroundColor: token.colorBgElevated,
            }}
          >
            {renderClosingIcons()}
          </Button>
        }
      >
        <div
          style={{
            width: siderCollapsed ? "80px" : "200px",
            padding: siderCollapsed ? "0" : "0 16px",
            display: "flex",
            justifyContent: siderCollapsed ? "center" : "flex-start",
            alignItems: "center",
            height: "64px",
            backgroundColor: token.colorBgElevated,
            fontSize: "14px",
          }}
        >
          <RenderToTitle collapsed={siderCollapsed} />
        </div>
        {renderMenu()}
      </Layout.Sider>
    </>
  );
};
