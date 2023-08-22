import {
    BaseKey,
    HttpError,
    useGetIdentity,
    useInvalidate,
    useParsed,
} from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Avatar, Form, Input } from "antd";

import { TaskComment, User } from "../../interfaces/graphql";

type FormValues = TaskComment & {
    taskId: BaseKey;
};

export const CommentForm = () => {
    const invalidate = useInvalidate();
    const { id: taskId } = useParsed();

    const { data: me } = useGetIdentity<User>();

    const { formProps, onFinish, form } = useForm<
        TaskComment,
        HttpError,
        FormValues
    >({
        action: "create",
        resource: "taskComments",
        queryOptions: {
            enabled: false,
        },
        meta: {
            operation: "taskComment",
        },
        redirect: false,
        mutationMode: "optimistic",
        onMutationSuccess: () => {
            invalidate({
                invalidates: ["list", "detail"],
                resource: "tasks",
                id: taskId,
            });
        },
    });

    const handleOnFinish = async (values: TaskComment) => {
        if (!taskId) {
            return;
        }

        try {
            await onFinish({
                ...values,
                taskId,
            });

            form.resetFields();
        } catch (error) {}
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar
                style={{
                    flexShrink: 0,
                    objectFit: "contain",
                    textTransform: "uppercase",
                }}
                size="small"
                alt={me?.name}
                src={me?.avatarUrl}
            >
                {me?.name.charAt(0)}
            </Avatar>
            <Form
                {...formProps}
                style={{ width: "100%" }}
                onFinish={handleOnFinish}
            >
                <Form.Item name="comment" noStyle>
                    <Input
                        placeholder="Write a comment"
                        style={{ backgroundColor: "#fff" }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
