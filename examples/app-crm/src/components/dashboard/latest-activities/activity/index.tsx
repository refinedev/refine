import React from "react";
import { Avatar, Skeleton, Tag } from "antd";
import dayjs from "dayjs";

import { Text } from "../../../text";
import { Audit } from "../../../../interfaces/graphql";

import styles from "./index.module.css";

type DashboardLatestActivityProps = {
    item: Audit;
    isLoading?: boolean;
};

export const DashboardLatestActivity: React.FC<
    DashboardLatestActivityProps
> = ({ item, isLoading }) => {
    const { id, action, targetEntity, targetId, user, createdAt } = item;
    const renderTag = () => {
        switch (action) {
            case "CREATE":
                return <Tag color="success">Created</Tag>;
            case "DELETE":
                return <Tag color="error">Updated</Tag>;
            case "UPDATE":
                return <Tag color="blue">Updated</Tag>;
            default:
                return null;
        }
    };

    return (
        <div key={id} className={styles.container}>
            <Skeleton
                loading={isLoading}
                active
                avatar
                paragraph={{
                    rows: 0,
                }}
                style={{
                    padding: 0,
                }}
            >
                <div className={styles.avatar}>
                    <Avatar shape="square" size={48}>
                        {user?.name[0]}
                    </Avatar>
                </div>
                <div className={styles.action}>
                    <Text type="secondary" size="xs">
                        {dayjs(createdAt).fromNow()}
                    </Text>

                    <Text className={styles.detail}>
                        <Text className={styles.name} strong>
                            {user?.name}
                        </Text>
                        {renderTag()}
                        <Text strong>{targetEntity}</Text>
                        <Text>with</Text>
                        <Text strong>{targetId}</Text>
                    </Text>
                </div>
            </Skeleton>
        </div>
    );
};
