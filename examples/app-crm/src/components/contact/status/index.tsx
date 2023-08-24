import React from "react";
import { Button, Dropdown } from "antd";

import { ContactStatusEnum } from "../../../enums/contact-status";
import styles from "./index.module.css";

export const ContactStatus: React.FC = () => {
    const items = [
        {
            label: "New",
            key: ContactStatusEnum.NEW,
            children: undefined,
        },
        {
            label: "Contact",
            key: ContactStatusEnum.CONTACTED,
            children: undefined,
        },
        {
            label: "Interested",
            key: ContactStatusEnum.INTERESTED,
            children: [
                {
                    key: ContactStatusEnum.INTERESTED,
                    label: "Interested",
                },
                {
                    key: ContactStatusEnum.UNQUALIFIED,
                    label: "Unqualified",
                    danger: true,
                },
            ],
        },
        {
            label: "Qualified",
            key: ContactStatusEnum.QUALIFIED,
            children: undefined,
        },
        {
            label: "Negotiation",
            key: ContactStatusEnum.NEGOTIATION,
            children: [
                {
                    key: ContactStatusEnum.NEGOTIATION,
                    label: "Negotiation",
                },
                {
                    key: ContactStatusEnum.LOST,
                    label: "Lost",
                    danger: true,
                },
            ],
        },
        {
            label: "Won",
            key: ContactStatusEnum.WON,
            children: [
                {
                    key: ContactStatusEnum.WON,
                    label: "Won",
                },
                {
                    key: ContactStatusEnum.CHURNED,
                    label: "Churned",
                    danger: true,
                },
            ],
        },
    ];

    return (
        <ul className={styles.container}>
            {items.map((item) => {
                if (item.children) {
                    return (
                        <li
                            key={item.key}
                            className={`${styles.item} ${item.key}`}
                        >
                            <Dropdown
                                arrow
                                trigger={["click"]}
                                placement="bottomRight"
                                menu={{
                                    items: item.children,
                                }}
                            >
                                <Button className={styles.button} type="link">
                                    {item.label}
                                </Button>
                            </Dropdown>
                        </li>
                    );
                }

                return (
                    <li key={item.key} className={styles.item}>
                        <Button className={styles.button} type="link">
                            {item.label}
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};
