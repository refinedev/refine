import React from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { MenuInfo } from "rc-menu/lib/interface";

import { Text } from "../../text";
import { ContactStatusTag } from "../status-tag";

import { Contact } from "../../../interfaces/graphql";
import styles from "./index.module.css";
import { CustomAvatar } from "../../custom-avatar";

type ContactCardProps = {
    contact: Contact;
    onClick?: (menu: MenuInfo) => void;
};

const items: MenuProps["items"] = [
    {
        label: "Show",
        key: "show",
        icon: <EyeOutlined />,
    },
];

export const ContactCard: React.FC<ContactCardProps> = ({
    contact,
    onClick,
}) => {
    const { name, email, status, jobTitle, company, avatarUrl } = contact;
    return (
        <div className={styles.container}>
            <Dropdown
                className={styles.dropdown}
                menu={{
                    items,
                    onClick: (e) => onClick?.(e),
                }}
                trigger={["click"]}
            >
                <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>

            <div className={styles.personal}>
                <CustomAvatar size={64} src={avatarUrl} name={name} />
                <Text
                    className={styles.name}
                    strong
                    ellipsis={{
                        tooltip: true,
                    }}
                >
                    {name}
                </Text>
                <Text
                    ellipsis={{
                        tooltip: true,
                    }}
                    className={styles.email}
                >
                    {email}
                </Text>
                <ContactStatusTag status={status} />
            </div>

            <div className={styles.company}>
                <Text
                    ellipsis={{
                        tooltip: true,
                    }}
                >
                    {`${jobTitle} at` || "-"}
                </Text>
                <div className={styles.companyName}>
                    <Text
                        strong
                        ellipsis={{
                            tooltip: true,
                        }}
                    >
                        <CustomAvatar
                            src={company.avatarUrl}
                            name={company.name}
                            style={{
                                display: "inline-flex",
                                marginRight: 8,
                            }}
                        />
                        {company.name}
                    </Text>
                </div>
            </div>
        </div>
    );
};
