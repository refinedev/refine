import React, { useState } from "react";

import { useDelete, useNavigation, useShow, useUpdate } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query/dist/interfaces";

import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    GlobalOutlined,
    IdcardOutlined,
    MailOutlined,
    PhoneOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Drawer,
    Form,
    Input,
    Popconfirm,
    Select,
    Space,
    Spin,
    Typography,
} from "antd";
import dayjs from "dayjs";

import {
    CustomAvatar,
    SelectOptionWithAvatar,
    SingleElementForm,
    Text,
    TextIcon,
} from "@/components";
import { TimezoneEnum } from "@/enums";
import type { Contact } from "@/graphql/schema.types";
import { ContactShowQuery } from "@/graphql/types";
import { useCompaniesSelect } from "@/hooks/useCompaniesSelect";
import { useUsersSelect } from "@/hooks/useUsersSelect";

import { ContactComment, ContactStatus } from "../components";
import styles from "./index.module.css";
import { CONTACT_SHOW_QUERY } from "./queries";

const timezoneOptions = Object.keys(TimezoneEnum).map((key) => ({
    label: TimezoneEnum[key as keyof typeof TimezoneEnum],
    value: TimezoneEnum[key as keyof typeof TimezoneEnum],
}));

export const ContactShowPage: React.FC = () => {
    const [activeForm, setActiveForm] = useState<
        "email" | "companyId" | "jobTitle" | "phone" | "timezone"
    >();
    const { list } = useNavigation();
    const { mutate } = useUpdate<Contact>();
    const { mutate: deleteMutation } = useDelete<Contact>();
    const { queryResult } = useShow<GetFields<ContactShowQuery>>({
        meta: {
            gqlQuery: CONTACT_SHOW_QUERY,
        },
    });
    const {
        selectProps: companySelectProps,
        queryResult: companySelectQueryResult,
    } = useCompaniesSelect();

    const {
        selectProps: usersSelectProps,
        queryResult: usersSelectQueryResult,
    } = useUsersSelect();

    const closeModal = () => {
        setActiveForm(undefined);

        list("contacts");
    };

    const { data, isLoading, isError } = queryResult;

    if (isError) {
        closeModal();
        return null;
    }

    if (isLoading) {
        return (
            <Drawer
                open
                width={756}
                bodyStyle={{
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Spin />
            </Drawer>
        );
    }

    const {
        id,
        name,
        email,
        jobTitle,
        phone,
        timezone,
        avatarUrl,
        company,
        createdAt,
        salesOwner,
    } = data?.data ?? {};

    return (
        <Drawer
            open
            onClose={() => closeModal()}
            width={756}
            bodyStyle={{ background: "#f5f5f5", padding: 0 }}
            headerStyle={{ display: "none" }}
        >
            <div className={styles.header}>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => closeModal()}
                />
            </div>
            <div className={styles.container}>
                <div className={styles.name}>
                    <CustomAvatar
                        style={{
                            marginRight: "1rem",
                            flexShrink: 0,
                            fontSize: "40px",
                        }}
                        size={96}
                        src={avatarUrl}
                        name={name}
                    />
                    <Typography.Title
                        level={3}
                        style={{ padding: 0, margin: 0, width: "100%" }}
                        className={styles.title}
                        editable={{
                            onChange(value) {
                                mutate({
                                    resource: "contacts",
                                    id,
                                    values: {
                                        name: value,
                                    },
                                    successNotification: false,
                                });
                            },
                            triggerType: ["text", "icon"],
                            icon: (
                                <EditOutlined
                                    className={styles.titleEditIcon}
                                />
                            ),
                        }}
                    >
                        {name}
                    </Typography.Title>
                </div>

                <div className={styles.form}>
                    <SingleElementForm
                        icon={<MailOutlined className="tertiary" />}
                        state={
                            activeForm && activeForm === "email"
                                ? "form"
                                : email
                                ? "view"
                                : "empty"
                        }
                        itemProps={{
                            name: "email",
                            label: "Email",
                        }}
                        view={<Text>{email}</Text>}
                        onClick={() => setActiveForm("email")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Input defaultValue={email} />
                    </SingleElementForm>

                    <SingleElementForm
                        icon={<ShopOutlined className="tertiary" />}
                        state={
                            activeForm && activeForm === "companyId"
                                ? "form"
                                : company.id
                                ? "view"
                                : "empty"
                        }
                        itemProps={{
                            name: "companyId",
                            label: "Company",
                        }}
                        view={
                            <Space>
                                <CustomAvatar
                                    src={company.avatarUrl}
                                    name={company.name}
                                />
                                <Text>{company.name}</Text>
                            </Space>
                        }
                        onClick={() => setActiveForm("companyId")}
                        onCancel={() => setActiveForm(undefined)}
                        onUpdate={() => {
                            setActiveForm(undefined);
                        }}
                        extra={
                            <Form.Item
                                name="salesOwnerId"
                                label="Sales Owner"
                                labelCol={{
                                    style: {
                                        marginTop: "0.8rem",
                                    },
                                }}
                            >
                                <Select
                                    style={{
                                        width: "100%",
                                    }}
                                    defaultValue={{
                                        label: salesOwner.name,
                                        value: salesOwner.id,
                                    }}
                                    {...usersSelectProps}
                                    options={
                                        usersSelectQueryResult.data?.data?.map(
                                            ({ id, name, avatarUrl }) => ({
                                                value: id,
                                                label: (
                                                    <SelectOptionWithAvatar
                                                        name={name}
                                                        avatarUrl={
                                                            avatarUrl ??
                                                            undefined
                                                        }
                                                    />
                                                ),
                                            }),
                                        ) ?? []
                                    }
                                />
                            </Form.Item>
                        }
                    >
                        <Select
                            style={{ width: "100%" }}
                            defaultValue={{
                                label: data.data.company.name,
                                value: data.data.company.id,
                            }}
                            {...companySelectProps}
                            options={
                                companySelectQueryResult.data?.data?.map(
                                    ({ id, name, avatarUrl }) => ({
                                        value: id,
                                        label: (
                                            <SelectOptionWithAvatar
                                                name={name}
                                                avatarUrl={
                                                    avatarUrl ?? undefined
                                                }
                                            />
                                        ),
                                    }),
                                ) ?? []
                            }
                        />
                    </SingleElementForm>
                    <SingleElementForm
                        icon={<IdcardOutlined className="tertiary" />}
                        state={
                            activeForm && activeForm === "jobTitle"
                                ? "form"
                                : jobTitle
                                ? "view"
                                : "empty"
                        }
                        itemProps={{
                            name: "jobTitle",
                            label: "Title",
                        }}
                        view={<Text>{jobTitle}</Text>}
                        onClick={() => setActiveForm("jobTitle")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Input defaultValue={jobTitle || ""} />
                    </SingleElementForm>
                    <SingleElementForm
                        icon={<PhoneOutlined className="tertiary" />}
                        state={
                            activeForm && activeForm === "phone"
                                ? "form"
                                : phone
                                ? "view"
                                : "empty"
                        }
                        itemProps={{
                            name: "phone",
                            label: "Phone",
                        }}
                        view={<Text>{phone}</Text>}
                        onClick={() => setActiveForm("phone")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Input defaultValue={phone || ""} />
                    </SingleElementForm>
                    <SingleElementForm
                        style={{ borderBottom: "none" }}
                        icon={<GlobalOutlined className="tertiary" />}
                        state={
                            activeForm && activeForm === "timezone"
                                ? "form"
                                : timezone
                                ? "view"
                                : "empty"
                        }
                        itemProps={{
                            name: "timezone",
                            label: "TimezoneEnum",
                        }}
                        view={<Text>{timezone}</Text>}
                        onClick={() => setActiveForm("timezone")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Select
                            style={{ width: "100%" }}
                            options={timezoneOptions}
                            defaultValue={data.data.timezone}
                        />
                    </SingleElementForm>
                </div>

                <div className={styles.stage}>
                    <ContactStatus contact={data.data} />
                </div>

                <Card
                    title={
                        <>
                            <TextIcon />
                            <Text style={{ marginLeft: ".8rem" }}>Notes</Text>
                        </>
                    }
                    bodyStyle={{
                        padding: 0,
                    }}
                >
                    <ContactComment />
                </Card>

                <div className={styles.actions}>
                    <Text className="ant-text tertiary">
                        Created on: {dayjs(createdAt).format("MMMM DD, YYYY")}
                    </Text>

                    <Popconfirm
                        title="Delete the contact"
                        description="Are you sure to delete this contact?"
                        onConfirm={() => {
                            deleteMutation(
                                {
                                    id,
                                    resource: "contacts",
                                },
                                {
                                    onSuccess: () => closeModal(),
                                },
                            );
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete Contact
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        </Drawer>
    );
};
