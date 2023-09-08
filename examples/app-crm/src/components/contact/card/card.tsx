import React from "react";
import { Button, Dropdown, MenuProps } from "antd";
import {
    DeleteOutlined,
    EllipsisOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { useDelete, useGetToPath } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

import { Text } from "../../text";
import { ContactStatusTag } from "../status-tag";
import { CustomAvatar } from "../../custom-avatar";
import { Contact } from "../../../interfaces/graphql";

import styles from "./index.module.css";
import { ContactCardSkeleton } from "./skeleton";

type ContactCardProps = {
    contact: Contact | null;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { mutate: deleteMutate } = useDelete();

    if (!contact) return <ContactCardSkeleton />;

    const { name, email, status, jobTitle, company, avatarUrl, id } = contact;
    const items: MenuProps["items"] = [
        {
            label: "Show",
            key: "show",
            icon: <EyeOutlined />,
            onClick: () => {
                navigate(
                    getToPath({
                        action: "show",
                        meta: { id },
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            },
        },
        {
            label: "Delete",
            key: "delete",
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => {
                deleteMutate({
                    resource: "contacts",
                    id,
                });
            },
        },
    ];

    return (
        <div className={styles.container}>
            <Dropdown
                className={styles.dropdown}
                menu={{ items }}
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
                <Text ellipsis={{ tooltip: true }}>
                    {(jobTitle && `${jobTitle} at`) || <span>&nbsp;</span>}
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
                            shape="square"
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
