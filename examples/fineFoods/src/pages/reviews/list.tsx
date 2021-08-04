import React from "react";
import {
    List,
    Table,
    useTable,
    useTranslate,
    useUpdateMany,
    useUpdate,
    IResourceComponentsProps,
    Icons,
    Space,
    Button,
    Avatar,
    Rate,
} from "@pankod/refine";

import { IReview } from "interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );

    const { tableProps } = useTable<IReview>({
        permanentFilter: [
            {
                field: "status",
                operator: "eq",
                value: "pending",
            },
        ],
    });

    const { mutate: updateManyMutate, isLoading: updateManyIsLoading } =
        useUpdateMany<IReview>();

    const updateSelectedItems = (status: "approved" | "rejected") => {
        updateManyMutate(
            {
                resource: "reviews",
                ids: selectedRowKeys.map(String),
                values: {
                    status,
                },
                mutationMode: "undoable",
            },
            {
                onSuccess: () => {
                    setSelectedRowKeys([]);
                },
            },
        );
    };

    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const { mutate } = useUpdate<IReview>();

    const handleUpdate = (item: IReview, status: IReview["status"]) => {
        mutate({
            resource: "reviews",
            id: item.id,
            values: { status },
            mutationMode: "undoable",
        });
    };

    const t = useTranslate();
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <List
            title={"Reviews"}
            pageHeaderProps={{
                subTitle: hasSelected && (
                    <Space>
                        <Button
                            type="text"
                            onClick={() => updateSelectedItems("approved")}
                            loading={updateManyIsLoading}
                        >
                            Accept All
                        </Button>
                        <Button
                            type="text"
                            onClick={() => updateSelectedItems("rejected")}
                            loading={updateManyIsLoading}
                            danger
                        >
                            Reject All
                        </Button>
                    </Space>
                ),
            }}
        >
            <Table
                {...tableProps}
                rowSelection={rowSelection}
                scroll={{
                    x: true,
                }}
                rowKey="id"
            >
                <Table.Column
                    dataIndex={["user", "avatar"]}
                    render={(value) => <Avatar size={74} src={value[0].url} />}
                />
                <Table.Column dataIndex={["user", "fullName"]} title={"User"} />
                <Table.Column dataIndex={["order", "id"]} title={"Order ID"} />
                <Table.Column
                    width={250}
                    dataIndex="comment"
                    title={"Review"}
                />
                <Table.Column
                    dataIndex="star"
                    title={"Rating"}
                    render={(value) => <Rate disabled value={value} />}
                />
                <Table.Column<IReview>
                    title={t("common:table.actions")}
                    key="actions"
                    render={(record) => (
                        <Space>
                            <Button
                                danger
                                icon={<Icons.CloseCircleOutlined />}
                                onClick={() => handleUpdate(record, "approved")}
                            >
                                Reject
                            </Button>
                            <Button
                                icon={<Icons.CheckCircleOutlined />}
                                onClick={() => handleUpdate(record, "rejected")}
                                type="primary"
                            >
                                Accept
                            </Button>
                        </Space>
                    )}
                    fixed="right"
                />
            </Table>
        </List>
    );
};
