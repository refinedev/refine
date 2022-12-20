import React from "react";
import {
    useTranslate,
    useUpdateMany,
    useNavigation,
    IResourceComponentsProps,
} from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Icons,
    Space,
    Button,
    Avatar,
    Rate,
    Typography,
    Dropdown,
    Menu,
} from "@pankod/refine-antd";

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

    const { mutate, isLoading } = useUpdateMany<IReview>();

    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleUpdate = (id: number, status: IReview["status"]) => {
        mutate({
            resource: "reviews",
            ids: [id],
            values: { status },
            mutationMode: "undoable",
        });
    };

    const updateSelectedItems = (status: "approved" | "rejected") => {
        mutate(
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

    const hasSelected = selectedRowKeys.length > 0;

    const moreMenu = (id: number) => (
        <Menu mode="vertical">
            <Menu.Item
                key="accept"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <Icons.CheckCircleOutlined
                        style={{
                            color: "#52c41a",
                            fontSize: 17,
                            fontWeight: 500,
                        }}
                    />
                }
                onClick={() => handleUpdate(id, "approved")}
            >
                {t("buttons.accept")}
            </Menu.Item>
            <Menu.Item
                key="reject"
                style={{
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                }}
                icon={
                    <Icons.CloseCircleOutlined
                        style={{
                            color: "#EE2A1E",
                            fontSize: 17,
                        }}
                    />
                }
                onClick={() => handleUpdate(id, "rejected")}
            >
                {t("buttons.reject")}
            </Menu.Item>
        </Menu>
    );

    return (
        <List
            headerProps={{
                subTitle: hasSelected && (
                    <Space style={{ gap: 0, marginLeft: "1em" }}>
                        <Button
                            type="text"
                            onClick={() => updateSelectedItems("approved")}
                            loading={isLoading}
                            icon={
                                <Icons.CheckCircleOutlined
                                    style={{ color: "green" }}
                                />
                            }
                        >
                            {t("buttons.acceptAll")}
                        </Button>
                        <Button
                            type="text"
                            onClick={() => updateSelectedItems("rejected")}
                            loading={isLoading}
                            icon={
                                <Icons.CloseCircleOutlined
                                    style={{ color: "red" }}
                                />
                            }
                        >
                            {t("buttons.rejectAll")}
                        </Button>
                    </Space>
                ),
            }}
        >
            <Table {...tableProps} rowSelection={rowSelection} rowKey="id">
                <Table.Column
                    dataIndex={["user", "avatar"]}
                    render={(value) => <Avatar size={74} src={value[0].url} />}
                    width={105}
                />
                <Table.Column
                    dataIndex={["user", "fullName"]}
                    title={t("reviews.fields.user")}
                />
                <Table.Column
                    dataIndex={["order", "id"]}
                    title={t("reviews.fields.orderId")}
                    render={(value) => (
                        <Button
                            onClick={() => {
                                show("orders", value);
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
                    title={t("reviews.fields.review")}
                />
                <Table.Column
                    dataIndex="star"
                    title={t("reviews.fields.rating")}
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
                                character={<Icons.StarOutlined />}
                                disabled
                                value={value}
                                style={{
                                    color: "#FA8C16",
                                }}
                            />
                        </Space>
                    )}
                />
                <Table.Column<IReview>
                    title={t("table.actions")}
                    key="actions"
                    render={(record) => (
                        <Dropdown
                            overlay={moreMenu(record.id)}
                            trigger={["click"]}
                        >
                            <Icons.MoreOutlined
                                style={{
                                    fontSize: 24,
                                }}
                            />
                        </Dropdown>
                    )}
                    fixed="right"
                />
            </Table>
        </List>
    );
};
