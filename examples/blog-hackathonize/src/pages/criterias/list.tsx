import { useMany } from "@refinedev/core";

import {
    List,
    useTable,
    ShowButton,
    EditButton,
    TextField,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import { CriteriaType, TeamType } from "interfaces";

export const CriteriasList: React.FC = () => {
    const { tableProps, tableQueryResult } = useTable<CriteriaType>();

    const hackethonIds =
        tableQueryResult.data?.data.map((h) => h.hackathon_id) ?? [];

    const { data: hackathonsData, isLoading: hackathonsIsLoading } =
        useMany<CriteriaType>({
            resource: "hackathons",
            ids: hackethonIds,
            queryOptions: {
                enabled: hackethonIds.length > 0,
            },
        });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Name" />
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
                <Table.Column<TeamType>
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
