import React, { useState } from "react";
import { type TreeMenuItem as ITreeMenu, useMenu } from "@refinedev/core";

import {
  UnorderedListOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Layout as AntdLayout,
  Menu,
  type MenuProps,
  theme,
  Button,
} from "antd";
import { Link } from "react-router";
import {
  CanAccessMenuItems,
  ThemedTitle as ThemedTitleV2,
} from "@refinedev/antd";

const { useToken } = theme;

export const FixedSider: React.FC = () => {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { menuItems, selectedKey } = useMenu();

  const renderTreeView = (
    tree: ITreeMenu[],
    selectedKey: string,
    canAccess: (item: ITreeMenu) => boolean,
  ): MenuProps["items"] => {
    return tree.filter(canAccess).map((item: ITreeMenu) => {
      const { name, children, meta, list } = item;

      const icon = meta?.icon;
      const label = meta?.label ?? name;
      const parent = meta?.parent;
      const route = list;

      if (children.length > 0) {
        return {
          key: route ?? name,
          icon: icon ?? <UnorderedListOutlined />,
          label,
          children: renderTreeView(children, selectedKey, canAccess),
        };
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parent !== undefined && children.length === 0);
      return {
        key: route ?? name,
        style: {
          textTransform: "capitalize",
        },
        icon: icon ?? (isRoute && <UnorderedListOutlined />),
        label: (
          <>
            <Link to={route || "/"}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </>
        ),
      };
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
      }}
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
        {(canAccess) => (
          <Menu
            style={{
              marginTop: "8px",
              border: "none",
            }}
            selectedKeys={[selectedKey]}
            mode="inline"
            items={renderTreeView(menuItems, selectedKey, canAccess)}
          />
        )}
      </CanAccessMenuItems>
    </AntdLayout.Sider>
  );
};
