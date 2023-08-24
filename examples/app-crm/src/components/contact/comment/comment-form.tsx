import {
    BaseKey,
    HttpError,
    useGetIdentity,
    useInvalidate,
    useParsed,
} from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Avatar, Form, Input } from "antd";

import { ContactNote, User } from "../../../interfaces/graphql";

type FormValues = ContactNote & {
    contactId: BaseKey;
};

export const ContactCommentForm = () => {
    const { id: contactId } = useParsed();

    const { data: me } = useGetIdentity<User>();

    const { formProps, onFinish, form } = useForm<
        ContactNote,
        HttpError,
        FormValues
    >({
        action: "create",
        resource: "contactNotes",
        queryOptions: {
            enabled: false,
        },
        meta: {
            operation: "contactNotes",
        },
        redirect: false,
        mutationMode: "optimistic",
    });

    const handleOnFinish = async (values: ContactNote) => {
        if (!contactId) {
            return;
        }

        try {
            await onFinish({
                ...values,
                contactId,
            });

            form.resetFields();
        } catch (error) {}
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "1rem",
            }}
        >
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
                <Form.Item name="note" noStyle>
                    <Input
                        placeholder="Write a comment"
                        style={{ backgroundColor: "#fff" }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
