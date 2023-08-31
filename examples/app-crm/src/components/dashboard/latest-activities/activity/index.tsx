import React from "react";
import { Skeleton } from "antd";
import dayjs from "dayjs";

import { Text } from "../../../text";
import { CustomAvatar } from "../../../custom-avatar";
import { Audit, Task } from "../../../../interfaces/graphql";

import styles from "./index.module.css";

type DashboardLatestActivityProps = {
    item: Audit;
    isLoading?: boolean;
    task?: Task;
};

export const DashboardLatestActivity: React.FC<
    DashboardLatestActivityProps
> = ({ item, isLoading, task }) => {
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
                        shape="circle"
                        size={48}
                        src={user?.avatarUrl}
                        name={user?.name}
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
                        <Text>moved</Text>
                        <Text strong>{task?.title}</Text>
                        <Text>task to</Text>
                        <Text strong>{task?.stage?.title || "Unassigned"}</Text>
                        <Text>stage.</Text>
                    </Text>
                </div>
            </Skeleton>
        </div>
    );
};
