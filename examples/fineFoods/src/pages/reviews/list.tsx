import React from "react";
import {
    List,
    Table,
    useTable,
    useTranslate,
    useUpdateMany,
    useNavigation,
    useUpdate,
    IResourceComponentsProps,
    Icons,
    Space,
    Button,
    Avatar,
    Rate,
    Typography,
} from "@pankod/refine";

import { IReview } from "interfaces";

export const ReviewsList: React.FC<IResourceComponentsProps> = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );

    const t = useTranslate();
    const { show } = useNavigation();

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

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <List
            title={t("reviews:title")}
            pageHeaderProps={{
                subTitle: hasSelected && (
                    <Space style={{ gap: 0, marginLeft: "1em" }}>
                        <Button
                            type="text"
                            onClick={() => updateSelectedItems("approved")}
                            loading={updateManyIsLoading}
                            icon={
                                <Icons.CheckCircleOutlined
                                    style={{ color: "green" }}
                                />
                            }
                        >
                            Accept All
                        </Button>
                        <Button
                            type="text"
                            onClick={() => updateSelectedItems("rejected")}
                            loading={updateManyIsLoading}
                            icon={
                                <Icons.CloseCircleOutlined
                                    style={{ color: "red" }}
                                />
                            }
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
                    width={105}
                />
                <Table.Column
                    dataIndex={["user", "fullName"]}
                    title={t("reviews:fields:user")}
                />
                <Table.Column
                    dataIndex={["order", "id"]}
                    title={t("reviews:fields:orderId")}
                    render={(value) => (
                        <Button
                            onClick={() => {
                                show("reviews", value);
                            }}
                            type="text"
                        >
                            #{value}
                        </Button>
                    )}
                />
                <Table.Column
                    width={250}
                    dataIndex="comment"
                    title={t("reviews:fields:review")}
                />
                <Table.Column
                    dataIndex="star"
                    title={t("reviews:fields:rating")}
                    align="center"
                    render={(value) => (
                        <Space
                            direction="vertical"
                            style={{
                                rowGap: 0,
                            }}
                        >
                            <Typography.Text
                                style={{
                                    fontSize: 31,
                                    fontWeight: 800,
                                }}
                            >
                                {value}
                            </Typography.Text>
                            <Rate
                                character={
                                    <Icons.StarOutlined
                                        style={{ color: "#FA8C16" }}
                                    />
                                }
                                disabled
                                value={value}
                            />
                        </Space>
                    )}
                />
                <Table.Column<IReview>
                    title={t("common:table.actions")}
                    key="actions"
                    render={(record) => (
                        <Space>
                            <Button
                                danger
                                icon={<Icons.CloseCircleOutlined />}
                                onClick={() => handleUpdate(record, "rejected")}
                            >
                                Reject
                            </Button>
                            <Button
                                icon={<Icons.CheckCircleOutlined />}
                                onClick={() => handleUpdate(record, "approved")}
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
