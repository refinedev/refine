import React from "react";
import { Skeleton } from "antd";
import dayjs from "dayjs";

import { Text } from "../../../text";
import { CustomAvatar } from "../../../custom-avatar";
import { Audit, Deal } from "../../../../interfaces/graphql";

import styles from "./index.module.css";

type DashboardLatestActivityProps = {
    item: Audit;
    isLoading?: boolean;
    deal?: Deal;
};

export const DashboardLatestActivity: React.FC<
    DashboardLatestActivityProps
> = ({ item, isLoading, deal }) => {
    const { id, user, createdAt } = item;

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
                    <CustomAvatar
                        shape="square"
                        size={48}
                        src={deal?.company.avatarUrl}
                        name={deal?.company.name}
                    />
                </div>
                <div className={styles.action}>
                    <Text type="secondary" size="xs">
                        {dayjs(createdAt).fromNow()}
                    </Text>

                    <Text className={styles.detail}>
                        <Text className={styles.name} strong>
                            {user?.name}
                        </Text>
                        <Text>
                            {item.action === "CREATE" ? "created" : "moved"}
                        </Text>
                        <Text strong>{deal?.title}</Text>
                        <Text>deal to</Text>
                        <Text strong>
                            {deal?.stage?.title || "Unassigned"}.
                        </Text>
                    </Text>
                </div>
            </Skeleton>
        </div>
    );
};
