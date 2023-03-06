import { useMany } from "@refinedev/core";

import {
    List,
    useTable,
    ShowButton,
    EditButton,
    TextField,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import { HackathonerType, ProjectType, HackathonType } from "interfaces";

export const ProjectsList: React.FC = () => {
    const { tableProps, tableQueryResult } = useTable<ProjectType>();

    const hackathonIds =
        tableQueryResult.data?.data.map((h) => h.hackathon_id) ?? [];

    const { data: hackathonsData, isLoading: hackathonsIsLoading } =
        useMany<HackathonType>({
            resource: "teams",
            ids: hackathonIds,
            queryOptions: {
                enabled: hackathonIds.length > 0,
            },
        });

    const hackathonerIds =
        tableQueryResult.data?.data.map((h) => h.hackathoner_id) ?? [];

    const { data: hackathonersData, isLoading: hackathonersIsLoading } =
        useMany<HackathonerType>({
            resource: "teams",
            ids: hackathonerIds,
            queryOptions: {
                enabled: hackathonerIds.length > 0,
            },
        });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column dataIndex="description" title="Description" />
                <Table.Column dataIndex="url" title="Url" />
                <Table.Column
                    dataIndex="hackathon_id"
                    title="Hackathon"
                    render={(value) => {
                        if (hackathonsIsLoading) {
                            return <TextField value="Loading..." />;
                        }
                        return (
                            <TextField
                                value={
                                    hackathonsData?.data.find(
                                        (item) => item.id === value,
                                    )?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column
                    dataIndex="hackathoner_id"
                    title="Hackathoner"
                    render={(value) => {
                        if (hackathonersIsLoading) {
                            return <TextField value="Loading..." />;
                        }
                        return (
                            <TextField
                                value={
                                    hackathonersData?.data.find(
                                        (item) => item.id === value,
                                    )?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column<ProjectType>
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record): React.ReactNode => {
                        return (
                            <Space>
                                <ShowButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                                <EditButton
                                    size="small"
                                    recordItemId={record.id}
                                    hideText
                                />
                            </Space>
                        );
                    }}
                />
            </Table>
        </List>
    );
};
