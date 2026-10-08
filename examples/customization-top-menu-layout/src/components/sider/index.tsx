import React from "react";
import { useMenu, useRefineOptions } from "@refinedev/core";
import { Menu } from "antd";
import { Link } from "react-router";

export const CustomSider: React.FC = () => {
  const { menuItems, selectedKey } = useMenu();
  const { title } = useRefineOptions();

  return (
    <>
      {title.text}
      <Menu
        theme="dark"
        selectedKeys={[selectedKey]}
        mode="horizontal"
        items={menuItems.map(({ key, icon, route, label }) => ({
          key: route ?? key,
          icon,
          label: <Link to={route ?? ""}>{label}</Link>,
        }))}
      />
    </>
  );
};
