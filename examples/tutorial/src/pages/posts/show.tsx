import { Show, useShow, Typography, Tag, useOne } from "@pankod/refine";

const { Title, Text } = Typography;

export const PostShow = () => {
    const { queryResult } = useShow({});
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const {data: categoryData} = useOne("categories", record?.category.id?.toString() ?? "", {
        enabled: !!record?.category.id
    })

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Status</Title>
            <Tag>{record?.status}</Tag>

            <Title level={5}>Category</Title>
            <Text>{categoryData?.data.title}</Text>
        </Show>
    );
};
