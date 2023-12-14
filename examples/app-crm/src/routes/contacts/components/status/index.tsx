import React from "react";

import { useUpdate } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";

import {
    CheckCircleFilled,
    DownOutlined,
    MinusCircleFilled,
    PlayCircleFilled,
    PlayCircleOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";

import { Text } from "@/components";
import { ContactStageEnum, ContactStatusEnum } from "@/enums";
import { ContactStatus as ContactStatusType } from "@/graphql/schema.types";
import { ContactShowQuery } from "@/graphql/types";

import styles from "./index.module.css";

type ContactStatusProps = {
    contact: GetFields<ContactShowQuery>;
};

const statusToStage = (status: ContactStatusEnum): ContactStageEnum => {
    let stage: ContactStageEnum = ContactStageEnum.CUSTOMER;
    switch (status) {
        case ContactStatusEnum.NEW:
        case ContactStatusEnum.CONTACTED:
        case ContactStatusEnum.INTERESTED:
            stage = ContactStageEnum.LEAD;
            break;
        case ContactStatusEnum.QUALIFIED:
        case ContactStatusEnum.NEGOTIATION:
            stage = ContactStageEnum.SALES_QUALIFIED_LEAD;
            break;
        case ContactStatusEnum.UNQUALIFIED:
            stage = ContactStageEnum.LEAD;
            break;
        case ContactStatusEnum.LOST:
            stage = ContactStageEnum.SALES_QUALIFIED_LEAD;
            break;
        case ContactStatusEnum.WON:
            stage = ContactStageEnum.CUSTOMER;
            break;
        case ContactStatusEnum.CHURNED:
            stage = ContactStageEnum.CUSTOMER;
            break;

        default:
            break;
    }
    return stage;
};

const LifecycleStage: React.FC<{ status: ContactStatusType }> = ({
    status,
}) => {
    const stage = statusToStage(status as ContactStatusEnum);
    let icon = <PlayCircleOutlined style={{ color: "#08979C" }} />;

    switch (status) {
        case ContactStatusEnum.WON:
            icon = <CheckCircleFilled style={{ color: "#389E0D" }} />;
            break;
        case ContactStatusEnum.CHURNED:
            icon = <MinusCircleFilled style={{ color: "#CF1322" }} />;
            break;
        case ContactStatusEnum.LOST:
            icon = <PlayCircleFilled style={{ color: "#CF1322" }} />;
            break;
        case ContactStatusEnum.UNQUALIFIED:
            icon = <PlayCircleOutlined style={{ color: "#CF1322" }} />;
            break;
        default:
            break;
    }

    return (
        <Text strong>
            Lifecycle stage: {icon}
            <Text
                style={{
                    marginLeft: ".2rem",
                    textTransform: "capitalize",
                    fontWeight: "normal",
                }}
            >
                {stage.replaceAll("_", " ").toLowerCase()}
            </Text>
        </Text>
    );
};

export const ContactStatus: React.FC<ContactStatusProps> = ({ contact }) => {
    const { mutate } = useUpdate();
    const { status } = contact;

    const updateStatus = (status: ContactStatusEnum) => {
        const stage = statusToStage(status);
        mutate({
            resource: "contacts",
            mutationMode: "optimistic",
            id: contact.id,
            values: {
                status,
                stage,
            },
        });
    };

    return (
        <div>
            <LifecycleStage status={status} />
            <ul
                className={`${styles.container} ${styles[status]}`}
                style={{ marginTop: "1rem" }}
            >
                <li
                    className={`${styles.item} ${
                        status === ContactStatusEnum.NEW ? styles.active : ""
                    }`}
                >
                    <a
                        onClick={() => {
                            updateStatus(ContactStatusEnum.NEW);
                        }}
                    >
                        New
                    </a>
                </li>
                <li
                    className={`${styles.item} ${
                        status === ContactStatusEnum.CONTACTED
                            ? styles.active
                            : ""
                    }
            }`}
                >
                    <a
                        onClick={() => {
                            updateStatus(ContactStatusEnum.CONTACTED);
                        }}
                    >
                        Contacted
                    </a>
                </li>
                <li
                    className={`${styles.item} ${
                        status === ContactStatusEnum.INTERESTED ||
                        status === ContactStatusEnum.UNQUALIFIED
                            ? styles.active
                            : ""
                    }`}
                >
                    <Dropdown
                        arrow
                        trigger={["click"]}
                        placement="bottomRight"
                        menu={{
                            onClick: ({ key }) => {
                                updateStatus(key as ContactStatusEnum);
                            },
                            items: [
                                {
                                    label: "Interested",
                                    key: ContactStatusEnum.INTERESTED,
                                },
                                {
                                    label: "Unqualified",
                                    key: ContactStatusEnum.UNQUALIFIED,
                                    danger: true,
                                },
                            ],
                        }}
                    >
                        <a>
                            {status === ContactStatusEnum.UNQUALIFIED
                                ? "Unqualified"
                                : "Interested"}
                            <DownOutlined className={styles.arrow} />
                        </a>
                    </Dropdown>
                </li>
                <li
                    className={`${styles.item} ${
                        status === ContactStatusEnum.QUALIFIED
                            ? styles.active
                            : ""
                    }`}
                >
                    <a
                        onClick={() => {
                            updateStatus(ContactStatusEnum.QUALIFIED);
                        }}
                    >
                        Qualified
                    </a>
                </li>
                <li
                    className={`${styles.item} ${
                        status === ContactStatusEnum.NEGOTIATION ||
                        status === ContactStatusEnum.LOST
                            ? styles.active
                            : ""
                    }`}
                >
                    <Dropdown
                        arrow
                        trigger={["click"]}
                        placement="bottomRight"
                        menu={{
                            onClick: ({ key }) => {
                                updateStatus(key as ContactStatusEnum);
                            },
                            items: [
                                {
                                    label: "Negotiation",
                                    key: ContactStatusEnum.NEGOTIATION,
                                },
                                {
                                    label: "Lost",
                                    key: ContactStatusEnum.LOST,
                                    danger: true,
                                },
                            ],
                        }}
                    >
                        <a>
                            {status === ContactStatusEnum.LOST
                                ? "Lost"
                                : "Negotiation"}
                            <DownOutlined className={styles.arrow} />
                        </a>
                    </Dropdown>
                </li>
                <li
                    className={`${styles.item} ${
                        status === ContactStatusEnum.WON ||
                        status === ContactStatusEnum.CHURNED
                            ? styles.active
                            : ""
                    }`}
                >
                    <Dropdown
                        arrow
                        trigger={["click"]}
                        placement="bottomRight"
                        menu={{
                            onClick: ({ key }) => {
                                updateStatus(key as ContactStatusEnum);
                            },
                            items: [
                                {
                                    label: "Won",
                                    key: ContactStatusEnum.WON,
                                },
                                {
                                    label: "Churned",
                                    key: ContactStatusEnum.CHURNED,
                                    danger: true,
                                },
                            ],
                        }}
                    >
                        <a>
                            {status === ContactStatusEnum.CHURNED
                                ? "Churned"
                                : "Won"}
                            <DownOutlined className={styles.arrow} />
                        </a>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
};
