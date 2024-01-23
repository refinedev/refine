import { useState } from "react";

import { HttpError, useOne, useUpdate } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import {
    CloseOutlined,
    EditOutlined,
    GlobalOutlined,
    IdcardOutlined,
    MailOutlined,
    PhoneOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Drawer,
    Input,
    Select,
    Space,
    Spin,
    Typography,
} from "antd";

import { TimezoneEnum } from "@/enums";
import {
    AccountSettingsGetUserQuery,
    AccountSettingsUpdateUserMutation,
    AccountSettingsUpdateUserMutationVariables,
} from "@/graphql/types";

import { CustomAvatar } from "../../custom-avatar";
import { SingleElementForm } from "../../single-element-form";
import { Text } from "../../text";
import styles from "./index.module.css";
import {
    ACCOUNT_SETTINGS_GET_USER_QUERY,
    ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
} from "./queries";

const timezoneOptions = Object.keys(TimezoneEnum).map((key) => ({
    label: TimezoneEnum[key as keyof typeof TimezoneEnum],
    value: TimezoneEnum[key as keyof typeof TimezoneEnum],
}));

type Props = {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    userId: string;
};

type FormKeys = "email" | "jobTitle" | "phone" | "timezone";

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
    const [activeForm, setActiveForm] = useState<FormKeys>();

    const { data, isLoading, isError } = useOne<
        GetFields<AccountSettingsGetUserQuery>
    >({
        resource: "users",
        id: userId,
        queryOptions: {
            enabled: opened,
        },
        meta: {
            gqlQuery: ACCOUNT_SETTINGS_GET_USER_QUERY,
        },
    });

    const { mutate: updateMutation } = useUpdate<
        GetFields<AccountSettingsUpdateUserMutation>,
        HttpError,
        GetVariables<AccountSettingsUpdateUserMutationVariables>
    >();

    const closeModal = () => {
        setOpened(false);
    };

    if (isError) {
        closeModal();
        return null;
    }

    if (isLoading) {
        return (
            <Drawer
                open={opened}
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

    const { id, name, email, jobTitle, phone, timezone, avatarUrl } =
        data?.data;

    const getActiveForm = (key: FormKeys) => {
        if (activeForm === key) {
            return "form";
        }

        if (!data?.data[key]) {
            return "empty";
        }

        return "view";
    };

    return (
        <Drawer
            onClose={closeModal}
            open={opened}
            width={756}
            styles={{
                body: { background: "#f5f5f5", padding: 0 },
                header: { display: "none" },
            }}
        >
            <div className={styles.header}>
                <Text strong>Account Settings</Text>
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
                                updateMutation({
                                    resource: "users",
                                    id,
                                    values: { name: value },
                                    mutationMode: "optimistic",
                                    successNotification: false,
                                    meta: {
                                        gqlMutation:
                                            ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
                                    },
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
                <Card
                    title={
                        <Space size={15}>
                            <UserOutlined />
                            <Text size="sm">User profile</Text>
                        </Space>
                    }
                    headStyle={{ padding: "0 12px" }}
                    bodyStyle={{ padding: "0" }}
                >
                    <SingleElementForm
                        useFormProps={{
                            id,
                            resource: "users",
                            meta: {
                                gqlMutation:
                                    ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
                            },
                        }}
                        formProps={{ initialValues: { jobTitle } }}
                        icon={<IdcardOutlined className="tertiary" />}
                        state={getActiveForm("jobTitle")}
                        itemProps={{
                            name: "jobTitle",
                            label: "Title",
                        }}
                        view={<Text>{jobTitle}</Text>}
                        onClick={() => setActiveForm("jobTitle")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Input />
                    </SingleElementForm>
                    <SingleElementForm
                        useFormProps={{
                            id,
                            resource: "users",
                            meta: {
                                gqlMutation:
                                    ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
                            },
                        }}
                        formProps={{ initialValues: { phone } }}
                        icon={<PhoneOutlined className="tertiary" />}
                        state={getActiveForm("phone")}
                        itemProps={{
                            name: "phone",
                            label: "Phone",
                        }}
                        view={<Text>{phone}</Text>}
                        onClick={() => setActiveForm("phone")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Input />
                    </SingleElementForm>
                    <SingleElementForm
                        useFormProps={{
                            id,
                            resource: "users",
                            meta: {
                                gqlMutation:
                                    ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
                            },
                        }}
                        formProps={{ initialValues: { timezone } }}
                        style={{ borderBottom: "none" }}
                        icon={<GlobalOutlined className="tertiary" />}
                        state={getActiveForm("timezone")}
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
                        />
                    </SingleElementForm>
                </Card>
                <Card
                    title={
                        <Space size={15}>
                            <SafetyCertificateOutlined />
                            <Text size="sm">Security</Text>
                        </Space>
                    }
                    headStyle={{ padding: "0 12px" }}
                    bodyStyle={{ padding: "0" }}
                >
                    <SingleElementForm
                        useFormProps={{
                            id,
                            resource: "users",
                            meta: {
                                gqlMutation:
                                    ACCOUNT_SETTINGS_UPDATE_USER_MUTATION,
                            },
                        }}
                        formProps={{ initialValues: { email } }}
                        icon={<MailOutlined className="tertiary" />}
                        state={getActiveForm("email")}
                        itemProps={{
                            name: "email",
                            label: "Email",
                        }}
                        view={<Text>{email}</Text>}
                        onClick={() => setActiveForm("email")}
                        onUpdate={() => setActiveForm(undefined)}
                        onCancel={() => setActiveForm(undefined)}
                    >
                        <Input />
                    </SingleElementForm>
                </Card>
            </div>
        </Drawer>
    );
};
