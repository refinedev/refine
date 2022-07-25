import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

import {
    Show,
    Typography,
    MarkdownField,
    Space,
    ImageField,
} from "@pankod/refine-antd";

import { IPost, ICategory, IFile } from "interfaces";

const { Title, Text } = Typography;

export const PostsShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const images = record?.images ? (JSON.parse(record.images) as IFile[]) : [];

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "61c43adc284ac",
            id: record?.categoryId || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />

            <Title level={5}>Images</Title>
            <Space wrap>
                {record?.images ? (
                    images.map((img) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={200}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </Show>
    );
};
