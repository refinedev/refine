import { isValidElement, useState } from "react";
import {
  type TreeMenuItem,
  useIsExistAuthentication,
  useTranslate,
  useLogout,
  useMenu,
  useWarnAboutChange,
} from "@refinedev/core";
import { Link } from "react-router";
import {
  type ThemedSider as ThemedSiderV2,
  type ThemedSiderMenuItem,
  CanAccessMenuItems,
  ThemedTitle as ThemedTitleV2,
} from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Menu,
  type MenuProps,
  Grid,
  theme,
  Button,
} from "antd";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

const { useToken } = theme;

type SiderMenuItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: SiderMenuItem[];
};

// `render` may return menu item data (e.g. `[...menuItems, logoutItem]`) or, the legacy way, elements.
const isMenuItemList = (
  value: unknown,
): value is (ThemedSiderMenuItem | undefined | false)[] =>
  Array.isArray(value) &&
  value.every(
    (entry) =>
      !entry ||
      (typeof entry === "object" &&
        !Array.isArray(entry) &&
        !isValidElement(entry)),
  );

// The legacy `items` and `logout` render props are elements, so items are converted back for them.
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

export const CustomSider: typeof ThemedSiderV2 = ({ render }) => {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isExistAuthentication = useIsExistAuthentication();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const buildMenuItems = (
    tree: TreeMenuItem[],
    canAccess: (item: TreeMenuItem) => boolean,
  ): SiderMenuItem[] => {
    return tree.filter(canAccess).map((item: TreeMenuItem) => {
      const { name, children, meta, key, list } = item;

      const icon = meta?.icon;
      const label = meta?.label ?? name;
      const parent = meta?.parent;
      const route =
        typeof list === "string"
          ? list
          : typeof list !== "function"
            ? list
            : key;

      if (children.length > 0) {
        return {
          key: route ?? key,
          icon: icon ?? <UnorderedListOutlined />,
          label,
          children: buildMenuItems(children, canAccess),
        };
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parent !== undefined && children.length === 0);
      return {
        key: route ?? key,
        style: {
          textTransform: "capitalize",
        },
        icon: icon ?? (isRoute && <UnorderedListOutlined />),
        label: (
          <>
            {route ? <Link to={route || "/"}>{label}</Link> : label}
            {!collapsed && isSelected && (
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
        onClick: handleLogout,
        icon: <LogoutOutlined />,
        label: translate("buttons.logout", "Logout"),
      }
    : undefined;

  const menuProps: MenuProps = {
    defaultOpenKeys,
    selectedKeys: [selectedKey],
    mode: "inline",
    style: {
      marginTop: "8px",
      border: "none",
    },
    onClick: () => {
      if (!breakpoint.lg) {
        setCollapsed(true);
      }
    },
  };

  const renderMenu = (canAccess: (item: TreeMenuItem) => boolean) => {
    const items = buildMenuItems(menuItems, canAccess);

    if (render) {
      const rendered = render({
        items: toMenuElements(items),
        logout: logoutItem && toMenuElements([logoutItem])[0],
        collapsed,
        menuItems: items,
        logoutItem,
      });

      return isMenuItemList(rendered) ? (
        <Menu
          {...menuProps}
          items={rendered.filter((item): item is ThemedSiderMenuItem => !!item)}
        />
      ) : (
        <Menu {...menuProps}>{rendered}</Menu>
      );
    }

    return (
      <Menu
        {...menuProps}
        items={logoutItem ? [...items, logoutItem] : items}
      />
    );
  };

  const siderStyle = isMobile ? antLayoutSiderMobile : antLayoutSider;

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={{
        ...siderStyle,
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
      }}
      trigger={
        !isMobile && (
          <Button
            type="text"
            style={{
              borderRadius: 0,
              height: "100%",
              width: "100%",
              backgroundColor: token.colorBgElevated,
            }}
          >
            {collapsed ? (
              <RightOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            ) : (
              <LeftOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            )}
          </Button>
        )
      }
    >
      <div
        style={{
          width: collapsed ? "80px" : "200px",
          padding: collapsed ? "0" : "0 16px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-start",
          alignItems: "center",
          height: "64px",
          backgroundColor: token.colorBgElevated,
          fontSize: "14px",
        }}
      >
        <ThemedTitleV2 collapsed={collapsed} />
      </div>
      <CanAccessMenuItems menuItems={menuItems}>
        {renderMenu}
      </CanAccessMenuItems>
    </AntdLayout.Sider>
  );
};
