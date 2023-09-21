import { FC } from "react";
import { useParams } from "react-router-dom";

import { DeleteButton, useForm } from "@refinedev/antd";
import {
    HttpError,
    useGetIdentity,
    useInvalidate,
    useList,
    useParsed,
} from "@refinedev/core";

import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import dayjs from "dayjs";

import { CustomAvatar, Text, TextIcon } from "@/components";
import { CompanyNote, User } from "@/interfaces";

type Props = {
    style?: React.CSSProperties;
};

export const CompanyNotes: FC<Props> = ({ style }) => {
    return (
        <Card
            bodyStyle={{
                padding: "0",
            }}
            headStyle={{
                borderBottom: "1px solid #D9D9D9",
            }}
            title={
                <Space size={16}>
                    <TextIcon
                        style={{
                            width: "24px",
                            height: "24px",
                        }}
                    />
                    <Text>Notes</Text>
                </Space>
            }
            style={style}
        >
            <CompanyNoteForm />
            <CompanyNoteList />
        </Card>
    );
};

export const CompanyNoteForm = () => {
    const { id: companyId } = useParsed();

    const { data: me } = useGetIdentity<User>();

    const { formProps, onFinish, form, formLoading } = useForm<CompanyNote>({
        action: "create",
        resource: "companyNotes",
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        mutationMode: "optimistic",
        successNotification: () => ({
            key: "company-note",
            message: "Successfully added note",
            description: "Successful",
            type: "success",
        }),
    });

    const handleOnFinish = async (values: CompanyNote) => {
        if (!companyId) {
            return;
        }

        const note = values.note.trim();
        if (!note) {
            return;
        }

        try {
            await onFinish({
                ...values,
                companyId: companyId,
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
                onFinish={(values) => handleOnFinish(values as CompanyNote)}
            >
                <Form.Item
                    name="note"
                    noStyle
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(
                                /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i,
                            ),
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

export const CompanyNoteList = () => {
    const params = useParams();

    const invalidate = useInvalidate();

    const { data: notes } = useList<CompanyNote>({
        resource: "companyNotes",
        sorters: [
            {
                field: "updatedAt",
                order: "desc",
            },
        ],
        filters: [{ field: "company.id", operator: "eq", value: params.id }],
        meta: {
            fields: [
                "id",
                "note",
                "createdAt",
                { createdBy: ["id", "name", "updatedAt", "avatarUrl"] },
            ],
        },
    });

    const { formProps, setId, id, saveButtonProps } = useForm<
        CompanyNote,
        HttpError,
        CompanyNote
    >({
        resource: "companyNotes",
        action: "edit",
        queryOptions: {
            enabled: false,
        },
        mutationMode: "optimistic",
        onMutationSuccess: () => {
            setId(undefined);
            invalidate({
                invalidates: ["list"],
                resource: "companyNotes",
            });
        },
        successNotification: () => ({
            key: "company-update-note",
            message: "Successfully updated note",
            description: "Successful",
            type: "success",
        }),
    });

    const { data: me } = useGetIdentity<User>();

    return (
        <Space
            size={16}
            direction="vertical"
            style={{
                borderRadius: "8px",
                backgroundColor: "#FAFAFA",
                padding: "1rem",
                width: "100%",
            }}
        >
            {notes?.data?.map((item) => {
                const isMe = me?.id === item.createdBy.id;

                return (
                    <div key={item.id} style={{ display: "flex", gap: "12px" }}>
                        <CustomAvatar
                            style={{ flexShrink: 0 }}
                            name={item.createdBy.name}
                            src={item.createdBy.avatarUrl}
                        />

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
                                    {dayjs(item.createdAt).format(
                                        "MMMM D, YYYY - h:ma",
                                    )}
                                </Text>
                            </div>

                            {id === item.id ? (
                                <Form
                                    {...formProps}
                                    initialValues={{ note: item.note }}
                                >
                                    <Form.Item
                                        name="note"
                                        rules={[
                                            {
                                                required: true,
                                                pattern: new RegExp(
                                                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i,
                                                ),
                                                message: "Please enter a note",
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            autoFocus
                                            required
                                            minLength={1}
                                            style={{
                                                boxShadow:
                                                    "0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.02)",
                                                backgroundColor: "#fff",
                                                width: "100%",
                                            }}
                                        />
                                    </Form.Item>
                                </Form>
                            ) : (
                                <Typography.Paragraph
                                    style={{
                                        boxShadow:
                                            "0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.02)",
                                        background: "#fff",
                                        borderRadius: "6px",
                                        padding: "8px",
                                        marginBottom: 0,
                                    }}
                                    ellipsis={{ rows: 3, expandable: true }}
                                >
                                    {item.note}
                                </Typography.Paragraph>
                            )}

                            {isMe && !id && (
                                <Space size={16}>
                                    <Typography.Link
                                        type="secondary"
                                        style={{
                                            fontSize: "12px",
                                        }}
                                        onClick={() => setId(item.id)}
                                    >
                                        Edit
                                    </Typography.Link>
                                    <DeleteButton
                                        resource="companyNotes"
                                        recordItemId={item.id}
                                        size="small"
                                        type="link"
                                        successNotification={() => ({
                                            key: "company-delete-note",
                                            message:
                                                "Successfully deleted note",
                                            description: "Successful",
                                            type: "success",
                                        })}
                                        icon={null}
                                        className="ant-typography secondary"
                                        style={{
                                            fontSize: "12px",
                                        }}
                                    />
                                </Space>
                            )}

                            {id === item.id && (
                                <Space>
                                    <Button
                                        size="small"
                                        onClick={() => setId(undefined)}
                                    >
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
            })}
        </Space>
    );
};
