import { useDelete } from "@refinedev/core";
import { TagField } from "@refinedev/antd";

// It is recommended to use explicit import as seen below to reduce bundle size.
// import { IconName } from "@ant-design/icons";
import * as Icons from "@ant-design/icons";

import { Card, Typography, Dropdown, Menu } from "antd";

import { IClient } from "interfaces";

const { FormOutlined, DeleteOutlined } = Icons;
const { Title, Text } = Typography;

type ClientItemProps = {
    item: IClient;
    editShow: (id?: string | undefined) => void;
};

export const ClientItem: React.FC<ClientItemProps> = ({ item, editShow }) => {
    const { mutate } = useDelete();

    return (
        <Card style={{ width: 300, height: 300, borderColor: "black" }}>
            <div style={{ position: "absolute", top: "10px", right: "5px" }}>
                <Dropdown
                    overlay={
                        <Menu mode="vertical">
                            <Menu.Item
                                key="1"
                                style={{
                                    fontWeight: 500,
                                }}
                                icon={
                                    <FormOutlined
                                        style={{
                                            color: "green",
                                        }}
                                    />
                                }
                                onClick={() => editShow(item.id)}
                            >
                                Edit Client
                            </Menu.Item>
                            <Menu.Item
                                key="2"
                                style={{
                                    fontWeight: 500,
                                }}
                                icon={
                                    <DeleteOutlined
                                        style={{
                                            color: "red",
                                        }}
                                    />
                                }
                                onClick={() =>
                                    mutate({
                                        resource: "clients",
                                        id: item.id,
                                        mutationMode: "undoable",
                                        undoableTimeout: 5000,
                                    })
                                }
                            >
                                Delete Client
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <Icons.MoreOutlined
                        style={{
                            fontSize: 24,
                        }}
                    />
                </Dropdown>
            </div>

            <Title level={4}>{item.name}</Title>
            <Title level={5}>Client Id:</Title>
            <Text>{item.id}</Text>
            <Title level={5}>Contacts:</Title>

            {item.contacts.map((item) => {
                return (
                    <TagField
                        key={item.id}
                        style={{ marginTop: 4 }}
                        color={"#673ab7"}
                        value={`${item.first_name} ${item.last_name}`}
                    />
                );
            })}
        </Card>
    );
};
