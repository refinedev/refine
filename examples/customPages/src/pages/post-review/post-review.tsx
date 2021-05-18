import { useState } from "react";
import {
    Typography,
    Button,
    Card,
    AntdList,
    useList,
    MarkdownField,
    useMany,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

const { Title, Text } = Typography;

export const PostReview = () => {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading } = useList<IPost>("posts", {
        filters: { status: ["draft"] },
        pagination: { pageSize: 2, current: page },
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
                                Previous Page
                            </Button>
                            <Button onClick={() => setPage((prev) => prev + 1)}>
                                Next Page
                            </Button>
                        </div>
                    }
                    renderItem={(item) => (
                        <AntdList.Item>
                            <Card
                                style={{ height: "100%" }}
                                title={item.title}
                                actions={[
                                    <Button key="approve" type="primary">
                                        Approve
                                    </Button>,
                                ]}
                            >
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
