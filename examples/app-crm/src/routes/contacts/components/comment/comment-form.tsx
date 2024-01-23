import { useForm } from "@refinedev/antd";
import { HttpError, useGetIdentity, useParsed } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import { CustomAvatar } from "@/components";
import { User } from "@/graphql/schema.types";
import {
    ContactsCreateContactNoteMutation,
    ContactsCreateContactNoteMutationVariables,
} from "@/graphql/types";

import { CONTACTS_CREATE_CONTACT_NOTE_MUTATION } from "./queries";

type FormValues = GetVariables<ContactsCreateContactNoteMutationVariables>;

type ContactNote = GetFields<ContactsCreateContactNoteMutation>;

export const ContactCommentForm = () => {
    const { id: contactId } = useParsed();

    const { data: me } = useGetIdentity<User>();

    const { formProps, onFinish, form, formLoading } = useForm<
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
            gqlMutation: CONTACTS_CREATE_CONTACT_NOTE_MUTATION,
        },
        redirect: false,
        mutationMode: "optimistic",
        successNotification: () => ({
            key: "contact-note",
            message: "Successfully added note",
            description: "Successful",
            type: "success",
        }),
    });

    const handleOnFinish = async (values: FormValues) => {
        if (!contactId) {
            return;
        }

        const note = values.note.trim();
        if (!note) {
            return;
        }

        try {
            await onFinish({
                ...values,
                contactId: contactId as string,
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
                borderBottom: "1px solid #F0F0F0",
            }}
        >
            <CustomAvatar
                style={{ flexShrink: 0 }}
                name={me?.name}
                src={me?.avatarUrl}
            />
            <Form
                {...formProps}
                style={{ width: "100%" }}
                onFinish={handleOnFinish}
            >
                <Form.Item
                    name="note"
                    noStyle
                    rules={[
                        {
                            required: true,
                            transform(value) {
                                return value?.trim();
                            },
                            message: "Please enter a note",
                        },
                    ]}
                >
                    <Input
                        placeholder="Add your note"
                        style={{ backgroundColor: "#fff" }}
                        addonAfter={formLoading && <LoadingOutlined />}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
