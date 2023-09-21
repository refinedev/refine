import { useState } from "react";

import { useForm, useSelect } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";

import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Select, Skeleton, Space } from "antd";

import { CustomAvatar, SelectOptionWithAvatar, Text } from "@/components";
import { Company, User } from "@/interfaces";
import { getNameInitials } from "@/utilities";

import styles from "./title-form.module.css";

export const CompanyTitleForm = () => {
    const { formProps, queryResult, onFinish } = useForm<Company, HttpError>({
        redirect: false,
        meta: {
            fields: [
                "id",
                "name",
                "avatarUrl",
                {
                    salesOwner: ["id", "name", "avatarUrl"],
                },
            ],
        },
    });

    const company = queryResult?.data?.data;
    const loading = queryResult?.isLoading;

    return (
        <Form {...formProps}>
            <Space size={16}>
                <CustomAvatar
                    size="large"
                    shape="square"
                    src={company?.avatarUrl}
                    name={getNameInitials(company?.name || "")}
                    style={{
                        width: 96,
                        height: 96,
                        fontSize: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                    }}
                />
                <Space direction="vertical" size={0}>
                    <Form.Item name="name" required noStyle>
                        <TitleInput
                            loading={loading}
                            onChange={(value) => {
                                return onFinish?.({
                                    name: value,
                                });
                            }}
                        />
                    </Form.Item>
                    <SalesOwnerInput
                        salesOwner={company?.salesOwner}
                        loading={loading}
                        onChange={(value) => {
                            onFinish?.({
                                salesOwnerId: value,
                            });
                        }}
                    />
                </Space>
            </Space>
        </Form>
    );
};

const TitleInput = ({
    value,
    onChange,
    loading,
}: {
    // value is set by <Form.Item />
    value?: string;
    onChange?: (value: string) => void;
    loading?: boolean;
}) => {
    return (
        <Text
            className={styles.title}
            size="xl"
            strong
            editable={{
                onChange,
                triggerType: ["text", "icon"],
                icon: <EditOutlined className={styles.titleEditIcon} />,
            }}
        >
            {loading ? (
                <Skeleton.Input size="small" style={{ width: 200 }} active />
            ) : (
                value
            )}
        </Text>
    );
};

const SalesOwnerInput = ({
    salesOwner,
    onChange,
    loading,
}: {
    onChange?: (value: string) => void;
    salesOwner?: Company["salesOwner"];
    loading?: boolean;
}) => {
    const [isEdit, setIsEdit] = useState(false);

    const { selectProps, queryResult } = useSelect<User>({
        resource: "users",
        optionLabel: "name",
        pagination: {
            mode: "off",
        },
        meta: {
            fields: ["id", "name", "avatarUrl"],
        },
    });

    return (
        <div
            className={styles.salesOwnerInput}
            role="button"
            onClick={() => {
                setIsEdit(true);
            }}
        >
            <Text
                type="secondary"
                style={{
                    marginRight: 12,
                }}
            >
                Sales Owner:
            </Text>
            {loading && (
                <Skeleton.Input size="small" style={{ width: 120 }} active />
            )}
            {!isEdit && !loading && (
                <>
                    <CustomAvatar
                        size="small"
                        src={salesOwner?.avatarUrl}
                        style={{
                            marginRight: 4,
                        }}
                    />
                    <Text>{salesOwner?.name}</Text>
                    <Button
                        type="link"
                        icon={
                            <EditOutlined
                                className={styles.salesOwnerInputEditIcon}
                            />
                        }
                    />
                </>
            )}
            {isEdit && !loading && (
                <Form.Item name={["salesOwner", "id"]} noStyle>
                    <Select
                        {...selectProps}
                        defaultOpen={true}
                        autoFocus
                        onDropdownVisibleChange={(open) => {
                            if (!open) {
                                setIsEdit(false);
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(value, option) => {
                            onChange?.(value as unknown as string);
                            selectProps.onChange?.(value, option);
                        }}
                        options={
                            queryResult.data?.data?.map(
                                ({ id, name, avatarUrl }) => ({
                                    value: id,
                                    label: (
                                        <SelectOptionWithAvatar
                                            name={name}
                                            avatarUrl={avatarUrl ?? undefined}
                                        />
                                    ),
                                }),
                            ) ?? []
                        }
                    />
                </Form.Item>
            )}
        </div>
    );
};
