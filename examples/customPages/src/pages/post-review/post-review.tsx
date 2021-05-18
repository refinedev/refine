import { useState } from "react";
import {
    Typography,
    Button,
    Card,
    Icons,
    AntdList,
    useList,
    MarkdownField,
    useMany,
    useUpdate,
    Select,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

const { LeftOutlined, RightOutlined } = Icons;
const { Title, Text } = Typography;
const { Option } = Select;

export const PostReview = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);

    const { data, isLoading } = useList<IPost>("posts", {
        filters: { status: ["draft"] },
        pagination: { pageSize, current: page },
    });

    const record = data?.data;

    const categoryIds = data?.data?.map((item) => item.category.id) ?? [];
    const { data: categoryData } = useMany<ICategory>(
        "categories",
        categoryIds,
        {
            enabled: categoryIds.length > 0,
        },
    );

    const mutationResult = useUpdate<IPost>("posts");

    const { mutate } = mutationResult;

    const handleUpdate = (item: IPost) => {
        mutate({ id: item.id, values: { ...item, status: "published" } });
    };

    return (
        <div>
            {record && (
                <AntdList
                    itemLayout="vertical"
                    loading={isLoading}
                    dataSource={record}
                    loadMore={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button onClick={() => setPage((prev) => prev - 1)}>
                                <LeftOutlined />
                                Previous Page
                            </Button>
                            <Select
                                defaultValue={1}
                                onChange={(value) => setPageSize(value)}
                            >
                                <Option value={1}>1 / page</Option>
                                <Option value={2}>2 / page</Option>
                                <Option value={3}>3 / page</Option>
                            </Select>
                            <Button onClick={() => setPage((prev) => prev + 1)}>
                                Next Page
                                <RightOutlined />
                            </Button>
                        </div>
                    }
                    renderItem={(item) => (
                        <AntdList.Item>
                            <Card
                                style={{ height: "100%" }}
                                actions={[
                                    <Button
                                        key="approve"
                                        type="primary"
                                        onClick={() => handleUpdate(item)}
                                    >
                                        Approve
                                    </Button>,
                                ]}
                            >
                                <Title level={5}>Status</Title>
                                <Text mark>{item.status}</Text>
                                <Title level={5}>Title</Title>
                                <Text>{item.title}</Text>
                                <Title level={5}>Category</Title>
                                <Text>
                                    {
                                        categoryData?.data?.find(
                                            (c) => c.id == item.category.id,
                                        )?.title
                                    }
                                </Text>
                                <Title level={5}>Content</Title>
                                <MarkdownField value={item.content} />
                            </Card>
                        </AntdList.Item>
                    )}
                />
            )}
        </div>
    );
};
