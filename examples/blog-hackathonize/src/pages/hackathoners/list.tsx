import { useMany } from "@refinedev/core";

import {
    List,
    useTable,
    ShowButton,
    EditButton,
    TextField,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import { HackathonerType, TeamType } from "interfaces";

export const HackathonersList: React.FC = () => {
    const { tableProps, tableQueryResult } = useTable<HackathonerType>();

    const teamIds = tableQueryResult.data?.data.map((h) => h.team_id) ?? [];

    const { data: teamsData, isLoading: teamsIsLoading } = useMany<TeamType>({
        resource: "teams",
        ids: teamIds,
        queryOptions: {
            enabled: teamIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column
                    dataIndex="team_id"
                    title="Team"
                    render={(value) => {
                        if (teamsIsLoading) {
                            return <TextField value="Loading..." />;
                        }
                        return (
                            <TextField
                                value={
                                    teamsData?.data.find(
                                        (item) => item.id === value,
                                    )?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column<HackathonerType>
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
