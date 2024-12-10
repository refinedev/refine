import React from "react";
import { useTitle, useMenu } from "@refinedev/core";
import { Menu } from "antd";
import { Link } from "react-router";

export const CustomSider: React.FC = () => {
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();

  return (
    <>
      {Title && <Title collapsed={false} />}
      <Menu theme="dark" selectedKeys={[selectedKey]} mode="horizontal">
        {menuItems.map(({ icon, route, label }) => (
          <Menu.Item key={route} icon={icon}>
            <Link to={route ?? ""}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};
