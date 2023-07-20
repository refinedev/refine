import { useTable, List } from "@refinedev/antd";
import { Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { TUser } from "../../types/user";

export const UserList = () => {
    const { tableProps } = useTable<TUser>();

    console.log(tableProps);

    const data = [
        {
            id: "811300ba-c326-4154-a954-731922978d7f",
            created_at: "2022-12-13T09:34:13.592889+00:00",
            username: null,
            full_name: "Ömer Faruk APLAK",
            avatar_url: "https://avatars.githubusercontent.com/u/1110414?v=4",
            updated_at: "2022-12-13T09:34:13.592889+00:00",
        },
        {
            id: "d42c510b-bbc6-4f9a-97ee-8f4f222e934b",
            created_at: "2022-12-13T11:58:01.723064+00:00",
            username: null,
            full_name: "Necati Özmen",
            avatar_url: "https://avatars.githubusercontent.com/u/18739364?v=4",
            updated_at: "2022-12-13T11:58:01.723064+00:00",
        },
        {
            id: "f29f74d4-4c3c-4cbf-b6ce-1b6a0e89478e",
            created_at: "2022-12-13T12:00:42.146674+00:00",
            username: null,
            full_name: "Alican Erdurmaz",
            avatar_url: "https://avatars.githubusercontent.com/u/23058882?v=4",
            updated_at: "2022-12-13T12:00:42.146674+00:00",
        },
        {
            id: "1beb2f0b-6d40-430d-8555-948999959420",
            created_at: "2022-12-13T12:06:10.361162+00:00",
            username: null,
            full_name: "Yıldıray Ünlü",
            avatar_url: "https://avatars.githubusercontent.com/u/3484713?v=4",
            updated_at: "2022-12-13T12:06:10.361162+00:00",
        },
        {
            id: "f9f7be34-8be5-478c-8a20-a50a2d162373",
            created_at: "2023-06-16T20:15:14.981981+00:00",
            username: null,
            full_name: "Salih Özdemir",
            avatar_url: "https://avatars.githubusercontent.com/u/41580619?v=4",
            updated_at: "2023-06-16T20:15:14.981981+00:00",
        },
        {
            id: "4705e151-c01e-400d-a686-90d433e61d03",
            created_at: "2023-03-12T14:07:43.43117+00:00",
            username: null,
            full_name: "Ali Emir Şen",
            avatar_url: "https://avatars.githubusercontent.com/u/11361964?v=4",
            updated_at: "2023-03-12T14:07:43.43117+00:00",
        },
        {
            id: "f9f7be34-8be5-478c-8a20-c50a2d162373",
            created_at: "2023-06-16T20:15:14.981981+00:00",
            username: null,
            full_name: "Recep Kütük",
            avatar_url: "https://avatars.githubusercontent.com/u/994097?v=4",
            updated_at: "2023-06-16T20:15:14.981981+00:00",
        },
        {
            id: "f9f7be34-8be5-478c-8b20-c50a2d162373",
            created_at: "2023-06-16T20:15:14.981981+00:00",
            username: null,
            full_name: "Batuhan Wilhelm",
            avatar_url: "https://avatars.githubusercontent.com/u/16444991?v=4",
            updated_at: "2023-06-16T20:15:14.981981+00:00",
        },
        {
            id: "f9f7be34-8be5-478c-8a20-c50a2d162372",
            created_at: "2023-06-16T20:15:14.981981+00:00",
            username: null,
            full_name: "Civan Ozseyhan",
            avatar_url: "https://avatars.githubusercontent.com/u/1053113?v=4",
            updated_at: "2023-06-16T20:15:14.981981+00:00",
        },
    ];

    return (
        <List>
            <Table {...tableProps} dataSource={data as any} rowKey={"id"}>
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
                    render={(_, record: TUser) => (
                        <p style={{ textAlign: "center" }}>{record?.id}</p>
                    )}
                />
                <Table.Column
                    dataIndex="email"
                    title={
                        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                            Email
                        </h4>
                    }
                    render={() => (
                        <p style={{ textAlign: "center" }}>Not listed</p>
                    )}
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
                            <p
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {record.full_name}
                            </p>
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
                            <p
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                {record.username}
                            </p>
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
