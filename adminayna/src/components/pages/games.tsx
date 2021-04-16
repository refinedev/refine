import * as React from "react";

import {
    List,
    Show,
    TextField,
    FilterDropdown,
    Table,
    useTable,
    Space,
    ShowButton,
    CreateButton,
    ExportButton,
    DateField,
    IResourceComponentsProps,
    Select,
} from "readmin";

export const GamesList = (props: IResourceComponentsProps) => {
    const { tableProps, sorter, filters } = useTable({});

    const statusOptions = [
        {
            label: "Ready",
            value: "ready",
        },
        {
            label: "Waiting",
            value: "waiting",
        },
        {
            label: "Consumed",
            value: "consumed",
        },
    ];

    const Actions = () => (
        <Space direction="horizontal">
            <ExportButton
                sorter={sorter}
                filters={filters}
                pageSize={100}
                maxItemCount={300}
                mapData={(item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        slug: item.slug,
                        content: item.content,
                        status: item.status,
                    };
                }}
            />
            <CreateButton />
        </Space>
    );

    return (
        <List {...props} actionButtons={<Actions />}>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="Id"
                    key="id"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="code"
                    title="Code"
                    key="code"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="gsmNumber"
                    title="Gsm Number"
                    key="gsmNumber"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="prize"
                    title="Prize Text"
                    key="prizeText"
                    render={(value) => <TextField value={value.text} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex={["promotionCode", "status"]}
                    title="Promotion Code"
                    key="promotionCode.status"
                    render={(value) => <TextField value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select options={statusOptions} />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    key="createdAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />
                <Table.Column
                    dataIndex="updatedAt"
                    title="Updated At"
                    key="updatedAt"
                    render={(value) => <DateField format="LLL" value={value} />}
                    sorter={{
                        multiple: 1,
                    }}
                />

                <Table.Column
                    title={"Actions"}
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => (
                        <Space>
                            <ShowButton size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
