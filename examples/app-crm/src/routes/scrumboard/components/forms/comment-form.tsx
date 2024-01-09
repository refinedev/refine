import { useForm } from "@refinedev/antd";
import {
    BaseKey,
    HttpError,
    useGetIdentity,
    useInvalidate,
    useParsed,
} from "@refinedev/core";

import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import { CustomAvatar } from "@/components";
import { TaskComment, User } from "@/graphql/schema.types";

type FormValues = TaskComment & {
    taskId: BaseKey;
};

export const CommentForm = () => {
    const invalidate = useInvalidate();
    const { id: taskId } = useParsed();

    const { data: me } = useGetIdentity<User>();

    const { formProps, formLoading, form, onFinish } = useForm<
        TaskComment,
        HttpError,
        FormValues
    >({
        action: "create",
        resource: "taskComments",
        queryOptions: {
            enabled: false,
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
        successNotification: () => ({
            key: "task-comment",
            message: "Successfully added comment",
            description: "Successful",
            type: "success",
        }),
    });

    const handleOnFinish = async (values: TaskComment) => {
        if (!taskId) {
            return;
        }
        const comment = values.comment.trim();
        if (!comment) {
            form.resetFields();
            return;
        }

        try {
            await onFinish({
                ...values,
                taskId,
            });
        } catch (error) {}

        form.resetFields();
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CustomAvatar
                style={{ flexShrink: 0 }}
                src={me?.avatarUrl}
                name={me?.name}
            />
            <Form
                {...formProps}
                style={{ width: "100%" }}
                onFinish={handleOnFinish}
            >
                <Form.Item
                    name="comment"
                    noStyle
                    rules={[
                        {
                            required: true,
                            transform(value) {
                                return value?.trim();
                            },
                            message: "Please enter a comment",
                        },
                    ]}
                >
                    <Input
                        placeholder="Write a comment"
                        addonAfter={formLoading && <LoadingOutlined />}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
