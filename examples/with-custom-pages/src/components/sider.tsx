import { ThemedSider as RefineSider } from "@refinedev/antd";
import { Link } from "react-router";
import { CheckOutlined } from "@ant-design/icons";
import { useMenu } from "@refinedev/core";

export const Sider = () => {
  const { selectedKey } = useMenu();
  return (
    <RefineSider
      render={({ menuItems, logoutItem }) => [
        ...menuItems,
        {
          key: "/post-review",
          icon: <CheckOutlined />,
          style: {
            fontWeight: selectedKey === "/post-review" ? "bold" : "normal",
          },
          label: <Link to="/post-review">Post Review</Link>,
        },
        logoutItem,
      ]}
    />
  );
};
