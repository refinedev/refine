import { Sider as RefineSider } from "@refinedev/antd";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useMenu } from "@refinedev/core";

export const Sider = () => {
  const { selectedKey } = useMenu();
  return (
    <RefineSider
      render={({ items, logout }) => {
        return (
          <>
            {items}
            <Menu.Item
              key="/post-review"
              icon={<CheckOutlined />}
              style={{
                fontWeight: selectedKey === "/post-review" ? "bold" : "normal",
              }}
            >
              <Link to="/post-review">Post Review</Link>
            </Menu.Item>
            {logout}
          </>
        );
      }}
    />
  );
};
