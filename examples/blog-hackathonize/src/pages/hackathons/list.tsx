import {
    List,
    useTable,
    ShowButton,
    EditButton,
    TextField,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import dayjs from "dayjs";

import { HackathonType } from "interfaces";

export const HackathonsList: React.FC = () => {
    const { tableProps } = useTable<HackathonType>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column
                    dataIndex="start"
                    title="Starts"
                    render={(value) => (
                        <TextField
                            value={dayjs(value).format("DD/MMMM dddd")}
                        />
                    )}
                />
                <Table.Column
                    dataIndex="end"
                    title="Ends"
                    render={(value) => (
                        <TextField
                            value={dayjs(value).format("DD/MMMM dddd")}
                        />
                    )}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_text, record: HackathonType): React.ReactNode => {
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
