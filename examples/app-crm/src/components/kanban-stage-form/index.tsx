import { Checkbox, Dropdown, MenuProps, Space } from "antd";
import { FlagOutlined, DownOutlined } from "@ant-design/icons";

import styles from "./index.module.css";

const items: MenuProps["items"] = [
    {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: "0",
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: "1",
    },
    {
        type: "divider",
    },
    {
        label: "3rd menu item",
        key: "3",
    },
];

export const KanbanStageForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div>
                    <FlagOutlined />
                    <Dropdown menu={{ items }} trigger={["click"]}>
                        <Space>
                            To do
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>
                <Checkbox>Mark as complete</Checkbox>
            </div>
        </div>
    );
};
