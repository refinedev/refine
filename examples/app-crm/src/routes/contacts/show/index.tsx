import React from "react";
import {
    Avatar,
    Button,
    Card,
    Drawer,
    Input,
    Popconfirm,
    Select,
    Space,
    Spin,
    Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDelete, useGetToPath, useShow, useUpdate } from "@refinedev/core";
import {
    MailOutlined,
    ShopOutlined,
    GlobalOutlined,
    PhoneOutlined,
    IdcardOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useSelect } from "@refinedev/antd";
import dayjs from "dayjs";

import { Text } from "../../../components/text";
import { SingleElementForm } from "../../../components/single-element-form";
import { ContactStatus } from "../../../components/contact/status";
import { TextIcon } from "../../../components/icon";
import { ContactComment } from "../../../components/contact/comment";
import { Timezone } from "../../../enums/timezone";

import type { Company, Contact } from "../../../interfaces/graphql";
import styles from "./index.module.css";
import { SelectOptionWithAvatar } from "../../../components/select-option-with-avatar";

const timezoneOptions = Object.keys(Timezone).map((key) => ({
    label: Timezone[key as keyof typeof Timezone],
    value: Timezone[key as keyof typeof Timezone],
}));

export const ContactShowPage = () => {
    const [activeForm, setActiveForm] = React.useState<
        "email" | "companyId" | "jobTitle" | "phone" | "timezone"
    >();
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { mutate } = useUpdate<Contact>();
    const { mutate: deleteMutation } = useDelete<Contact>();
    const { queryResult } = useShow<Contact>({
        meta: {
            fields: [
                "id",
                "name",
                "email",
                {
                    company: ["id", "name", "avatarUrl"],
                },
                "jobTitle",
                "phone",
                "timezone",
                "stage",
                "status",
                "avatarUrl",
            ],
        },
    });
    const {
        selectProps: companySelectProps,
        queryResult: companySelectQueryResult,
    } = useSelect<Company>({
        resource: "companies",
        meta: {
            fields: ["id", "name", "avatarUrl"],
        },
        optionLabel: "name",
    });

    const { data, isLoading, isError } = queryResult;
    const renderContent = () => {
        if (isError) {
            return null;
        }

        if (isLoading) {
            return <Spin />;
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
        } = data.data;
        return (
            <div className={styles.container}>
                <div className={styles.name}>
                    <Avatar
                        style={{ marginRight: "1rem" }}
                        size={96}
                        src={avatarUrl}
                    />
                    <Typography.Title
                        level={3}
                        style={{ padding: 0, margin: 0 }}
                        editable={{
                            onChange(value) {
                                mutate({
                                    resource: "contacts",
                                    id,
                                    values: {
                                        name: value,
                                    },
                                });
                            },
                        }}
                    >
                        {name}
                    </Typography.Title>
                </div>

                <div className={styles.form}>
                    <SingleElementForm
                        icon={<MailOutlined className="anticon tertiary" />}
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
                    >
                        <Input defaultValue={email} />
                    </SingleElementForm>

                    <SingleElementForm
                        icon={<ShopOutlined className="anticon tertiary" />}
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
                                <Avatar src={company.avatarUrl} size={22} />
                                <Text>{company.name}</Text>
                            </Space>
                        }
                        onClick={() => setActiveForm("companyId")}
                        onUpdate={() => setActiveForm(undefined)}
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
                        icon={<IdcardOutlined className="anticon tertiary" />}
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
                    >
                        <Input defaultValue={jobTitle || ""} />
                    </SingleElementForm>
                    <SingleElementForm
                        icon={<PhoneOutlined className="anticon tertiary" />}
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
                    >
                        <Input defaultValue={phone || ""} />
                    </SingleElementForm>
                    <SingleElementForm
                        style={{ borderBottom: "none" }}
                        icon={<GlobalOutlined className="anticon tertiary" />}
                        state={
                            activeForm && activeForm === "timezone"
                                ? "form"
                                : timezone
                                ? "view"
                                : "empty"
                        }
                        itemProps={{
                            name: "timezone",
                            label: "Timezone",
                        }}
                        view={<Text>{timezone}</Text>}
                        onClick={() => setActiveForm("timezone")}
                        onUpdate={() => setActiveForm(undefined)}
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
                                    onSuccess: () => {
                                        navigate(
                                            getToPath({
                                                action: "list",
                                            }) ?? "",
                                            {
                                                replace: true,
                                            },
                                        );
                                    },
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
        );
    };

    return (
        <Drawer
            open
            onClose={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            width={756}
            bodyStyle={{
                background: "#f5f5f5",
            }}
        >
            {renderContent()}
        </Drawer>
    );
};
