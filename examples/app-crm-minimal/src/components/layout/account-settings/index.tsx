import { HttpError } from "@refinedev/core";
import { CloseOutlined } from "@ant-design/icons";
import { SaveButton, useForm } from "@refinedev/antd";
import { Button, Card, Drawer, Form, Input, Spin } from "antd";

import { getNameInitials } from "@utilities";
import { User, UserUpdateInput } from "@interfaces";

import { CustomAvatar } from "../../custom-avatar";
import { Text } from "../../text";

type Props = {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    userId: string;
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
    const { saveButtonProps, formProps, queryResult } = useForm<
        User,
        HttpError,
        UserUpdateInput
    >({
        mutationMode: "optimistic",
        resource: "users",
        action: "edit",
        id: userId,
        meta: {
            fields: ["id", "name", "email", "avatarUrl", "jobTitle", "phone"],
        },
    });
    const { avatarUrl, name } = queryResult?.data?.data || {};

    const closeModal = () => {
        setOpened(false);
    };

    if (queryResult?.isLoading) {
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
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    backgroundColor: "#fff",
                }}
            >
                <Text strong>Account Settings</Text>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => closeModal()}
                />
            </div>
            <div
                style={{
                    padding: "16px",
                }}
            >
                <Card>
                    <Form {...formProps} layout="vertical">
                        <CustomAvatar
                            shape="square"
                            src={avatarUrl}
                            name={getNameInitials(name || "")}
                            style={{
                                width: 96,
                                height: 96,
                                marginBottom: "24px",
                            }}
                        />
                        <Form.Item label="Name" name="name">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                        <Form.Item label="Job title" name="jobTitle">
                            <Input placeholder="jobTitle" />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone">
                            <Input placeholder="Timezone" />
                        </Form.Item>
                    </Form>
                    <SaveButton
                        {...saveButtonProps}
                        style={{
                            display: "block",
                            marginLeft: "auto",
                        }}
                    />
                </Card>
            </div>
        </Drawer>
    );
};
