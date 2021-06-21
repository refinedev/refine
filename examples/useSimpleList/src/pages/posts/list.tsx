import {
    PageHeader,
    Typography,
    useMany,
    AntdList,
    useSimpleList,
    NumberField,
    Space,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
    const { listProps } = useSimpleList<IPost>({
        sorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        pagination: {
            pageSize: 3,
        },
    });
    const { Text } = Typography;

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data } = useMany<ICategory>("categories", categoryIds, {
        enabled: categoryIds.length > 0,
    });

    const renderItem = (item: IPost) => {
        const { title, hit, content } = item;

        const categoryTitle = data?.data.find(
            (category: ICategory) => category.id === item.category.id,
        )?.title;

        return (
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <Space>
                            <NumberField
                                value={hit}
                                options={{
                                    notation: "compact",
                                }}
                            />
                        </Space>
                        <Text>{categoryTitle}</Text>
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={title} description={content} />
            </AntdList.Item>
        );
    };

    return (
        <PageHeader title="Posts">
            <AntdList {...listProps} renderItem={renderItem} />
        </PageHeader>
    );
};
