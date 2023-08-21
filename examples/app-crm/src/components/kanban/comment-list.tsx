import { useGetIdentity, useList, useParsed } from "@refinedev/core";
import { DeleteButton, useForm } from "@refinedev/antd";
import { Avatar, Form, Space, Typography, Input, Button } from "antd";
import dayjs from "dayjs";

import { Text } from "../../components/text";
import { TaskComment, User } from "../../interfaces/graphql";

const CommentListItem = ({ item }: { item: TaskComment }) => {
    const { formProps, setId, id, saveButtonProps } = useForm<TaskComment>({
        resource: "taskComment",
        action: "edit",
        queryOptions: {
            enabled: false,
        },
        onMutationSuccess: () => {
            setId(undefined);
        },
    });
    const { data: me } = useGetIdentity<User>();

    const isMe = me?.id === item.createdBy.id;

    return (
        <div style={{ display: "flex", gap: "12px" }}>
            <Avatar style={{ flexShrink: 0 }} size={22}>
                {item.createdBy.name.toString().charAt(0)}
            </Avatar>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontWeight: 500 }}>
                        {item.createdBy.name}
                    </Text>
                    <Text size="xs" style={{ color: "#000000a6" }}>
                        {dayjs(item.createdAt).format("MMMM D, YYYY - h:ma")}
                    </Text>
                </div>

                {id ? (
                    <Form
                        {...formProps}
                        initialValues={{ comment: item.comment }}
                    >
                        <Form.Item name="comment" noStyle>
                            <Input.TextArea
                                autoFocus
                                style={{ backgroundColor: "#fff" }}
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <Typography.Paragraph
                        style={{
                            background: "#fff",
                            borderRadius: "6px",
                            padding: "8px",
                            marginBottom: 0,
                        }}
                        ellipsis={{ rows: 3, expandable: true }}
                    >
                        {item.comment}
                    </Typography.Paragraph>
                )}

                {isMe && !id && (
                    <Space size={16}>
                        <Typography.Link
                            style={{ color: "inherit", fontSize: "12px" }}
                            onClick={() => setId(item.id)}
                        >
                            Edit
                        </Typography.Link>
                        <DeleteButton
                            resource="taskComment"
                            recordItemId={item.id}
                            size="small"
                            type="link"
                            icon={null}
                            style={{
                                padding: 0,
                                fontSize: "12px",
                                color: "inherit",
                            }}
                        />
                    </Space>
                )}

                {id && (
                    <Space>
                        <Button size="small" onClick={() => setId(undefined)}>
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            type="primary"
                            {...saveButtonProps}
                        >
                            Save
                        </Button>
                    </Space>
                )}
            </div>
        </div>
    );
};

export const CommentList = () => {
    const { id: taskId } = useParsed();

    const { data } = useList<TaskComment>({
        resource: "taskComments",
        filters: [{ field: "task.id", operator: "eq", value: taskId }],
        sorters: [{ field: "createdAt", order: "desc" }],
        pagination: {
            mode: "off",
        },
        meta: {
            fields: [
                "id",
                "comment",
                "createdAt",
                { createdBy: ["id", "name"] },
            ],
        },
    });

    return (
        <Space size={16} direction="vertical">
            {data?.data?.map((item) => (
                <CommentListItem key={item.id} item={item} />
            ))}
        </Space>
    );
};
