import { Sider as RefineSider } from "@refinedev/antd";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export const Sider = () => (
    <RefineSider
        render={({ items, logout }) => {
            return (
                <>
                    {items}
                    <Menu.Item icon={<CheckOutlined />}>
                        <Link to="/post-review">Post Review</Link>
                    </Menu.Item>
                    {logout}
                </>
            );
        }}
    />
);
