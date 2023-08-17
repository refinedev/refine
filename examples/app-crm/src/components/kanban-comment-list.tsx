import { useParsed } from "@refinedev/core";
import { useSimpleList } from "@refinedev/antd";
import { Avatar, List, Space, Typography } from "antd";

import { Text } from "../components/text";

import { TaskComment } from "../interfaces/graphql";

const CommentListItem = ({ item }: { item: TaskComment }) => {
    return (
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <Avatar alt={item.createdBy.name} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: "5px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Text strong>{item.createdBy.name}</Text>
                    <Text>{item.createdAt}</Text>
                </div>

                <Text
                    style={{
                        background: "#fff",
                        borderRadius: "6px",
                        padding: "8px",
                    }}
                >
                    {item.comment}
                </Text>

                <Space size={16}>
                    <Typography.Link>Edit</Typography.Link>
                    <Typography.Link>Delete</Typography.Link>
                </Space>
            </div>
        </div>
    );
};

export const KanbanCommentList = () => {
    const { id: taskId } = useParsed();

    const { listProps } = useSimpleList<TaskComment>({
        resource: "taskComments",
        //TODO: nested filters not working
        // filters: {
        //     permanent: [{ field: "task.id", operator: "eq", value: taskId }],
        // },
        //TODO: sorters not working
        // sorters: {
        //     initial: [{ field: "createdAt", order: "desc" }],
        // },
        //TODO: pagination not working
        // pagination: {
        //     mode: "off",
        // },
        meta: {
            fields: [
                "id",
                "comment",
                "createdAt",
                { createdBy: ["id", "name"] },
            ],
        },
        syncWithLocation: false,
    });

    return (
        <List
            {...listProps}
            itemLayout="horizontal"
            renderItem={(item) => <CommentListItem key={item.id} item={item} />}
        />
    );
};
