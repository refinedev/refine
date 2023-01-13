import React from "react";
import { useTable, List, Table, Avatar, Icons } from "@pankod/refine-antd";
import { TUser } from "types/user";

const { UserOutlined } = Icons;

export const UserList = () => {
    const { tableProps } = useTable<TUser>();

    return (
        <List>
            <Table {...tableProps} rowKey={"id"}>
                <Table.Column
                    dataIndex="avatar_url"
                    title={
                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                            Avatar
                        </h4>
                    }
                    render={(_, record: TUser) => (
                        <Avatar
                            icon={<UserOutlined />}
                            src={record.avatar_url}
                            size={{ xs: 24, sm: 32, md: 40 }}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="id"
                    title={
                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                            ID
                        </h4>
                    }
                />
                <Table.Column
                    dataIndex="email"
                    title={
                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                            Email
                        </h4>
                    }
                />
                <Table.Column
                    dataIndex="full_name"
                    title={
                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                            Full Name
                        </h4>
                    }
                    render={(_, record: TUser) =>
                        record.full_name ? (
                            record.full_name
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                --
                            </p>
                        )
                    }
                />
                <Table.Column
                    dataIndex="username"
                    title={
                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                            Username
                        </h4>
                    }
                    render={(_, record: TUser) =>
                        record.username ? (
                            record.username
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                --
                            </p>
                        )
                    }
                />
            </Table>
        </List>
    );
};
